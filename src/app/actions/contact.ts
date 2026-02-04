"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
    const nombre = formData.get("nombre") as string;
    const apellido = formData.get("apellido") as string;
    const email = formData.get("email") as string;
    const telefono = (formData.get("telefono") as string) || "No proporcionado";
    const interes = (formData.get("interes") as string) || "No especificado";
    const mensaje = formData.get("mensaje") as string;

    if (!nombre || !email || !mensaje) {
        return { success: false, error: "Los campos Nombre, Email y Mensaje son obligatorios." };
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

    const fullName = apellido ? `${nombre} ${apellido}` : nombre;

    try {
        await transporter.sendMail({
            from: `"${fullName}" <${emailUser}>`,
            to: emailUser,
            replyTo: email,
            subject: `Nuevo mensaje de contacto: ${fullName}`,
            text: `
                Nombre: ${fullName}
                Email: ${email}
                Teléfono: ${telefono}
                Interés: ${interes}
                Mensaje: ${mensaje}
            `,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2e7d32; border-bottom: 2px solid #2e7d32; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre completo:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Me interesa:</strong> ${interes}</p>
          <br/>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #2e7d32; font-style: italic;">
            ${mensaje.replace(/\n/g, "<br>")}
          </div>
          <br/>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 0.8rem; color: #999;">Este mensaje fue enviado desde el formulario de contacto del sitio web.</p>
        </div>
      `,
        });

        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Hubo un problema al enviar el correo. Inténtalo más tarde." };
    }
}
