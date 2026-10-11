"use client";

import { FormEvent, SyntheticEvent, useMemo, useRef, useState } from "react";

import { trackAnalyticsEvent } from "@/lib/analytics";

const productOptions = [
  { name: "Chlorine Tabs", sizes: ["25 lb", "50 lb"] },
  { name: "Pool Shock", sizes: ["25 lb", "50 lb", "100 lb"] },
  { name: "Liquid Chlorine", sizes: ["Case — 4 gallons"] },
  { name: "Muriatic Acid", sizes: ["Case — 4 gallons"] },
  { name: "Sodium Bicarbonate", sizes: ["30 lb bag"] },
  { name: "Pool Salt", sizes: ["40 lb bag"] },
] as const;

type LineItem = {
  id: string;
  product: string;
  size: string;
  quantity: string;
};

type FormValues = {
  clientSubmissionToken: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  company: string;
};

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "address" | "items", string>>;

function createToken() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createLineItem(): LineItem {
  return { id: createToken(), product: "", size: "", quantity: "1" };
}

function createInitialValues(): FormValues {
  return {
    clientSubmissionToken: createToken(),
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    company: "",
  };
}

function sizesFor(product: string) {
  return productOptions.find((option) => option.name === product)?.sizes ?? [];
}

function validate(values: FormValues, items: LineItem[]): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  if (values.address.trim().length < 4) errors.address = "Enter the delivery address.";
  if (items.some((item) => !item.product || !item.size || !/^\d+$/.test(item.quantity) || Number(item.quantity) < 1)) {
    errors.items = "Choose a product and size, then enter a quantity of at least 1 for every item.";
  }
  return errors;
}

function serializeRequest(items: LineItem[], address: string, notes: string) {
  const ownerRecoveryPrefix = notes.trimStart().startsWith("[OWNER RECOVERY TEST]")
    ? "[OWNER RECOVERY TEST]\n"
    : "";
  const lines = items.map((item) => `- ${item.product} — ${item.size} — Quantity: ${item.quantity}`);
  return [
    `${ownerRecoveryPrefix}[CHEMICAL DELIVERY REQUEST]`,
    "Products:",
    ...lines,
    `Delivery address: ${address.trim()}`,
    notes.trim() ? `Special delivery notes: ${notes.trim()}` : "Special delivery notes: None provided",
  ].join("\n");
}

