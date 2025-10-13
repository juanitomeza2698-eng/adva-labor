"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg">ADVA Labor Services</h3>
          <p className="text-sm text-white/70 mt-2">Denver, Colorado</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm text-white/80 mt-2">
            WhatsApp: <a className="underline" href="https://wa.me/17205571051">+1 (720) 557-1051</a><br/>
            Email: <a className="underline" href="mailto:advalabo@gmail.com">advalabo@gmail.com</a>
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-sm text-white/70">
            © {new Date().getFullYear()} ADVA Labor Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
  