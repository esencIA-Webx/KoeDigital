"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import styles from "./Contact.module.css";
import { sendContactEmail } from "@/app/actions/contact";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);

        try {
            const result = await sendContactEmail(formData);

            if (result.success) {
                setStatus("success");
                formRef.current?.reset();
                // Reset to idle after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setErrorMessage(result.error || "Ocurrió un error inesperado.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("No se pudo conectar con el servidor.");
        }
    }

    return (
        <section className={styles.contactSection} id="contacto">
            <div className={styles.waveDivider}></div>

            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>Hagamos algo <span style={{ color: "var(--green-light)" }}>increíble</span></h2>
                    <p className={styles.subtitle}>
                        ¿Tenés un proyecto en mente? Estamos listos para ayudarte a llevarlo al siguiente nivel.
                        Escribinos y nos pondremos en contacto con vos a la brevedad.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.formCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nombre completo</label>
                            <input
                                type="text"
                                name="nombre"
                                required
                                placeholder="Juan Pérez"
                                className={styles.input}
                                disabled={status === "sending"}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Correo electrónico</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="juan@ejemplo.com"
                                className={styles.input}
                                disabled={status === "sending"}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Mensaje</label>
                            <textarea
                                name="mensaje"
                                required
                                placeholder="Contanos sobre tu proyecto..."
                                className={styles.textarea}
                                disabled={status === "sending"}
                            ></textarea>
                        </div>

                        <motion.button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={status === "sending" || status === "success"}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {status === "sending" ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Enviando...
                                </>
                            ) : status === "success" ? (
                                <>
                                    <CheckCircle size={20} />
                                    ¡Enviado!
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Enviar mensaje
                                </>
                            )}
                        </motion.button>
                    </form>

                    <AnimatePresence>
                        {status === "success" && (
                            <motion.div
                                className={styles.statusWrapper}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <p className={styles.successMsg}>
                                    ¡Gracias por contactarnos! Te responderemos muy pronto.
                                </p>
                            </motion.div>
                        )}

                        {status === "error" && (
                            <motion.div
                                className={styles.statusWrapper}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                    <AlertCircle size={18} color="#ff6b6b" />
                                    <p className={styles.errorMsg}>{errorMessage}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
