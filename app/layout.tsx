// app/layout.tsx
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';

export const metadata = {
  title: 'ADVA Labor',
  description: 'Staffing & Outsourcing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
