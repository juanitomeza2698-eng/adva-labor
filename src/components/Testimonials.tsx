'use client';
import { useLanguage } from '@/lib/i18n';
import { t } from '@/lib/strings';

export default function Testimonials() {
  const { lang } = useLanguage();
  const items = [
    { n: {es:"Operaciones de eventos", en:"Event operations"}, q: {es:"Llegaron puntuales y el lead manejó perfecto los cambios del día.", en:"They were on time and the lead handled day-of changes perfectly."} },
    { n: {es:"Empresa de limpieza", en:"Cleaning company"}, q: {es:"Refuerzos confiables en cierres y aperturas. Comunicación clara.", en:"Reliable reinforcements for opens/closes. Clear communication."} },
    { n: {es:"Contratista local", en:"Local contractor"}, q: {es:"Cumplieron tiempos del proyecto y mantuvieron el sitio en orden.", en:"Met project timelines and kept the site orderly."} },
  ];

  return (
    <section className="section">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-bold">{t('testi_title', lang)}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {items.map((tst) => (
            <div key={tst.n.es} className="card">
              <p className="text-sm text-slate-700">“{tst.q[lang]}”</p>
              <p className="mt-3 text-xs text-slate-500">— {tst.n[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
