"use client";
import React from "react";

const services = [
  { title: "Hourly staffing", description: "Immediate reinforcements for workload peaks and coverage." },
  { title: "Project crews", description: "Coordinated teams to meet time and quality goals." },
  { title: "Partial outsourcing", description: "Outsource operational areas while keeping control." },
  { title: "On-site lead", description: "Supervision and coordination at your worksite." },
];

export default function Services() {
  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-purple-700">Services</h2>
        <p className="text-slate-600 mt-2">Flexible solutions tailored to your operation.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {services.map((s, i) => (
            <article
              key={i}
              className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-purple-100"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


