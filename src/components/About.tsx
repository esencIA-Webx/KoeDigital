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
    const stampYFast = useTransform(scrollYProgress, [0, 1], [100, -200]);
    const stampYSlow = useTransform(scrollYProgress, [0, 1], [-50, 150]);

    return (
        <section className={styles.aboutSection} ref={sectionRef}>
            {/* Stamp Icons with Parallax */}
            <motion.div className={`${styles.stamp} ${styles.stamp1}`} style={{ y: stampYFast, rotate: -15 }}>
                <Image src="/stamp-pink.png" alt="Stamp" width={120} height={120} />
            </motion.div>
            <motion.div className={`${styles.stamp} ${styles.stamp2}`} style={{ y: stampYSlow, rotate: 20 }}>
                <Image src="/stamp-orange.png" alt="Stamp" width={140} height={140} />
            </motion.div>
            <motion.div className={`${styles.stamp} ${styles.stamp3}`} style={{ y: stampYFast, rotate: 10 }}>
                <Image src="/stamp-yellow.png" alt="Stamp" width={130} height={130} />
            </motion.div>

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
                            src="/about-sofi-sunflower.png"
                            alt="Sofi"
                            width={500}
                            height={700}
                            className={styles.founderImage}
                            priority
                        />
                    </motion.div>

                    {/* Text slides out to the LEFT from behind the image */}
                    <div
                        className={`${styles.textWrapper} ${styles.textLeft} ${ceciRevealed ? styles.revealed : ''}`}
                    >
                        <p>
                            Formamos Koe Digital con una premisa clara: alejar a las marcas de las "fórmulas mágicas" y acercarlas a resultados reales a través de estrategias sólidas.
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
                            src="/about-ceci-sunflower.png"
                            alt="Ceci"
                            width={500}
                            height={700}
                            className={styles.founderImage}
                            priority
                        />
                    </motion.div>

                    {/* Text slides out to the RIGHT from behind the image */}
                    <div
                        className={`${styles.textWrapper} ${styles.textRight} ${sofiRevealed ? styles.revealed : ''}`}
                    >
                        <p>
                            Entendemos que cada negocio tiene una voz única. Nuestro trabajo es encontrarla, amplificarla y conectarla con las personas correctas mediante contenido de valor y publicidad inteligente.
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
