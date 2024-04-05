import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("fullName");
  const email = formData.get("email");
  const message = formData.get("message");
  const phone = formData.get("phone");

  const resend = new Resend("re_V67L3zo8_HwPEzerC8qbCUZEBWZgDw7Xn");

  if (!name || !email || !message || !phone) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  resend.emails.send({
    from: "Contato para Stark Software <onboarding@resend.dev>",
    to: "romuloffall@gmail.com",
    subject: "Quero fazer um orçamento!",
    html: `
    <div style="font-family: Arial, sans-serif;display: grid; padding: 10px;border: 1px solid black; border-radius: 25px;">
    <h1>Contato de ${name}</h1>
    <h2>Email: ${email}</h2>
    <h2>Telefone: ${phone}</h2>
    <h2>Mensagem:</h2>
    <p style="font: 20px Arial, sans-serif;">${message}</p>
    </div>
    `,
  });

  return new Response("Email sent!", {
    status: 200,
  });
};
