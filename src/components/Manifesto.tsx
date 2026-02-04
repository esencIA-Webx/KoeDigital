"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './Manifesto.module.css';
import AnimatedTitle from './AnimatedTitle';
import { sendContactEmail } from '@/app/actions/contact';

export default function Manifesto() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');
        setErrorMessage("");

        const formData = new FormData(event.currentTarget);

        try {
            const result = await sendContactEmail(formData);

            if (result.success) {
                setStatus('success');
                (event.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setErrorMessage(result.error || "Error al enviar el formulario.");
                console.error("Server Action Error:", result.error);
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setStatus('error');
            setErrorMessage("Error de conexión con el servidor.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className={styles.manifestoSection}>
            {/* Wave Divider Top */}
            <div className={styles.waveDividerTop}></div>

            <div className={styles.contentWrapper}>
                {/* Left Column: Manifesto Text */}
                <motion.div
                    className={styles.quoteContainer}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.quote}>
                        <motion.h3
                            className={styles.quote}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.08,
                                        delayChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {/* Part 1: Roca One - Block 1 */}
                            <AnimatedTitle
                                text="DONDE LAS MARCAS"
                                as="div"
                                style={{
                                    fontFamily: 'var(--font-roca)',
                                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                    marginBottom: '0.5rem',
                                    color: 'white',
                                    display: 'block'
                                }}
                                hoverColor="var(--green-light)"
                                enableReveal={true}
                                revealDirection="right"
                            />

                            {/* Part 2: Block 2 (ENCUENTRAN + su voz) */}
                            <div style={{ display: 'block' }}>
                                <AnimatedTitle
                                    text="ENCUENTRAN"
                                    as="span"
                                    style={{
                                        fontFamily: 'var(--font-roca)',
                                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                                        color: 'white',
                                        display: 'inline-block',
                                        marginRight: '0.5rem'
                                    }}
                                    hoverColor="var(--green-light)"
                                    enableReveal={true}
                                    revealDirection="right"
                                    delay={0.2}
                                />

                                {/* Part 2b: su voz (Royal Brand) */}
                                <AnimatedTitle
                                    text="su voz"
                                    as="span"
                                    style={{
                                        fontFamily: 'var(--font-detail)',
                                        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                        color: 'white',
                                        display: 'inline-block',
                                        marginLeft: '0.5rem',
                                        textTransform: 'lowercase'
                                    }}
                                    hoverColor="var(--orange-dark)"
                                    enableReveal={true}
                                    revealDirection="right"
                                    delay={0.3}
                                />
                            </div>
                        </motion.h3>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    className={styles.formContainer}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20, // Critical damping ~32, so 20 is underdamped (bouncy) but controlled
                        delay: 0.2
                    }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                >
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>NOMBRE</label>
                                <input name="nombre" type="text" className={styles.formInput} placeholder="Ingresá tu nombre" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>APELLIDO</label>
                                <input name="apellido" type="text" className={styles.formInput} placeholder="Ingresá tu apellido" required />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>EMAIL</label>
                                <input name="email" type="email" className={styles.formInput} placeholder="Ingresá tu email" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>TELÉFONO</label>
                                <input name="telefono" type="tel" className={styles.formInput} placeholder="Ingresá tu teléfono" />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>ME INTERESA...</label>
                            <input name="interes" type="text" className={styles.formInput} placeholder="Servicio" />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>CONTANOS UN POCO MÁS</label>
                            <textarea name="mensaje" className={styles.formTextarea} placeholder="Escribí un breve mensaje" rows={4}></textarea>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}
                        >
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={styles.submitBtn}
                                style={{ alignSelf: 'flex-end', opacity: isSubmitting ? 0.7 : 1 }}
                                animate={isSubmitting ? {} : {
                                    y: [0, -8, 0],
                                    rotate: -2
                                }}
                                transition={{
                                    y: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 2
                                    },
                                    rotate: { duration: 0 }
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 2,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar'}
                            </motion.button>

                            {status === 'success' && (
                                <p style={{ color: 'var(--olive-light)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    ¡Mensaje enviado con éxito!
                                </p>
                            )}
                            {status === 'error' && (
                                <p style={{ color: 'var(--orange-dark)', fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'right', maxWidth: '300px' }}>
                                    {errorMessage}
                                </p>
                            )}
                        </motion.div>
                    </form>
                </motion.div>
            </div >
        </section >
    );
}

