"use client";

import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";

type FreeEstimateChoice = "yes" | "no";

type GiveawayEstimateValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  poolKind: string;
  poolSize: string;
  filterType: string;
  debrisExposure: string;
  poolCaretaker: string;
  biggestIssue: string;
  wantsFreeEstimate: FreeEstimateChoice;
  company: string;
};

type FieldErrors = Partial<Record<keyof GiveawayEstimateValues, string>>;

const initialValues: GiveawayEstimateValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  poolKind: "",
  poolSize: "",
  filterType: "",
  debrisExposure: "",
  poolCaretaker: "",
  biggestIssue: "",
  wantsFreeEstimate: "yes",
  company: "",
};

function validate(values: GiveawayEstimateValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.firstName.trim().length < 2) errors.firstName = "Enter your first name.";
  if (values.lastName.trim().length < 2) errors.lastName = "Enter your last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email.";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number.";
  if (values.address.trim().length < 4) errors.address = "Enter your street address.";
  if (values.city.trim().length < 2) errors.city = "Enter your city.";
  if (values.state.trim().length < 2) errors.state = "Enter your state.";
  if (values.zipCode.replace(/\D/g, "").length < 5) errors.zipCode = "Enter a valid ZIP code.";

  if (!values.poolKind) errors.poolKind = "Select your pool type.";
  if (!values.poolSize) errors.poolSize = "Select your pool size.";
  if (!values.filterType) errors.filterType = "Select your filter type.";
  if (!values.debrisExposure) errors.debrisExposure = "Select debris exposure.";
  if (!values.poolCaretaker) errors.poolCaretaker = "Select who cares for your pool.";
  if (values.biggestIssue.trim().length < 10) {
    errors.biggestIssue = "Share a short description (10+ characters).";
  }

  if (!["yes", "no"].includes(values.wantsFreeEstimate)) {
    errors.wantsFreeEstimate = "Choose yes or no.";
  }

  return errors;
}

