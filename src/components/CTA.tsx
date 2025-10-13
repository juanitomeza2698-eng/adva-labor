'use client';
import { useLanguage } from '@/lib/i18n';
import { t } from '@/lib/strings';
import { sendEmail } from '../../app/actions/sendEmail';
import React, { useState, useEffect } from 'react';

export default function CTA() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const formData = new FormData(e.currentTarget);
      await sendEmail(formData);
      setStatus('success');
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  // Oculta automáticamente el mensaje después de 5 segundos
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => setStatus('idle'), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section id="contacto" className="section text-white bg-gradient-to-r from-violet-700 to-purple-700">
      <div className="container-tight grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold">{t('cta_title', lang)}</h2>
          <p className="mt-2 text-white/90">{t('cta_sub', lang)}</p>
          <ul className="mt-4 space-y-1 text-white/80 text-sm">
            <li>📞 WhatsApp: +1 720 557 1051</li>
            <li>✉️ Email: advalabo@gmail.com</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              className="btn-ghost bg-white text-brand"
              href="https://wa.me/17205571051?text=Hola%20ADVA%20Labor%2C%20quiero%20una%20cotizaci%C3%B3n"
            >
              {t('cta_whatsapp', lang)}
            </a>
            <a
              className="btn-ghost border-white/40 text-white"
              href="mailto:advalabo@gmail.com?subject=Cotizaci%C3%B3n%20ADVA%20Labor"
            >
              {t('cta_email', lang)}
            </a>
          </div>
        </div>

        <form className="card bg-white text-slate-900" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">{t('form_name', lang)}</label>
          <input
            name="name"
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
          />

          <label className="block text-sm font-medium mt-4">{t('form_email', lang)}</label>
          <input
            name="email"
            type="email"
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="empresa@correo.com"
          />

          <label className="block text-sm font-medium mt-4">{t('form_req', lang)}</label>
          <textarea
            name="message"
            className="mt-1 w-full rounded-xl border px-3 py-2"
            rows={4}
            placeholder={t('form_placeholder_req', lang)}
          />

          <div className="mt-4 flex gap-3 items-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary disabled:opacity-60"
            >
              {status === 'sending'
                ? lang === 'es'
                  ? 'Enviando...'
                  : 'Sending...'
                : t('form_submit', lang)}
            </button>
            <a
              className="btn-ghost"
              href="mailto:advalabo@gmail.com?subject=Proyecto%20ADVA&body=Hola%2C%20necesito%20personal%20para%3A%20"
            >
              {lang === 'es' ? 'Enviar por correo' : 'Send via email'}
            </a>
          </div>

          {status === 'success' && (
            <p className="mt-3 text-sm text-green-600 animate-fade">
              ✅ {lang === 'es' ? 'Mensaje enviado correctamente.' : 'Message sent successfully.'}
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-600 animate-fade">
              ❌ {lang === 'es' ? 'Hubo un error al enviar el mensaje.' : 'There was an error sending the message.'}
            </p>
          )}

          <p className="mt-3 text-xs text-slate-500">{t('form_note', lang)}</p>
        </form>
      </div>
    </section>
  );
}
