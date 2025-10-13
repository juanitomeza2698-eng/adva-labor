'use client';
import { useLanguage } from '@/lib/i18n';
import { t } from '@/lib/strings';

export default function Differentiators() {
  const { lang } = useLanguage();
  const items = [
    { t: {es:"Respuesta en minutos", en:"Reply in minutes"}, d: {es:"Te atendemos por WhatsApp y salimos a sitio rápido.", en:"Fast WhatsApp response and rapid on-site deployment."} },
    { t: {es:"Cobertura confiable", en:"Reliable coverage"}, d: {es:"Backups y reemplazos para asegurar continuidad.", en:"Backups and replacements to ensure continuity."} },
    { t: {es:"Costeo claro", en:"Clear pricing"}, d: {es:"Por hora o por proyecto, sin letras chiquitas.", en:"Hourly or project-based, no fine print."} },
    { t: {es:"Calidad operativa", en:"Operational quality"}, d: {es:"Lead on‑site, checklist y estándares por rol.", en:"On‑site lead, checklists and role standards."} },
  ];

  return (
    <section className="section bg-gradient-to-br from-purple-50 to-violet-50">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-bold">{t('diff_title', lang)}</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((i) => (
            <div key={i.t.es} className="card">
              <h3 className="font-semibold">{i.t[lang]}</h3>
              <p className="mt-2 text-sm text-slate-600">{i.d[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
