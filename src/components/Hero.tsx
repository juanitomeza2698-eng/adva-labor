// src/components/Hero.tsx
"use client";
import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[75vh] md:min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Capa base para oscurecer un poco la imagen */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Degradado morado desde abajo: mejora muchísimo la lectura en móvil */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-24 pb-10 md:pt-36 md:pb-24 flex flex-col items-start justify-end md:justify-center">
        <span className="inline-block bg-white/15 text-white/95 text-xs font-medium px-3 py-1 rounded-full mb-4 backdrop-blur-sm ring-1 ring-white/30">
          Response in minutes
        </span>

        <h1 className="text-white drop-shadow-md text-4xl sm:text-5xl font-extrabold leading-tight max-w-3xl">
          Reliable staffing, when you need it
        </h1>

        <p className="text-white/90 drop-shadow mt-3 text-base sm:text-lg max-w-2xl">
          Staffing for construction, cleaning, events and logistics. Fast coverage in Denver and nearby.
        </p>

        {/* CTAs grandes y táctiles */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/17205571051"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition active:scale-[0.99]"
            aria-label="Chat on WhatsApp"
          >
            Chat on WhatsApp
          </a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition active:scale-[0.99]"
          >
            Request a Quote
          </a>
        </div>

        {/* Checklist: en móvil queda debajo; en desktop flota a la derecha */}
        <div
          className="
            mt-6 max-w-sm w-full
            bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-4
            md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 md:mt-0
          "
        >
          <ul className="text-slate-700 space-y-2 text-sm">
            <li>✅ On-demand labor</li>
            <li>✅ Safety & reliability</li>
            <li>✅ Bilingual workforce</li>
            <li>✅ Denver & Front Range coverage</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
