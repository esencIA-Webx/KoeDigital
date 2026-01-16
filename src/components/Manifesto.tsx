"use client";

import { motion } from 'framer-motion';
import styles from './Manifesto.module.css';

export default function Manifesto() {
    return (
        <section className={styles.manifestoSection}>
            <div className={styles.contentWrapper}>
                {/* Left Column: Manifesto Text */}
                <motion.div
                    className={styles.quoteContainer}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className={styles.author}>Koe Digital - Manifesto</p>
                    <p className={styles.quote}>
                        "Donde las marcas encuentran su voz real, lejos del hype y cerca de los resultados."
                    </p>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    className={styles.formContainer}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form className={styles.contactForm}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>NOMBRE</label>
                                <input type="text" className={styles.formInput} placeholder="Ingresá tu nombre" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>APELLIDO</label>
                                <input type="text" className={styles.formInput} placeholder="Ingresá tu apellido" />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>EMAIL</label>
                                <input type="email" className={styles.formInput} placeholder="Ingresá tu email" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>TELÉFONO</label>
                                <input type="tel" className={styles.formInput} placeholder="Ingresá tu teléfono" />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>ME INTERESA...</label>
                            <input type="text" className={styles.formInput} placeholder="Servicio" />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>CONTANOS UN POCO MÁS</label>
                            <textarea className={styles.formTextarea} placeholder="Escribí un breve mensaje" rows={4}></textarea>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            style={{ marginTop: '1rem' }}
                        >
                            <motion.button
                                type="submit"
                                className={styles.submitBtn}
                                animate={{
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
                                Enviar mensaje
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
