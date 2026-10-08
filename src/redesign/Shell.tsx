"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { business } from "./content";
import { MotionRoot } from "./Motion";

export function Wordmark() {
  return (
    <span className="adva-wordmark">
      <strong>
        ADVA<span className="brand-period">.</span>
      </strong>
      <span>LABOR SERVICES INC.</span>
    </span>
  );
}

const links = [
  ["Services", "/redesign/services"],
  ["Projects", "/redesign/projects"],
  ["Company", "/redesign#company"],
] as const;

function Header({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = menuRef.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
    document.documentElement.classList.toggle("adva-menu-open", open);
    return () => document.documentElement.classList.remove("adva-menu-open");
  }, [open]);
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };
  return (
    <>
      <div className="adva-preview-notice">
        <span>DESIGN PREVIEW</span>
        <span>Bid requests are not sent.</span>
        <a href="/redesign/directions">Compare directions</a>
      </div>
      <header className="adva-header">
        <a
          className="adva-home-link"
          href="/redesign"
          aria-label="ADVA Labor home"
        >
          <Wordmark />
        </a>
        <nav className="adva-desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              key={label}
              className={active === label ? "active" : ""}
              href={href}
              aria-current={active === label ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="adva-button adva-header-bid" href="/redesign/bid">
          Request a bid
        </a>
        <button
          className="adva-menu-toggle"
          ref={toggleRef}
          aria-label="Open navigation"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="adva-mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        id="adva-mobile-menu"
        ref={menuRef}
        className="adva-mobile-menu"
        aria-labelledby="adva-menu-title"
        onCancel={close}
        onClose={() => setOpen(false)}
      >
        <div className="adva-menu-heading">
          <h2 id="adva-menu-title">Navigation</h2>
          <button
            className="adva-close"
            onClick={close}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, href], i) => (
            <a key={label} href={href} onClick={close}>
              <span className="adva-mono">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a href="/redesign/bid" onClick={close}>
            <span className="adva-mono">04</span>Request a bid
          </a>
        </nav>
        <div className="adva-menu-contact">
          <span>Aurora, Colorado</span>
          <a href={business.officeHref}>{business.office}</a>
        </div>
      </dialog>
    </>
  );
}

function Footer() {
  return (
    <footer className="adva-footer">
      <div className="adva-footer-top">
        <a href="/redesign" aria-label="ADVA Labor home">
          <Wordmark />
        </a>
        <p>
          Site development.
          <br />
          Colorado.
        </p>
        <a href="/redesign/bid" className="adva-button adva-button-white">
          Request a bid
        </a>
      </div>
      <div className="adva-footer-info">
        <div>
          <span className="adva-eyebrow">OFFICE</span>
          <a href={business.officeHref}>{business.office}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
        </div>
        <div>
          <span className="adva-eyebrow">BASED IN AURORA</span>
          <address>{business.address}</address>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/redesign/services">Services</a>
          <a href="/redesign/projects">Projects</a>
          <a href="/redesign#company">Company</a>
        </nav>
      </div>
      <div className="adva-footer-bottom">
        <span>© {new Date().getFullYear()} ADVA Labor Services Inc.</span>
        <span>DESIGN REVIEW / OCTOBER 2026</span>
        <a href="/redesign/directions">Design directions</a>
      </div>
    </footer>
  );
}

export function Shell({
  children,
  active,
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <MotionRoot>
      <div className="adva-design">
        <a className="adva-skip" href="#adva-main">
          Skip to content
        </a>
        <Header active={active} />
        <main id="adva-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </MotionRoot>
  );
}

export function BidBand() {
  return (
    <section className="adva-bid-band">
      <div>
        <span className="adva-eyebrow">NEXT PROJECT</span>
        <h2>
          A clear scope.
          <br />A better start.
        </h2>
      </div>
      <div>
        <p>
          Tell us what you’re building, where it is, and when you need a bid.
        </p>
        <a className="adva-button adva-button-white" href="/redesign/bid">
          Request a bid
        </a>
      </div>
    </section>
  );
}
