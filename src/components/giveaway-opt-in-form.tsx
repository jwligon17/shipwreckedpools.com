"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function GiveawayOptInForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          company: "",
          mode: "giveaway",
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Submission failed.");
      }

      setStatus("success");
      setMessage("You’re in. We’ll share updates by email.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <form className="mx-auto mt-6 max-w-lg" onSubmit={handleSubmit} noValidate>
      <label htmlFor="giveaway-email" className="sr-only">
        Email
      </label>
      <div className="flex items-center gap-2">
        <input
          id="giveaway-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="focus-ring w-full rounded-full border border-line bg-white px-5 py-3.5 text-sm text-ink placeholder:text-ink-soft"
          aria-invalid={status === "error"}
        />
        <button
          type="submit"
          className="btn-primary focus-ring min-w-[6.4rem] px-4 py-3"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "..." : "Enter"}
        </button>
      </div>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
