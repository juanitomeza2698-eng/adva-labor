# ADVA Labor: isolated industrial editorial redesign

This branch adds a reviewable redesign at `/redesign` and leaves the original homepage route in place. It has not been deployed. The connected Next repository differs from the current public HTML site; confirm production ownership and hosting before promotion.

## Review routes

- `/redesign`: Concrete / Editorial homepage, the recommended direction.
- `/redesign/services`: four scopes, detailed service layouts, and scope-specific bid links.
- `/redesign/projects`: existing field photography, accessible filters and lightbox. No named-project attribution is asserted.
- `/redesign/bid`: four-step preview workflow with shared browser/server validation.
- `/redesign/directions`: A / Carbon and B / Concrete comparison.
- `/api/redesign/bid`: preview-only validation, never sends email or persists an inquiry.

Run `npm ci`, then `npm run dev:next` for the Next app. Run `npm run build` and `npm run typecheck` before review. `node scripts/check-bid.mjs` exercises 18 negative and positive validation/API checks without contacting an email provider.

## Architecture

`src/redesign/content.ts` centralizes business content and photograph metadata. `styles.css` scopes tokens and styles to `.adva-design`. `Shell.tsx` owns native dialog navigation and the footer. Static page content stays separate from the interactive bid, filter, and motion components. Motion uses `LazyMotion`, `domAnimation`, and `m`, with reduced-motion support and SSR-visible content.

The preview tooling in `preview/` renders the same components without changing the production stack. `scripts/dev.mjs` forwards supervised review flags to Vite and retains normal Next development. `npm run review:build` builds a compiled review; `node scripts/export-review.mjs /absolute/path/ADVA-Interactive-Prototype.html` embeds the optimized images and fonts for a single-file offline review. The offline bid validates locally and sends nothing. The optional review frame supports 320, 390, 768, 1024, and 1440px viewports.

## Content and rights

All photos come from the existing repository. `assets.json` records their original paths. Optimization strips metadata and produces WebP assets, including a separate mobile hero crop. Photography ownership, releases, actual project names, and dates remain owner confirmation items. Self-hosted Archivo and IBM Plex Mono include their OFL licenses. Motion and Vite are MIT packages. No 21st component source was copied.

Current public office/contact details are retained. Existing claims about 100+ trucks, 48-hour estimates, E-470, insurance/licensing, OSHA/EPA, and hazardous-material authorization are not treated as independently verified evidence. Raquel Gallardo's public title conflicts between sections. The older repository inbox differs from the public site's inbox. Resolve these before launch.

## Bid boundary and launch plan

The new endpoint accepts JSON up to 16 KiB, checks origin when present, validates listed scopes/types and dates, uses a honeypot, and returns explicit `mode: preview`, `sent: false`, `stored: false`. Its 20/minute limiter is ephemeral, accepts proxy headers, and is not suitable as a production abuse control. A draft reference is not a received bid.

To enable real inquiries: confirm the receiving inbox and authenticated sender domain; add a durable inquiry record and idempotency key; use an infrastructure-backed limit and bot control; enqueue delivery and observe provider failures; notify the ADVA estimator and confirm receipt to the submitter; publish an owner-approved privacy/retention notice; verify delivery and retry behavior end to end. Keep successful submission distinct from confirmed email delivery. No upload control is enabled. If plans are accepted later, use private storage, short-lived signed access, size/type checks, malware scanning, access authorization, and a retention policy.

The legacy email action now creates Resend only when invoked, requires `RESEND_API_KEY`, `ADVA_BID_FROM`, and `ADVA_BID_TO`, and checks provider errors. It no longer has placeholder sender/recipient values. This does not connect the redesign bid.

## QA and remaining risks

Typecheck, Next build, Vite review build, and 18 bid checks passed. The four core pages were inspected in Chrome at five viewport widths without document overflow. Mobile menu Escape/focus return, gallery filtering/transitions/focus return, service scope prefill, inline validation/error-summary focus, and a preview submission were exercised. The downloaded sample draft was confirmed as preview and unsent.

At review time, `npm audit` reports 9 inherited dependency-chain findings (6 high, 3 moderate), with 2 remaining under `--omit=dev` (Next/PostCSS). Compatible updates were applied; a forced Next 16 or Tailwind 4 migration was not performed. Resolve these before production. No Lighthouse score, physical-device testing, screen-reader session, notification delivery, production routing, or production Core Web Vitals is claimed.

Promotion must wait for explicit owner approval. This branch must not replace the current public website automatically.
