"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  emptyBid,
  parseBid,
  validateBid,
  projectTypes,
  bidSteps,
  type BidDraft,
  type BidErrors,
} from "./bid-schema";
import { business, services } from "./content";

const stepNames = ["Project", "Timing", "Contact", "Review"];
const fieldLabels: Record<keyof BidDraft, string> = {
  projectName: "Project name",
  projectType: "Project type",
  location: "Project location",
  scopes: "Scopes",
  description: "Scope description",
  bidDeadline: "Bid deadline",
  anticipatedStart: "Anticipated start",
  schedule: "Anticipated schedule",
  company: "Company",
  contactName: "Contact name",
  email: "Business email",
  phone: "Phone number",
  role: "Role / title",
  website: "Website",
};

export function BidPage({ local = false }: { local?: boolean }) {
  const [bid, setBid] = useState<BidDraft>({ ...emptyBid, scopes: [] });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<BidErrors>({});
  const [validationAttempt, setValidationAttempt] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "ready" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [reference, setReference] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  const abort = useRef<AbortController | null>(null);
  useEffect(() => {
    const search = local
      ? window.location.hash.split("?")[1]?.split("#")[0] || ""
      : window.location.search;
    const scope = new URLSearchParams(search).get("scope");
    if (services.some((s) => s.id === scope))
      setBid((current) => ({ ...current, scopes: [scope!] }));
    return () => abort.current?.abort();
  }, []);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    else mounted.current = true;
  }, [step, status === "ready"]);
  useEffect(() => {
    if (validationAttempt) summary.current?.focus();
  }, [validationAttempt]);
  const showErrors = (value: BidErrors) => {
    setErrors(value);
    setValidationAttempt((current) => current + 1);
  };
  const update =
    (key: keyof BidDraft) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const value = event.currentTarget.value;
      setBid((current) => ({ ...current, [key]: value }));
      setErrors((current) => ({ ...current, [key]: undefined }));
    };
  const next = () => {
    const allErrors = validateBid(parseBid(bid));
    const fields: readonly (keyof BidDraft)[] = [
      ...bidSteps[step as 0 | 1 | 2],
      ...(step === 1 ? ["anticipatedStart" as const] : []),
    ];
    const current = Object.fromEntries(
      Object.entries(allErrors).filter(([key]) =>
        fields.includes(key as keyof BidDraft),
      ),
    );
    if (Object.keys(current).length) {
      showErrors(current);
      return;
    }
    setErrors({});
    setStep(step + 1);
  };
  const submit = async () => {
    const clean = parseBid(bid);
    const allErrors = validateBid(clean);
    if (Object.keys(allErrors).length) {
      const first = Object.keys(allErrors)[0] as keyof BidDraft;
      const badStep = bidSteps.findIndex(
        (fields) =>
          (fields as readonly string[]).includes(first) ||
          (first === "anticipatedStart" &&
            fields.includes("schedule" as never)),
      );
      setStep(Math.max(0, badStep));
      showErrors(allErrors);
      return;
    }
    setStatus("sending");
    setErrorMessage("");
    const controller = new AbortController();
    abort.current = controller;
    const timer = window.setTimeout(() => controller.abort(), 10000);
    try {
      let draftReference: string;
      if (local)
        draftReference = `LOCAL-DRAFT-${Array.from(
          crypto.getRandomValues(new Uint8Array(4)),
          (byte) => byte.toString(16).padStart(2, "0"),
        )
          .join("")
          .toUpperCase()}`;
      else {
        const response = await fetch("/api/redesign/bid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clean),
          signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) {
          if (result.errors) showErrors(result.errors);
          throw new Error(
            result.message ||
              "The draft could not be validated. Please try again.",
          );
        }
        if (result.sent !== false || result.mode !== "preview")
          throw new Error(
            "Unexpected response. Nothing has been confirmed as sent.",
          );
        draftReference = result.reference;
      }
      setBid(clean);
      setReference(draftReference);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.name === "AbortError"
          ? "Validation timed out. Your details are still here. Try again."
          : error instanceof Error
            ? error.message
            : "Validation failed. Your details are still here. Try again.",
      );
    } finally {
      window.clearTimeout(timer);
      abort.current = null;
    }
  };
  const download = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            reference,
            mode: local ? "local-preview" : "preview",
            sent: false,
            ...bid,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "ADVA-bid-draft.json";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const field = (
    key: Exclude<keyof BidDraft, "scopes">,
    options?: {
      type?: string;
      optional?: boolean;
      wide?: boolean;
      textarea?: boolean;
      hint?: string;
      autoComplete?: string;
    },
  ) => (
    <div className={`adva-field ${options?.wide ? "wide" : ""}`} key={key}>
      <label htmlFor={`bid-${key}`}>
        {fieldLabels[key]}
        {options?.optional ? <span>Optional</span> : <span>Required</span>}
      </label>
      {options?.textarea ? (
        <textarea
          id={`bid-${key}`}
          name={key}
          value={bid[key]}
          onChange={update(key)}
          rows={5}
          maxLength={5000}
          aria-invalid={!!errors[key]}
          aria-describedby={
            errors[key]
              ? `error-${key}`
              : options.hint
                ? `hint-${key}`
                : undefined
          }
          required={!options.optional}
        />
      ) : (
        <input
          id={`bid-${key}`}
          name={key}
          type={options?.type || "text"}
          value={bid[key]}
          onChange={update(key)}
          maxLength={key === "email" ? 254 : 200}
          autoComplete={options?.autoComplete || "off"}
          aria-invalid={!!errors[key]}
          aria-describedby={
            errors[key]
              ? `error-${key}`
              : options?.hint
                ? `hint-${key}`
                : undefined
          }
          required={!options?.optional}
        />
      )}
      {options?.hint && !errors[key] && (
        <p id={`hint-${key}`} className="adva-field-hint">
          {options.hint}
        </p>
      )}
      {errors[key] && (
        <p id={`error-${key}`} className="adva-field-error">
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <section className="adva-bid-page adva-container">
      <aside className="adva-bid-aside">
        <span className="adva-eyebrow">LET’S TALK SCOPE</span>
        <h1>
          Start with
          <br />
          <span>the details.</span>
        </h1>
        <p>
          Tell us what your project needs. We’ll use the scope, location, and
          timing to start the conversation.
        </p>
        <div className="adva-bid-contact">
          <span className="adva-eyebrow">PREFER TO TALK?</span>
          <a href={business.officeHref}>{business.office}</a>
          <span>{business.location}</span>
        </div>
        <div className="adva-prototype-note">
          <strong>Bid workflow preview</strong>
          <p>
            This form validates a draft. It does not send an inquiry, notify
            ADVA, or store your contact information.
          </p>
          <p>Use sample details while reviewing.</p>
        </div>
      </aside>
      <div className="adva-bid-form-area">
        {status === "ready" ? (
          <div className="adva-draft-ready">
            <span className="adva-ready-icon" aria-hidden="true">
              ✓
            </span>
            <span className="adva-eyebrow">{reference}</span>
            <h2 tabIndex={-1} ref={heading}>
              Bid draft ready.
            </h2>
            <p>
              Your details passed {local ? "local " : ""}validation.{" "}
              <strong>Nothing has been sent to ADVA.</strong>
            </p>
            <dl>
              <div>
                <dt>Project</dt>
                <dd>{bid.projectName}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{bid.location}</dd>
              </div>
              <div>
                <dt>Bid deadline</dt>
                <dd>{bid.bidDeadline}</dd>
              </div>
              <div>
                <dt>Company</dt>
                <dd>{bid.company}</dd>
              </div>
            </dl>
            <div className="adva-form-actions">
              <button
                className="adva-button adva-button-brand"
                onClick={download}
              >
                Download draft
              </button>
              <button
                className="adva-text-link"
                onClick={() => {
                  setStatus("idle");
                  setStep(0);
                }}
              >
                Edit details
              </button>
            </div>
            <p className="adva-field-hint">
              The downloaded file contains the contact details you entered. This
              preview keeps nothing on the server.
            </p>
          </div>
        ) : (
          <>
            <ol className="adva-stepper" aria-label="Bid request progress">
              {stepNames.map((name, index) => (
                <li
                  key={name}
                  className={
                    index === step ? "current" : index < step ? "complete" : ""
                  }
                  aria-current={index === step ? "step" : undefined}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {name}
                </li>
              ))}
            </ol>
            <h2 tabIndex={-1} ref={heading}>
              {
                [
                  "Tell us about the project.",
                  "Align the timing.",
                  "Who should we contact?",
                  "Review your scope.",
                ][step]
              }
            </h2>
            <p className="adva-form-intro">
              {
                [
                  "A little context helps define the right scope.",
                  "Share your deadline and anticipated schedule.",
                  "Add the business contact for this project.",
                  "Check your details before validating this preview draft.",
                ][step]
              }
            </p>
            {Object.entries(errors).some(([, message]) => message) && (
              <div
                className="adva-error-summary"
                role="alert"
                tabIndex={-1}
                ref={summary}
              >
                <strong>Check the following details</strong>
                <ul>
                  {Object.entries(errors)
                    .filter(([, message]) => message)
                    .map(([key, message]) => (
                      <li key={key}>
                        <a
                          href={`#bid-${key}`}
                          onClick={(event) => {
                            event.preventDefault();
                            document.getElementById(`bid-${key}`)?.focus();
                          }}
                        >
                          {message}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (step < 3) next();
                else void submit();
              }}
              noValidate
            >
              <div className="adva-honeypot" aria-hidden="true">
                <label htmlFor="bid-website">Website</label>
                <input
                  id="bid-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={bid.website}
                  onChange={update("website")}
                />
              </div>
              <div className="adva-form-grid">
                {step === 0 && (
                  <>
                    {field("projectName", { wide: true })}
                    <div className="adva-field">
                      <label htmlFor="bid-projectType">
                        Project type<span>Required</span>
                      </label>
                      <select
                        id="bid-projectType"
                        name="projectType"
                        value={bid.projectType}
                        onChange={update("projectType")}
                        required
                        aria-invalid={!!errors.projectType}
                        aria-describedby={
                          errors.projectType ? "error-projectType" : undefined
                        }
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p id="error-projectType" className="adva-field-error">
                          {errors.projectType}
                        </p>
                      )}
                    </div>
                    {field("location", {
                      hint: "City and site address, if available.",
                    })}
                    <fieldset
                      id="bid-scopes"
                      tabIndex={-1}
                      className="adva-field adva-scope-field wide"
                      aria-invalid={!!errors.scopes}
                      aria-describedby={
                        errors.scopes ? "error-scopes" : undefined
                      }
                    >
                      <legend>
                        Scope needed{" "}
                        <span>Required · select all that apply</span>
                      </legend>
                      <div>
                        {services.map((s) => (
                          <label key={s.id}>
                            <input
                              type="checkbox"
                              name="scopes"
                              value={s.id}
                              checked={bid.scopes.includes(s.id)}
                              onChange={(event) => {
                                setBid((current) => ({
                                  ...current,
                                  scopes: event.target.checked
                                    ? [...current.scopes, s.id]
                                    : current.scopes.filter(
                                        (scope) => scope !== s.id,
                                      ),
                                }));
                                setErrors((current) => ({
                                  ...current,
                                  scopes: undefined,
                                }));
                              }}
                            />
                            {s.short}
                          </label>
                        ))}
                      </div>
                      {errors.scopes && (
                        <p id="error-scopes" className="adva-field-error">
                          {errors.scopes}
                        </p>
                      )}
                    </fieldset>
                    {field("description", {
                      wide: true,
                      textarea: true,
                      hint: "Describe the work, known site conditions, and quantities if available.",
                    })}
                  </>
                )}
                {step === 1 && (
                  <>
                    {field("bidDeadline", { type: "date" })}
                    {field("anticipatedStart", {
                      type: "date",
                      optional: true,
                    })}
                    {field("schedule", {
                      wide: true,
                      hint: "For example: a planned start window and anticipated duration. “To be confirmed” is acceptable.",
                    })}
                    <div className="adva-document-note wide">
                      <strong>Plans & supporting documents</strong>
                      <p>
                        Document upload is not connected in this preview. The
                        team can coordinate document exchange after the inquiry
                        workflow is enabled.
                      </p>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    {field("company", {
                      wide: true,
                      autoComplete: "organization",
                    })}
                    {field("contactName", { autoComplete: "name" })}
                    {field("role", {
                      optional: true,
                      autoComplete: "organization-title",
                    })}
                    {field("email", { type: "email", autoComplete: "email" })}
                    {field("phone", {
                      type: "tel",
                      optional: true,
                      autoComplete: "tel",
                    })}
                    <p className="adva-form-privacy wide">
                      These details are used only to validate your preview
                      draft. They are not saved or emailed.
                    </p>
                  </>
                )}
                {step === 3 && (
                  <div className="adva-bid-review wide">
                    {(["Project", "Timing", "Contact"] as const).map(
                      (label, index) => (
                        <section key={label}>
                          <div>
                            <h3>{label}</h3>
                            <button
                              type="button"
                              disabled={status === "sending"}
                              className="adva-text-link"
                              onClick={() => setStep(index)}
                              aria-label={`Edit ${label.toLowerCase()} details`}
                            >
                              Edit
                            </button>
                          </div>
                          <dl>
                            {(index === 0
                              ? [
                                  "projectName",
                                  "projectType",
                                  "location",
                                  "scopes",
                                  "description",
                                ]
                              : index === 1
                                ? [
                                    "bidDeadline",
                                    "anticipatedStart",
                                    "schedule",
                                  ]
                                : [
                                    "company",
                                    "contactName",
                                    "role",
                                    "email",
                                    "phone",
                                  ]
                            ).map((key) => (
                              <div key={key}>
                                <dt>{fieldLabels[key as keyof BidDraft]}</dt>
                                <dd>
                                  {key === "scopes"
                                    ? bid.scopes
                                        .map(
                                          (scope) =>
                                            services.find((s) => s.id === scope)
                                              ?.short,
                                        )
                                        .join(", ")
                                    : bid[
                                        key as Exclude<keyof BidDraft, "scopes">
                                      ] || "Not specified"}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </section>
                      ),
                    )}
                  </div>
                )}
              </div>
              {status === "error" && (
                <p className="adva-submit-error" role="alert">
                  {errorMessage}
                </p>
              )}
              <div className="adva-form-actions">
                {step > 0 && (
                  <button
                    type="button"
                    disabled={status === "sending"}
                    className="adva-button adva-button-outline"
                    onClick={() => {
                      setErrors({});
                      setStep(step - 1);
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="adva-button adva-button-brand"
                  disabled={status === "sending"}
                >
                  {step === 3
                    ? status === "sending"
                      ? "Validating…"
                      : "Validate bid draft"
                    : "Continue"}
                </button>
                <span className="adva-mono">{step + 1} / 4</span>
              </div>
              <p className="adva-field-hint">
                Preview only. No inquiry is sent to ADVA.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
