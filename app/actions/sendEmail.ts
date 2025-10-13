'use server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(formData: FormData) {
  const name = String(formData.get('name') || '');
  const email = String(formData.get('email') || '');
  const message = String(formData.get('message') || '');

  await resend.emails.send({
    from: 'ADVA <noreply@tudominio.com>',
    to: 'advalabo@gmail.com',
    subject: 'Nueva solicitud desde ADVA Labor',
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  });
}
