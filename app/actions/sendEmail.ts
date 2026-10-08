"use server";
import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ADVA_BID_FROM;
  const to = process.env.ADVA_BID_TO;
  if (!apiKey || !from || !to)
    throw new Error("Email delivery is not configured.");
  const resend = new Resend(apiKey);
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const message = String(formData.get("message") || "");

  const result = await resend.emails.send({
    from,
    to,
    subject: "Nueva solicitud desde ADVA Labor",
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
  });
  if (result.error) throw new Error("Email delivery failed.");
}
