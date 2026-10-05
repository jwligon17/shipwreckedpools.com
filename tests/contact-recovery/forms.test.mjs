// Run against a local production preview: node --test tests/contact-recovery/forms.test.mjs
// Requires an existing Chrome (CHROME_BIN override supported); never installs a browser.
// Every contact POST is fulfilled/failed inside Chrome before reaching the server.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const origin = new URL(process.env.CONTACT_TEST_ORIGIN || 'http://127.0.0.1:3127');
assert.equal(origin.protocol, 'http:', 'Browser tests require a local HTTP preview.');
assert.equal(origin.hostname, '127.0.0.1', 'Browser tests refuse non-loopback targets.');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const success = { ok: true, accepted: true, delivery: 'email_only' };

async function browser() {
  const executable = process.env.CHROME_BIN || (process.platform === 'win32'
    ? String.raw`C:\Program Files\Google\Chrome\Application\chrome.exe`
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  await access(executable);
  const profile = await mkdtemp(join(tmpdir(), 'contact-recovery-chrome-'));
  const chrome = spawn(executable, [
    '--headless=new', '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0',
    `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--disable-background-networking', '--disable-sync', '--disable-component-update',
    '--disable-default-apps', '--disable-domain-reliability', '--metrics-recording-only',
    '--disable-features=OptimizationHints,MediaRouter,AutofillServerCommunication',
    '--proxy-server=http://127.0.0.1:9', '--proxy-bypass-list=127.0.0.1;localhost;[::1]',
    'about:blank',
  ], { stdio: 'ignore' });
  let ws;
  let sequence = 0;
  let stopping = false;
  const pending = new Map();
  const requests = [];
  let mode = {};
  let interceptionError;

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 15000);
      pending.set(id, { resolve, reject, timer });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async function close() {
    stopping = true;
    ws?.close();
    for (const request of pending.values()) { clearTimeout(request.timer); request.reject(new Error('Browser closed')); }
    pending.clear();
    chrome.kill('SIGTERM');
    await Promise.race([new Promise(resolve => chrome.once('exit', resolve)), delay(2000)]);
    if (chrome.exitCode === null && chrome.signalCode === null) chrome.kill('SIGKILL');
    await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
  try {
    let port;
    for (let attempt = 0; attempt < 100; attempt++) {
      try { port = Number((await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]); } catch { /* Chrome startup. */ }
      if (port) break;
      assert.equal(chrome.exitCode, null, 'Chrome exited before opening its local debugging port.');
      await delay(100);
    }
    assert.ok(port, 'Chrome debugging port unavailable; local browser execution may require sandbox permission.');
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });
    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const request = pending.get(message.id);
        if (request) {
          clearTimeout(request.timer); pending.delete(message.id);
          if (message.error) request.reject(new Error(JSON.stringify(message.error)));
          else request.resolve(message.result);
        }
      } else if (!stopping && message.method === 'Fetch.requestPaused') {
        intercept(message.params).catch(error => { interceptionError = error; });
      }
    });
    async function intercept({ requestId, request }) {
      const url = new URL(request.url);
      if (url.origin === origin.origin && url.pathname === '/api/contact' && request.method === 'POST') {
        requests.push(JSON.parse(request.postData));
        const response = mode;
        if (response.wait) await response.wait;
        if (response.networkError) return send('Fetch.failRequest', { requestId, errorReason: 'Failed' });
        return send('Fetch.fulfillRequest', {
          requestId, responseCode: response.status || 200,
          responseHeaders: [{ name: 'Content-Type', value: 'application/json' }],
          body: Buffer.from(JSON.stringify(response.body || success)).toString('base64'),
        });
      }
      if (url.origin === origin.origin && ['GET', 'HEAD'].includes(request.method) && !url.pathname.startsWith('/api/')) {
        return send('Fetch.continueRequest', { requestId });
      }
      return send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' });
    }
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Fetch.enable', { patterns: [{ urlPattern: '*', requestStage: 'Request' }] });
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `
      window.dataLayer = [];
      const nativePush = window.dataLayer.push;
      window.dataLayer.push = function (...items) {
        const captured = JSON.parse(sessionStorage.getItem('__analyticsTestEvents') || '[]');
        for (const item of items) {
          if (item && typeof item === 'object' && !Array.isArray(item) && item.event) captured.push(item);
        }
        sessionStorage.setItem('__analyticsTestEvents', JSON.stringify(captured));
        return nativePush.apply(this, items);
      };
      window.__recoveryEvents = [];
      window.gtag = (...args) => window.__recoveryEvents.push(args);
      Object.defineProperty(navigator, 'sendBeacon', { value: () => false });
    ` });
    async function evaluate(expression) {
      if (interceptionError) throw interceptionError;
      const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      assert.ok(!result.exceptionDetails, result.exceptionDetails?.text);
      return result.result.value;
    }
    async function until(predicate, description) {
      for (let attempt = 0; attempt < 100; attempt++) {
        if (await evaluate(predicate)) return;
        await delay(30);
      }
      assert.fail(`Timed out waiting for ${description}`);
    }
    return {
      close, requests, evaluate, until,
      mock(response = {}) { mode = response; },
      async open(route) {
        requests.length = 0;
        mode = {};
        await send('Page.navigate', { url: new URL(route, origin).href });
        // Server-rendered controls can exist before React has attached handlers.
        await until(`(() => {
          const form = document.querySelector('form');
          return document.readyState === 'complete' && form && Object.keys(form).some(
            key => key.startsWith('__reactProps$') && typeof form[key]?.onSubmit === 'function'
          );
        })()`, 'form hydration');
        await evaluate("sessionStorage.removeItem('__analyticsTestEvents'); window.dataLayer.length = 0");
      },
      async openPage(route, selector) {
        await send('Page.navigate', { url: new URL(route, origin).href });
        await until(`(() => {
          const element = document.querySelector(${JSON.stringify(selector)});
          return document.readyState === 'complete' && element && Object.keys(element).some(
            key => key.startsWith('__reactProps$')
          );
        })()`, 'page hydration');
        await evaluate("sessionStorage.removeItem('__analyticsTestEvents'); window.dataLayer.length = 0");
      },
      async fill(fields) {
        for (const [id, value] of Object.entries(fields)) {
          await evaluate(`(() => {
            const el = document.getElementById(${JSON.stringify(id)});
            const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
            Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, ${JSON.stringify(value)});
            el.dispatchEvent(new Event('input', { bubbles: true }));
          })()`);
        }
      },
      async select(id) {
        await evaluate(`document.getElementById(${JSON.stringify(id)}).click()`);
        await until(`!!document.querySelector('#${id}-listbox [role=option]')`, 'select choices');
        await evaluate(`document.querySelector('#${id}-listbox [role=option]').click()`);
      },
      async submit(twice = false) {
        await evaluate(`(() => {
          const form = document.querySelector('form');
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
          ${twice ? "form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));" : ''}
        })()`);
      },
      async settled() {
        await until("!!document.querySelector('form [role=status]')?.textContent.trim() && !document.querySelector('form button[type=submit]').disabled", 'submission result');
      },
      async state() {
        return evaluate(`({
          status: document.querySelector('form [role=status]')?.textContent || '',
          green: document.querySelector('form [role=status]')?.className.includes('text-green-700'),
          values: Object.fromEntries([...document.querySelectorAll('form input[id], form textarea[id]')].map(el => [el.id, el.value])),
          formStarts: window.dataLayer.filter(event => event.event === 'contact_form_start').length,
          leads: window.dataLayer.filter(event => event.event === 'generate_lead').length,
        })`);
      },
      analyticsEvents(name) {
        return evaluate(`JSON.parse(sessionStorage.getItem('__analyticsTestEvents') || '[]').filter(event => event.event === ${JSON.stringify(name)})`);
      },
    };
  } catch (error) { await close(); throw error; }
}

const forms = [
  { name: 'contact', route: '/contact', fields: {
    'contact-name': 'Synthetic Recovery Test', 'contact-email': 'recovery@example.invalid',
    'contact-phone': '2025550123', 'contact-comment': 'Synthetic local-only inquiry. Do not send.',
  }, correction: 'contact-comment', payloadField: 'comment', selects: [], events: 1 },
  { name: 'giveaway', route: '/pages/free-estimate-pool-skimmer-giveaway', fields: {
    'giveaway-first-name': 'Synthetic', 'giveaway-last-name': 'Recovery',
    'giveaway-email': 'recovery@example.invalid', 'giveaway-phone': '2025550123',
    'giveaway-address': 'Synthetic test address', 'giveaway-city': 'Abilene',
    'giveaway-state': 'TX', 'giveaway-zip': '79601',
    'giveaway-biggest-issue': 'Synthetic local-only inquiry. Do not send.',
  }, correction: 'giveaway-biggest-issue', payloadField: 'biggestPoolIssue', selects: [
    'giveaway-pool-kind', 'giveaway-pool-size', 'giveaway-filter-type', 'giveaway-debris-exposure', 'giveaway-caretaker',
  ], events: 0 },
];

test('both active forms handle mocked contact recovery responses', { timeout: 120000 }, async t => {
  const page = await browser();
  t.after(() => page.close());
  const noLead = state => { assert.equal(state.leads, 0); };
  for (const form of forms) {
    const prepare = async () => {
      await page.open(form.route);
      await page.fill(form.fields);
      for (const id of form.selects) await page.select(id);
    };
    const retained = state => {
      for (const [id, value] of Object.entries(form.fields)) assert.equal(state.values[id], value, `${id} retained`);
      noLead(state);
      if (form.name === 'contact') assert.equal(state.formStarts, 1);
    };
    await t.test(`${form.name}: invalid fields do not submit`, async () => {
      await page.open(form.route); await page.submit(); await page.settled();
      assert.equal(page.requests.length, 0);
      const state = await page.state();
      noLead(state); assert.equal(state.formStarts, 0);
    });
    for (const failure of [
      { name: 'provider 503', response: { status: 503, body: { error: 'Notification temporarily unavailable. Please call or text.' } } },
      { name: 'uncertain network failure', response: { networkError: true } },
    ]) {
      await t.test(`${form.name}: ${failure.name} retains fields and retry token`, async () => {
        await prepare(); page.mock(failure.response); await page.submit(); await page.settled();
        const failed = await page.state(); retained(failed); assert.equal(failed.green, false);
        assert.match(failed.status, /call\/text|call or text/i, 'Failure preserves the existing contact alternatives.');
        assert.equal(page.requests.length, 1); const first = page.requests[0];
        assert.ok(first.clientSubmissionToken);
        page.mock(); await page.submit(); await page.settled();
        assert.equal(page.requests.length, 2);
        assert.deepEqual(page.requests[1], first, 'An unchanged retry preserves the exact payload and token.');
        const accepted = await page.state();
        assert.equal(accepted.green, true);
        assert.match(accepted.status, /accepted for email delivery/i);
        assert.equal(accepted.leads, form.events);
        for (const id of Object.keys(form.fields)) assert.equal(accepted.values[id], '', `${id} resets only after acceptance`);
      });
    }
    await t.test(`${form.name}: rejected response does not generate a lead`, async () => {
      await prepare(); page.mock({ body: { ok: true, accepted: false } });
      await page.submit(); await page.settled();
      const state = await page.state(); retained(state); assert.equal(state.green, false);
    });
    await t.test(`${form.name}: honeypot/suppressed response does not generate a lead`, async () => {
      await prepare(); page.mock({ body: { ok: true, accepted: false } });
      await page.submit(); await page.settled();
      const state = await page.state(); retained(state); assert.equal(state.green, false);
    });
    await t.test(`${form.name}: test routing has explicit acknowledgement and no lead event`, async () => {
      await prepare(); page.mock({ body: { ok: true, accepted: false, isTest: true, delivery: 'email_only' } });
      await page.submit(); await page.settled();
      const state = await page.state(); assert.match(state.status, /test/i); retained(state);
    });
    if (form.name === 'contact') {
      await t.test('contact: accepted replay resets the form without a duplicate success event', async () => {
        await prepare(); page.mock({ body: { ...success, replayed: true } });
        await page.submit(); await page.settled();
        const state = await page.state();
        assert.equal(state.green, true); noLead(state);
        for (const id of Object.keys(form.fields)) assert.equal(state.values[id], '', `${id} resets after accepted replay`);
      });
    }
    await t.test(`${form.name}: double submit while pending sends one request`, async () => {
      await prepare(); let release;
      page.mock({ wait: new Promise(resolve => { release = resolve; }) });
      try {
        await page.submit(true); await delay(150);
        assert.equal(page.requests.length, 1);
        assert.equal(await page.evaluate("document.querySelector('form button[type=submit]').disabled"), true);
      } finally { release(); }
      await page.settled();
      assert.equal((await page.state()).leads, form.events);
    });
    await t.test(`${form.name}: correcting a failed inquiry submits the corrected fields`, async () => {
      await prepare(); page.mock({ status: 503, body: { error: 'Notification temporarily unavailable.' } });
      await page.submit(); await page.settled();
      const corrected = 'Corrected synthetic local-only request. Do not send.';
      await page.fill({ [form.correction]: corrected }); page.mock();
      await page.submit(); await page.settled();
      assert.equal(page.requests.length, 2);
      assert.equal(page.requests[1][form.payloadField], corrected);
      assert.equal(page.requests[1].clientSubmissionToken, page.requests[0].clientSubmissionToken);
      for (const [key, value] of Object.entries(page.requests[0])) {
        if (key !== form.payloadField) assert.deepEqual(page.requests[1][key], value, `${key} preserved after correction`);
      }
      assert.equal((await page.state()).green, true);
    });
    if (form.name === 'contact') {
      await t.test('contact: labelled owner recovery test succeeds without a real-lead event', async () => {
        await prepare();
        await page.fill({ 'contact-comment': '[OWNER RECOVERY TEST] Synthetic local-only verification.' });
        await page.submit(); await page.settled();
        const state = await page.state(); assert.equal(state.green, true); noLead(state);
        assert.equal(state.values['contact-comment'], '');
      });
    }
  }

  await t.test('service CTA emits analytics and preserves internal navigation', async () => {
    const selector = '[data-analytics-placement="home_services_grid"][data-analytics-service-cta="weekly-services"]';
    await page.openPage('/', selector);
    await page.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
    await page.until("window.location.pathname === '/services/weekly-services'", 'service CTA navigation');
    const events = await page.analyticsEvents('service_cta_click');
    assert.equal(events.length, 1);
    assert.deepEqual(events[0], {
      event: 'service_cta_click', service: 'weekly-services', destination: '/services/weekly-services',
      source_path: '/', cta_placement: 'home_services_grid', cta_text: 'View Weekly Services service details',
    });
  });

  await t.test('phone click emits analytics without canceling tel behavior', async () => {
    const selector = 'a[href^="tel:"]';
    await page.openPage('/contact', selector);
    const allowed = await page.evaluate(`document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))`);
    assert.equal(allowed, true, 'analytics listener must not prevent the tel link default action');
    const events = await page.analyticsEvents('phone_click');
    assert.equal(events.length, 1);
    assert.equal(events[0].page_path, '/contact');
    assert.match(events[0].link_url, /^tel:/);
  });
});