export function ChemicalDeliveryForm() {
  const [values, setValues] = useState<FormValues>(() => createInitialValues());
  const [items, setItems] = useState<LineItem[]>(() => [createLineItem()]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inFlight = useRef(false);
  const hasStarted = useRef(false);
  const hasErrors = useMemo(() => Object.keys(fieldErrors).length > 0, [fieldErrors]);

  function handleFormInteraction(event: SyntheticEvent<HTMLFormElement>) {
    const target = event.target;
    if (
      hasStarted.current ||
      !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) ||
      target.name === "company"
    ) return;

    hasStarted.current = true;
    try {
      trackAnalyticsEvent("contact_form_start", {
        form_name: "chemical_delivery_request",
        first_field: target.name,
        page_path: window.location.pathname,
      });
    } catch {
      // Analytics must not interfere with the request form.
    }
  }

  function updateItem(id: string, changes: Partial<LineItem>) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...changes } : item));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const errors = validate(values, items);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setMessage("");
    const comment = serializeRequest(items, values.address, values.notes);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSubmissionToken: values.clientSubmissionToken,
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          comment,
          preferredContactMethod: "text",
          source: "free-pool-chemical-delivery",
          landingPagePath: window.location.pathname,
          referrer: document.referrer,
          company: values.company,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        accepted?: boolean;
        replayed?: boolean;
        isTest?: boolean;
        delivery?: string;
        error?: string;
      } | null;

      if (!response.ok || payload?.ok !== true) {
        throw new Error(typeof payload?.error === "string" ? payload.error : "We could not confirm your request.");
      }
      if (payload.isTest === true) {
        setStatus("error");
        setMessage("Test submission only. Please use the call or text links on this page for a real request.");
        return;
      }
      if (payload.accepted !== true) throw new Error("Your request was not accepted.");

      setStatus("success");
      setMessage(payload.delivery === "email_only"
        ? "Thanks. Your chemical delivery request was accepted for email delivery."
        : "Thanks. Your chemical delivery request was received.");
      setValues(createInitialValues());
      setItems([createLineItem()]);
      setFieldErrors({});

      if (payload.replayed !== true && !comment.trimStart().startsWith("[OWNER RECOVERY TEST]")) {
        try {
          trackAnalyticsEvent("generate_lead", {
            form_name: "chemical_delivery_request",
            contact_method: "text",
            page_path: window.location.pathname,
          });
        } catch {
          // Reporting must not turn an accepted request into a retry.
        }
      }
    } catch (error) {
      setStatus("error");
      const detail = error instanceof Error ? error.message : "We could not confirm your request.";
      setMessage(`${detail} Please try again, or use the call or text links on this page.`);
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form
      id="chemical-delivery-request"
      className="relative overflow-hidden rounded-[1.7rem] border border-line/85 bg-white p-6 shadow-[0_18px_38px_rgba(11,30,75,0.09)] md:p-8"
      onChangeCapture={handleFormInteraction}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_10%,rgba(169,221,245,0.18),transparent_34%),radial-gradient(circle_at_8%_88%,rgba(230,180,199,0.08),transparent_34%)]" aria-hidden="true" />
      <div className="relative z-10">
        <p className="section-label">No checkout or payment due now</p>
        <h2 className="mt-2 font-sans text-[1.9rem] font-bold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.4rem]">Chemical Delivery Request</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
          Tell us what you need. We will confirm availability, pricing, and expected timing before sending an invoice or payment link.
        </p>

        <fieldset className="mt-6">
          <legend className="text-base font-semibold text-navy">Products requested</legend>
          <div className="mt-3 grid gap-4">
            {items.map((item, index) => (
              <div key={item.id} className="rounded-[1.1rem] border border-line/80 bg-light-blue-soft/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-navy">Item {index + 1}</p>
                  {items.length > 1 ? (
                    <button type="button" className="focus-ring text-sm font-semibold text-navy underline underline-offset-4" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}>
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_1fr_0.55fr]">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-ink-muted">Chemical / product</span>
                    <select
                      className="input-base rounded-[0.9rem] border-line/85 bg-white"
                      name={`product-${index}`}
                      value={item.product}
                      onChange={(event) => updateItem(item.id, { product: event.target.value, size: "" })}
                    >
                      <option value="">Choose a product</option>
                      {productOptions.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-ink-muted">Size</span>
                    <select
                      className="input-base rounded-[0.9rem] border-line/85 bg-white"
                      name={`size-${index}`}
                      value={item.size}
                      disabled={!item.product}
                      onChange={(event) => updateItem(item.id, { size: event.target.value })}
                    >
                      <option value="">Choose a size</option>
                      {sizesFor(item.product).map((size) => <option key={size} value={size}>{size}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium text-ink-muted">Quantity</span>
                    <input
                      className="input-base rounded-[0.9rem] border-line/85 bg-white"
                      type="number"
                      name={`quantity-${index}`}
                      min="1"
                      step="1"
                      inputMode="numeric"
                      value={item.quantity}
                      onChange={(event) => updateItem(item.id, { quantity: event.target.value })}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 min-h-4 text-xs text-red-700">{fieldErrors.items ?? ""}</p>
          <button type="button" className="btn-subtle focus-ring mt-2" onClick={() => setItems((current) => [...current, createLineItem()])}>
            Add Another Product
          </button>
        </fieldset>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink-muted">Name</span>
            <input id="chemical-name" className="input-base rounded-[0.9rem] border-line/85 bg-white" name="name" autoComplete="name" value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} aria-invalid={Boolean(fieldErrors.name)} />
            <p className="mt-1 min-h-4 text-xs text-red-700">{fieldErrors.name ?? ""}</p>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink-muted">Email</span>
            <input id="chemical-email" type="email" className="input-base rounded-[0.9rem] border-line/85 bg-white" name="email" autoComplete="email" value={values.email} onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))} aria-invalid={Boolean(fieldErrors.email)} />
            <p className="mt-1 min-h-4 text-xs text-red-700">{fieldErrors.email ?? ""}</p>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink-muted">Phone</span>
            <input id="chemical-phone" type="tel" className="input-base rounded-[0.9rem] border-line/85 bg-white" name="phone" autoComplete="tel" value={values.phone} onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))} aria-invalid={Boolean(fieldErrors.phone)} />
            <p className="mt-1 min-h-4 text-xs text-red-700">{fieldErrors.phone ?? ""}</p>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-ink-muted">Delivery address</span>
            <input id="chemical-address" className="input-base rounded-[0.9rem] border-line/85 bg-white" name="address" autoComplete="street-address" value={values.address} onChange={(event) => setValues((current) => ({ ...current, address: event.target.value }))} aria-invalid={Boolean(fieldErrors.address)} />
            <p className="mt-1 min-h-4 text-xs text-red-700">{fieldErrors.address ?? ""}</p>
          </label>
        </div>

        <label className="mt-2 block">
          <span className="mb-1 block text-sm font-medium text-ink-muted">Special delivery notes <span className="font-normal text-ink-soft">(optional)</span></span>
          <textarea
            id="chemical-notes"
            className="input-base min-h-28 rounded-[0.9rem] border-line/85 bg-white"
            name="notes"
            placeholder="Where to leave products, gate or access instructions, and other delivery preferences"
            value={values.notes}
            onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
          />
        </label>

        <input type="text" name="company" value={values.company} onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        <button type="submit" className="btn-primary mt-5" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Request Chemical Delivery"}
        </button>
        <p role="status" aria-live="polite" className={`mt-3 min-h-5 text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}>{message}</p>
        <p className="min-h-4 text-xs text-ink-soft">{hasErrors && status === "error" ? "Please review the highlighted fields and try again." : ""}</p>
      </div>
    </form>
  );
}