export function GiveawayEstimateForm() {
  const [values, setValues] = useState<GiveawayEstimateValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const hasErrors = useMemo(() => Object.keys(fieldErrors).length > 0, [fieldErrors]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const submissionPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        poolType: values.poolKind,
        poolSize: values.poolSize,
        filterType: values.filterType,
        debrisExposure: values.debrisExposure,
        currentPoolCaretaker: values.poolCaretaker,
        biggestPoolIssue: values.biggestIssue,
        wantsFreeEstimate: values.wantsFreeEstimate,
        source: "free-estimate-pool-skimmer-giveaway",
        company: values.company,
        mode: "giveaway",
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Submission failed.");
      }

      setStatus("success");
      setMessage("Thanks. Your giveaway entry has been submitted.");
      setValues(initialValues);
      setFieldErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="mx-auto mt-8 max-w-2xl space-y-5 text-left" onSubmit={handleSubmit} noValidate>
      <Field label="First name" id="giveaway-first-name" error={fieldErrors.firstName}>
        <input
          id="giveaway-first-name"
          name="firstName"
          autoComplete="given-name"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.firstName}
          onChange={(event) => setValues((current) => ({ ...current, firstName: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.firstName)}
        />
      </Field>

      <Field label="Last name" id="giveaway-last-name" error={fieldErrors.lastName}>
        <input
          id="giveaway-last-name"
          name="lastName"
          autoComplete="family-name"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.lastName}
          onChange={(event) => setValues((current) => ({ ...current, lastName: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.lastName)}
        />
      </Field>

      <Field label="Email" id="giveaway-email" error={fieldErrors.email}>
        <input
          id="giveaway-email"
          type="email"
          name="email"
          autoComplete="email"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.email)}
        />
      </Field>

      <Field label="Phone" id="giveaway-phone" error={fieldErrors.phone}>
        <input
          id="giveaway-phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.phone}
          onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.phone)}
        />
      </Field>

      <Field label="Address" id="giveaway-address" error={fieldErrors.address}>
        <input
          id="giveaway-address"
          name="address"
          autoComplete="street-address"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.address}
          onChange={(event) => setValues((current) => ({ ...current, address: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.address)}
        />
      </Field>

      <Field label="City" id="giveaway-city" error={fieldErrors.city}>
        <input
          id="giveaway-city"
          name="city"
          autoComplete="address-level2"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.city}
          onChange={(event) => setValues((current) => ({ ...current, city: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.city)}
        />
      </Field>

      <Field label="State" id="giveaway-state" error={fieldErrors.state}>
        <input
          id="giveaway-state"
          name="state"
          autoComplete="address-level1"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.state}
          onChange={(event) => setValues((current) => ({ ...current, state: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.state)}
        />
      </Field>

      <Field label="Zip Code" id="giveaway-zip" error={fieldErrors.zipCode}>
        <input
          id="giveaway-zip"
          name="zipCode"
          autoComplete="postal-code"
          className="input-base rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.zipCode}
          onChange={(event) => setValues((current) => ({ ...current, zipCode: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.zipCode)}
        />
      </Field>

      <PoolKindField
        label="What kind of pool do you have?"
        id="giveaway-pool-kind"
        value={values.poolKind}
        error={fieldErrors.poolKind}
        onChange={(value) => setValues((current) => ({ ...current, poolKind: value }))}
      />

      <SelectField
        label="About how big is your pool?"
        id="giveaway-pool-size"
        value={values.poolSize}
        error={fieldErrors.poolSize}
        onChange={(value) => setValues((current) => ({ ...current, poolSize: value }))}
        options={[
          "Under 10000 gallons",
          "10000 - 15000 gallons",
          "15000 - 20000 gallons",
          "20000 - 30000 gallons",
          "30000 + gallons",
          "Not Sure",
        ]}
      />

      <SelectField
        label="What type of filter do you have?"
        id="giveaway-filter-type"
        value={values.filterType}
        error={fieldErrors.filterType}
        onChange={(value) => setValues((current) => ({ ...current, filterType: value }))}
        options={["Cartridge", "Sand", "DE", "Not sure"]}
      />

      <SelectField
        label="How much tree/debris exposure does your pool get?"
        id="giveaway-debris-exposure"
        value={values.debrisExposure}
        error={fieldErrors.debrisExposure}
        onChange={(value) => setValues((current) => ({ ...current, debrisExposure: value }))}
        options={["Low", "Moderate", "Heavy"]}
      />

      <SelectField
        label="Who currently takes care of your pool?"
        id="giveaway-caretaker"
        value={values.poolCaretaker}
        error={fieldErrors.poolCaretaker}
        onChange={(value) => setValues((current) => ({ ...current, poolCaretaker: value }))}
        options={["I do it myself", "Another pool company", "No one right now"]}
      />

      <Field label="What’s the biggest issue with your pool right now?" id="giveaway-biggest-issue" error={fieldErrors.biggestIssue}>
        <textarea
          id="giveaway-biggest-issue"
          name="biggestIssue"
          className="input-base min-h-32 rounded-2xl border-line/80 bg-white px-4 py-3.5"
          value={values.biggestIssue}
          onChange={(event) => setValues((current) => ({ ...current, biggestIssue: event.target.value }))}
          aria-invalid={Boolean(fieldErrors.biggestIssue)}
        />
      </Field>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-ink-muted">Do you want us to reach out for a FREE Estimate?</legend>
        <div className="flex flex-wrap gap-3">
          {([
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ] as const).map((option) => (
            <label
              key={option.value}
              className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-light-blue-soft/80 px-4 py-2.5 text-sm text-ink-muted"
            >
              <input
                type="radio"
                name="wantsFreeEstimate"
                value={option.value}
                className="accent-navy"
                checked={values.wantsFreeEstimate === option.value}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    wantsFreeEstimate: event.target.value as FreeEstimateChoice,
                  }))
                }
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.wantsFreeEstimate ? (
          <p className="mt-1 text-xs text-red-700">{fieldErrors.wantsFreeEstimate}</p>
        ) : null}
      </fieldset>

      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        className="btn-primary mt-1 w-full rounded-full py-3.5 text-sm font-bold tracking-[0.01em] sm:w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting..." : "Submit Giveaway Entry"}
      </button>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={status === "success" ? "text-sm text-green-700" : "text-sm text-red-700"}
        >
          {message}
        </p>
      ) : null}

      {hasErrors && status === "error" ? (
        <p className="text-xs text-ink-soft">Please review the highlighted fields and try again.</p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1 block text-sm font-medium text-ink-muted">{label}</span>
      {children}
      {error ? <p className="mt-1 text-xs text-red-700">{error}</p> : null}
    </label>
  );
}

function SelectField({
  label,
  id,
  value,
  error,
  options,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return <CustomSelectField label={label} id={id} value={value} error={error} options={options} onChange={onChange} />;
}

function PoolKindField({
  label,
  id,
  value,
  error,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const options = ["In-ground", "Above-ground", "Pool + spa"];
  return <CustomSelectField label={label} id={id} value={value} error={error} options={options} onChange={onChange} />;
}

function CustomSelectField({
  label,
  id,
  value,
  error,
  options,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(options.indexOf(value), 0));
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <Field label={label} id={id} error={error}>
      <div className="relative" ref={rootRef}>
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          className={`input-base flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/30 ${
            error ? "border-red-700" : "border-line/80"
          }`}
          onClick={() => {
            setIsOpen((open) => {
              const nextOpen = !open;
              if (nextOpen) {
                const selectedIndex = options.indexOf(value);
                setActiveIndex(Math.max(selectedIndex, 0));
              }
              return nextOpen;
            });
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setIsOpen(true);
              setActiveIndex((current) => {
                if (event.key === "ArrowDown") return (current + 1) % options.length;
                return (current - 1 + options.length) % options.length;
              });
            }
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (isOpen) {
                onChange(options[activeIndex]);
                setIsOpen(false);
              } else {
                setIsOpen(true);
              }
            }
            if (event.key === "Escape") {
              setIsOpen(false);
            }
          }}
        >
          <span className={value ? "text-ink-muted" : "text-ink-soft"}>{value || "Select one"}</span>
          <span className="text-xs text-ink-soft" aria-hidden="true">
            ▾
          </span>
        </button>

        {isOpen ? (
          <ul
            id={`${id}-listbox`}
            role="listbox"
            aria-labelledby={id}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_14px_28px_rgba(11,30,75,0.12)]"
          >
            {options.map((option, index) => {
              const isSelected = value === option;
              const isActive = activeIndex === index;
              return (
                <li key={option} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm transition ${
                      isSelected
                        ? "bg-navy text-white"
                        : isActive
                          ? "bg-light-blue-soft text-ink-muted"
                          : "text-ink-muted hover:bg-light-blue-soft/70"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </Field>
  );
}
