"use client";

import { FormEvent, SyntheticEvent, useMemo, useRef, useState } from "react";

import { trackAnalyticsEvent } from "@/lib/analytics";

type PreferredContactMethod = "text" | "phone" | "email";

type ContactFormValues = {
  clientSubmissionToken: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  preferredContactMethod: PreferredContactMethod;
  company: string;
};

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

function createSubmissionToken() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createInitialValues(): ContactFormValues {
  return {
    clientSubmissionToken: createSubmissionToken(),
    name: "",
    email: "",
    phone: "",
    comment: "",
    preferredContactMethod: "text",
    company: "",
  };
}

const preferredContactMethodLabels: Record<PreferredContactMethod, string> = {
  text: "Text",
  phone: "Call",
  email: "Email",
};

function validate(values: ContactFormValues): FieldErrors {
  const errors: FieldErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const phoneDigits = values.phone.replace(/\D/g, "");
  const comment = values.comment.trim();

  if (name.length < 2) {
    errors.name = "Enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phoneDigits.length < 10) {
    errors.phone = "Enter a valid phone number.";
  }

  if (comment.length < 10) {
    errors.comment = "Please add a short comment (10+ characters).";
  }

  if (!["text", "phone", "email"].includes(values.preferredContactMethod)) {
    errors.preferredContactMethod = "Choose a preferred contact method.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(() => createInitialValues());
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const inFlight = useRef(false);
  const hasStarted = useRef(false);

  const hasErrors = useMemo(() => Object.keys(fieldErrors).length > 0, [fieldErrors]);

  function handleFormInteraction(event: SyntheticEvent<HTMLFormElement>) {
    const target = event.target;
    if (hasStarted.current || !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    if (target.name === "company") {
      return;
    }

    hasStarted.current = true;
    try {
      trackAnalyticsEvent("contact_form_start", {
        form_name: "contact_quote",
        first_field: target.name,
        page_path: window.location.pathname,
      });
    } catch {
      // Analytics must not interfere with form input.
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const nextErrors = validate(values);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          landingPagePath: window.location.pathname,
          referrer: document.referrer,
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
        throw new Error(typeof payload?.error === "string" ? payload.error : "We could not confirm your submission.");
      }

      if (payload.isTest === true) {
        setStatus("error");
        setMessage("Test submission only. Please use the call/text links on this page for a real inquiry.");
        return;
      }

      if (payload.accepted !== true) {
        throw new Error("Your request was not accepted.");
      }

      setStatus("success");
      setMessage(payload.delivery === "email_only"
        ? "Thanks. Your quote request was accepted for email delivery."
        : "Thanks. Your quote request was received.");
      setValues(createInitialValues());
      setFieldErrors({});
      // Exclude the labelled owner recovery check from lead reporting.
      if (payload.replayed !== true && !values.comment.trimStart().startsWith("[OWNER RECOVERY TEST]")) {
        try {
          trackAnalyticsEvent("generate_lead", {
            form_name: "contact_quote",
            contact_method: values.preferredContactMethod,
            page_path: window.location.pathname,
          });
        } catch {
          // A reporting failure must not turn an accepted inquiry into a retry.
        }
      }
    } catch (error) {
      setStatus("error");
      const detail = error instanceof Error ? error.message : "We could not confirm your submission.";
      setMessage(`${detail} Please try again, or use the call/text links on this page.`);
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form
      className="relative overflow-hidden rounded-[1.7rem] border border-line/85 bg-white p-7 shadow-[0_18px_38px_rgba(11,30,75,0.09)] md:p-8"
      onChangeCapture={handleFormInteraction}
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_10%,rgba(169,221,245,0.18),transparent_34%),radial-gradient(circle_at_8%_88%,rgba(230,180,199,0.08),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 space-y-4">
      <h2 className="font-sans text-[1.85rem] font-bold leading-[0.95] tracking-[-0.02em] text-navy md:text-[2.3rem]">Quote Request Form</h2>
      <p className="text-sm leading-relaxed text-ink-soft">
        Share your pool concerns, service address, and preferred contact method. We use this to route your quote request and follow up with practical next steps.
      </p>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-muted">Name</span>
        <input
          id="contact-name"
          className="input-base rounded-[0.9rem] border-line/85 bg-white/95"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
        />
        <p id="contact-name-error" className="mt-1 min-h-4 text-xs text-red-700">
          {fieldErrors.name ?? ""}
        </p>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-muted">Email</span>
        <input
          id="contact-email"
          type="email"
          className="input-base rounded-[0.9rem] border-line/85 bg-white/95"
          name="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
        />
        <p id="contact-email-error" className="mt-1 min-h-4 text-xs text-red-700">
          {fieldErrors.email ?? ""}
        </p>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-muted">Phone</span>
        <input
          id="contact-phone"
          type="tel"
          className="input-base rounded-[0.9rem] border-line/85 bg-white/95"
          name="phone"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.phone)}
          aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
        />
        <p id="contact-phone-error" className="mt-1 min-h-4 text-xs text-red-700">
          {fieldErrors.phone ?? ""}
        </p>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink-muted">Comment</span>
        <textarea
          id="contact-comment"
          className="input-base min-h-32 rounded-[0.9rem] border-line/85 bg-white/95"
          name="comment"
          required
          value={values.comment}
          onChange={(event) => setValues((current) => ({ ...current, comment: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.comment)}
          aria-describedby={fieldErrors.comment ? "contact-comment-error" : undefined}
        />
        <p id="contact-comment-error" className="mt-1 min-h-4 text-xs text-red-700">
          {fieldErrors.comment ?? ""}
        </p>
      </label>

      <fieldset>
        <legend className="mb-1 block text-sm font-medium text-ink-muted">Preferred contact method</legend>
        <div className="flex flex-wrap gap-3">
          {(["text", "phone", "email"] as PreferredContactMethod[]).map((method) => (
            <label key={method} className="inline-flex items-center gap-2 rounded-full border border-line/85 bg-light-blue-soft/70 px-4 py-2 text-sm text-ink-muted">
              <input
                type="radio"
                name="preferredContactMethod"
                value={method}
                className="accent-navy"
                checked={values.preferredContactMethod === method}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    preferredContactMethod: event.target.value as PreferredContactMethod,
                  }))
                }
              />
              <span>{preferredContactMethodLabels[method]}</span>
            </label>
          ))}
        </div>
        <p className="mt-1 min-h-4 text-xs text-red-700">{fieldErrors.preferredContactMethod ?? ""}</p>
      </fieldset>

      <input
        type="text"
        name="company"
        value={values.company ?? ""}
        onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button type="submit" className="btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Get a Quote"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}
      >
        {message}
      </p>

      <p className="min-h-4 text-xs text-ink-soft">
        {hasErrors && status === "error" ? "Please review the highlighted fields and try again." : ""}
      </p>
      </div>
    </form>
  );
}
