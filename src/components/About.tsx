"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import styles from './About.module.css';

export default function About() {
    const [ceciRevealed, setCeciRevealed] = useState(false);
    const [sofiRevealed, setSofiRevealed] = useState(false);
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax logic
    const yLeft = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yRight = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section className={styles.aboutSection} ref={sectionRef}>
            {/* Top Title: Fade In + From Top */}
            <motion.h2
                className={styles.topTitle}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <span className={styles.lineOne}>MÁS QUE UNA AGENCIA,</span>
                <br />
                <span className={styles.lineTwo}>TU EQUIPO ESTRATÉGICO.</span>
            </motion.h2>

            <div className={styles.contentContainer}>
                {/* Left Column: Sofi (swapped) */}
                <div
                    className={`${styles.column} ${styles.columnLeft}`}
                    onMouseEnter={() => setCeciRevealed(true)}
                >
                    <motion.div
                        className={styles.imageWrapper}
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        style={{ y: yLeft }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/Sofi.png?v=3"
                            alt="Sofi"
                            width={500}
                            height={700}
                            className={styles.founderImage}
                            priority
                            unoptimized /* Force bypass of Next.js optimization cache if needed */
                        />
                    </motion.div>

                    {/* Text slides out to the LEFT from behind the image */}
                    <div
                        className={`${styles.textWrapper} ${styles.textLeft} ${ceciRevealed ? styles.revealed : ''}`}
                    >
                        <p>
                            Formamos <strong>Koe Digital</strong> con una premisa clara: alejar a las marcas de las "fórmulas mágicas" y acercarlas a <strong>resultados reales</strong> a través de <strong>estrategias sólidas</strong>.
                        </p>
                    </div>
                </div>

                {/* Right Column: Ceci (swapped) */}
                <div
                    className={`${styles.column} ${styles.columnRight}`}
                    onMouseEnter={() => setSofiRevealed(true)}
                >
                    <motion.div
                        className={styles.imageWrapper}
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        style={{ y: yRight }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/Ceci.png?v=3"
                            alt="Ceci"
                            width={500}
                            height={700}
                            className={styles.founderImage}
                            priority
                            unoptimized
                        />
                    </motion.div>

                    {/* Text slides out to the RIGHT from behind the image */}
                    <div
                        className={`${styles.textWrapper} ${styles.textRight} ${sofiRevealed ? styles.revealed : ''}`}
                    >
                        <p>
                            Entendemos que cada negocio tiene una <strong>voz única</strong>. Nuestro trabajo es encontrarla, amplificarla y conectarla con las <strong>personas correctas</strong> mediante <strong>contenido de valor</strong> y <strong>publicidad inteligente</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Title: Fade In + From Bottom */}
            <motion.h2
                className={styles.bottomTitle}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                viewport={{ once: true }}
            >
                <span className={styles.lineOne}>NO CREEMOS EN EL HYPE,</span>
                <br />
                <span className={styles.lineTwo}>CREEMOS EN EL CRITERIO.</span>
            </motion.h2>
        </section>
    );
}
