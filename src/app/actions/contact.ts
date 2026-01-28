"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
    const nombre = formData.get("nombre") as string;
    const email = formData.get("email") as string;
    const mensaje = formData.get("mensaje") as string;

    if (!nombre || !email || !mensaje) {
        return { success: false, error: "Todos los campos son obligatorios." };
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
        console.error("EMAIL_USER or EMAIL_PASS environment variables are not set.");
        return { success: false, error: "Error de configuración en el servidor." };
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailUser,
            pass: emailPass,
        },
    });

    try {
        await transporter.sendMail({
            from: `"${nombre}" <${emailUser}>`,
            to: emailUser,
            replyTo: email,
            subject: `Nuevo mensaje de contacto de ${nombre}`,
            text: mensaje,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2e7d32;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #2e7d32;">
            ${mensaje.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Hubo un problema al enviar el correo. Inténtalo más tarde." };
    }
}
