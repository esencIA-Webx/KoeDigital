"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';
import AnimatedTitle from './AnimatedTitle';

export default function AboutIntro() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Subtler parallax for photos
    const ySofi = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const yCeci = useTransform(scrollYProgress, [0, 1], [30, -10]);

    return (
        <section className={styles.aboutIntroSection} ref={sectionRef}>
            {/* Wave Divider */}
            <div className={styles.waveDividerTopIntro}></div>
            <div className={styles.contentContainer}>
                {/* Title with cursive names */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <AnimatedTitle
                        text="¡Hola! Somos"
                        className={styles.sectionHeading}
                        hoverColor="var(--text-yellow)"
                        shadowColor="rgba(0,0,0,0.3)"
                    />
                    <AnimatedTitle
                        text="Sofi"
                        style={{ fontFamily: 'var(--font-detail)', fontSize: 'clamp(3rem, 7vw, 4rem)', marginBottom: '-10px' }}
                        hoverColor="var(--text-yellow)"
                        shadowColor="rgba(0,0,0,0.3)"
                    />
                    <AnimatedTitle
                        text="y"
                        style={{ fontFamily: 'var(--font-detail)', fontSize: 'clamp(3rem, 7vw, 4rem)', marginBottom: '-10px' }}
                        hoverColor="var(--text-yellow)"
                        shadowColor="rgba(0,0,0,0.3)"
                    />
                    <AnimatedTitle
                        text="Ceci."
                        style={{ fontFamily: 'var(--font-detail)', fontSize: 'clamp(3rem, 7vw, 4rem)', marginBottom: '-10px' }}
                        hoverColor="var(--text-yellow)"
                        shadowColor="rgba(0,0,0,0.3)"
                    />
                </div>


                {/* Photos */}
                <div className={styles.photosWrapper}>
                    <motion.div
                        className={styles.photoContainerSofi}
                        style={{ y: ySofi }}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
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
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
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
                    {/* Intro Card (Small) */}
                    <motion.div
                        className={styles.introCard}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p className={styles.introText}>
                            Nuestra intención es acompañar a las marcas con estrategia, criterio y foco en resultados.
                            El principal objetivo es construir resultados reales y sostenibles.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
