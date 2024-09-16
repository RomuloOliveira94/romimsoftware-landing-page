import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("fullName");
  const email = formData.get("email");
  const message = formData.get("message");
  const phone = formData.get("phone");

  const resend = new Resend(import.meta.env.RESEND_KEY);

  if (!name || !email || !message || !phone) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  const send = await resend.emails.send({
    from: "Contato para Stark Software <contato@starksoftware.tech>",
    to: "contato@starksoftware.tech",
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

  console.log(send);

  return redirect("/");
};
