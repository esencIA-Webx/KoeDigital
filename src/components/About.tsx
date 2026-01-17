"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import styles from './About.module.css';

export default function About() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Subtler parallax for photos
    const ySofi = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const yCeci = useTransform(scrollYProgress, [0, 1], [30, -10]);

    return (
        <section className={styles.aboutSection} ref={sectionRef}>
            <div className={styles.contentContainer}>
                {/* Photos at the top */}
                <div className={styles.photosWrapper}>
                    <motion.div
                        className={styles.photoContainerSofi}
                        style={{ y: ySofi }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/Sofi.png?v=3"
                            alt="Sofi"
                            width={300}
                            height={420}
                            className={styles.aboutImage}
                            priority
                            unoptimized
                        />
                    </motion.div>
                    <motion.div
                        className={styles.photoContainerCeci}
                        style={{ y: yCeci }}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/Ceci.png?v=3"
                            alt="Ceci"
                            width={300}
                            height={420}
                            className={styles.aboutImage}
                            priority
                            unoptimized
                        />
                    </motion.div>
                </div>

                {/* Vertical Text Blocks */}
                <div className={styles.textColumn}>
                    <motion.div
                        className={styles.introBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.sectionHeading}>¡Hola! Somos Ceci y Sofi.</h2>
                        <p className={styles.introText}>
                            Nuestra intención es acompañar a las marcas con estrategia, criterio y foco en resultados.
                            El principal objetivo es construir resultados reales y sostenibles.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.institutionalBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={styles.brandTitle}>KOE Digital</h3>
                        <div className={styles.brandContent}>
                            <p>Somos una agencia de marketing digital que acompaña a marcas, emprendedores y negocios en el desarrollo de su comunicación, estrategia y presencia digital.</p>
                            <p>El trabajo en KOE parte siempre del entendimiento profundo del negocio, su contexto, sus objetivos y su mercado, para luego diseñar estrategias personalizadas, realistas y sostenibles en el tiempo.</p>
                            <p>No se trata solo de crear contenido, sino de construir resultados.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.actionArea}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block' }}
                        >
                            <a href="#contacto" className={styles.contactButton}>
                                Contáctanos
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className={styles.footerAccent}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
            >

            </motion.div>
        </section>
    );
}
