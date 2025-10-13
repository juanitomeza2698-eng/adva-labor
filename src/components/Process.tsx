'use client';
import { useLanguage } from '@/lib/i18n';
import { t } from '@/lib/strings';

export default function Process() {
  const { lang } = useLanguage();
  const steps = [
    { n: 1, t: {es:"Brief y requerimientos", en:"Brief & requirements"}, d: {es:"Perfil, número de personas, horario y ubicación.", en:"Profile, headcount, schedule and location."} },
    { n: 2, t: {es:"Selección y confirmación", en:"Selection & confirmation"}, d: {es:"Shortlist y confirmación de disponibilidad.", en:"Shortlist and availability confirmation."} },
    { n: 3, t: {es:"Onboarding", en:"Onboarding"}, d: {es:"Inducción, EPP (si aplica) y checklist de ingreso.", en:"Induction, PPE (if applicable) and entry checklist."} },
    { n: 4, t: {es:"Ejecución y control", en:"Execution & control"}, d: {es:"Asistencia, reportes y coordinador asignado.", en:"Attendance, reporting and assigned coordinator."} },
  ];

  return (
    <section id="proceso" className="section">
      <div className="container-tight">
        <h2 className="text-2xl md:text-3xl font-bold">{t('process_title', lang)}</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="card">
              <div className="badge">{lang === 'es' ? 'Paso' : 'Step'} {s.n}</div>
              <h3 className="mt-3 font-semibold">{s.t[lang]}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.d[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
