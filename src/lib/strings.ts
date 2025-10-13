export const S = {
  nav_services: { es: "Servicios", en: "Services" },
  nav_industries: { es: "Industrias", en: "Industries" },
  nav_process: { es: "Proceso", en: "Process" },
  nav_contact: { es: "Contacto", en: "Contact" },
  hero_title_1: { es: "Personal confiable,", en: "Reliable staffing," },
  hero_title_2: { es: "cuando lo necesitas", en: "when you need it" },
  hero_sub: { es: "Staffing para construcción, limpieza, eventos y logística. Cobertura rápida en Denver y alrededores.", en: "Staffing for construction, cleaning, events and logistics. Fast coverage in Denver and nearby." },
  hero_btn_whatsapp: { es: "Hablar por WhatsApp", en: "Chat on WhatsApp" },
  hero_btn_quote: { es: "Solicitar cotización", en: "Request a Quote" },
  services_title: { es: "Servicios", en: "Services" },
  services_sub: { es: "Soluciones flexibles que se ajustan a tu operación.", en: "Flexible solutions tailored to your operation." },
  industries_title: { es: "Industrias que atendemos", en: "Industries We Serve" },
  industries_sub: { es: "Experiencia en operaciones con alta exigencia y tiempos cortos.", en: "Experience with high-demand, time-sensitive operations." },
  process_title: { es: "Cómo trabajamos", en: "How We Work" },
  diff_title: { es: "¿Por qué ADVA?", en: "Why ADVA?" },
  testi_title: { es: "Testimonios", en: "Testimonials" },
  cta_title: { es: "¿Listo para empezar?", en: "Ready to get started?" },
  cta_sub: { es: "Escríbenos por WhatsApp o envíanos los requisitos a nuestro correo.", en: "Message us on WhatsApp or email your requirements." },
  cta_whatsapp: { es: "Abrir WhatsApp", en: "Open WhatsApp" },
  cta_email: { es: "Enviar correo", en: "Send Email" },
  form_name: { es: "Nombre", en: "Name" },
  form_email: { es: "Email", en: "Email" },
  form_req: { es: "Requerimiento", en: "Requirement" },
  form_placeholder_req: { es: "Número de personas, horarios, ubicación, fecha…", en: "Headcount, schedule, location, date…" },
  form_submit: { es: "Solicitar info", en: "Request info" },
  form_note: { es: "*El formulario es visual. Para contacto inmediato usa WhatsApp.", en: "*Form is illustrative. For immediate contact use WhatsApp." },
  footer_rights: { es: "Todos los derechos reservados.", en: "All rights reserved." }
} as const;

export function t(key: keyof typeof S, lang: 'es' | 'en') {
  return S[key][lang];
}
