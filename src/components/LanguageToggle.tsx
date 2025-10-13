'use client';
import { useLanguage } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="text-sm px-3 py-1 rounded-lg border hover:bg-slate-100"
      aria-label="Toggle language"
      title="Toggle language"
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
