'use client';
import { useLanguage } from '@/lib/i18n';
import { t } from '@/lib/strings';

export default function Industries() {
  const { lang } = useLanguage();
  const items = [
    {es: "Construcción ligera", en: "Light construction"},
    {es: "Limpieza comercial", en: "Commercial cleaning"},
    {es: "Eventos y venues", en: "Events & venues"},
    {es: "Almacenes y logística", en: "Warehousing & logistics"},
    {es: "Remodelación y pintura", en: "Remodeling & painting"},
    {es: "Mantenimiento general", en: "General maintenance"}
  ];

  return (
    <section id="industrias" className="section bg-white">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-bold">{t('industries_title', lang)}</h2>
        <p className="mt-2 text-slate-600">{t('industries_sub', lang)}</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((txt) => (
            <div key={txt.es} className="card">
              <p className="font-medium">{txt[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
