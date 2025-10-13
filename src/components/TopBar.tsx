"use client";
import React, { useEffect, useState } from "react";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-white border-b-2 border-purple-700/90 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ADVA Labor"
            className="h-9 w-auto block"
          />
          <span className="font-semibold text-lg hidden sm:block text-slate-900">
            ADVA Labor
          </span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <a href="#services" className="text-slate-700 hover:text-purple-700 transition">Services</a>
          <a href="#gallery" className="text-slate-700 hover:text-purple-700 transition">Projects</a>
          <a href="#about" className="text-slate-700 hover:text-purple-700 transition">About</a>
          <a href="#contact" className="text-slate-700 hover:text-purple-700 transition">Contact</a>
        </nav>

        {/* CTAs desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-700 hover:bg-purple-800 text-white shadow-sm transition"
          >
            Request a Quote
          </a>
          <a
            href="https://wa.me/17205571051"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-600 text-white shadow-sm transition"
          >
            WhatsApp
          </a>
        </div>

        {/* Toggle móvil */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 ring-slate-200 text-slate-900 bg-white"
          aria-label="Open menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#services" onClick={() => setOpen(false)} className="text-slate-800">Services</a>
            <a href="#gallery" onClick={() => setOpen(false)} className="text-slate-800">Projects</a>
            <a href="#about" onClick={() => setOpen(false)} className="text-slate-800">About</a>
            <a href="#contact" onClick={() => setOpen(false)} className="text-slate-800">Contact</a>
            <div className="h-px bg-slate-200 my-1" />
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition inline-block w-max"
            >
              Request a Quote
            </a>
            <a
              href="https://wa.me/17205571051"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition inline-block w-max"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

