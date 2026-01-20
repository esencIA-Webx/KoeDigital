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
        <section className={styles.aboutSection} ref={sectionRef} style={{
            paddingBottom: '5rem', /* Reduced further */
            minHeight: 'auto',
            backgroundImage: "url('/textura 4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            position: 'relative',
            overflow: 'visible', // Allow wave to hang out
            zIndex: 10 // Ensure it sits on top of Hero
        }}>
            {/* Wave Divider */}
            <div className={styles.waveDividerTopIntro}></div>
            <div className={styles.contentContainer}>
                {/* Title moved to top */}
                <AnimatedTitle
                    text="¡Hola! Somos Sofi y Ceci."
                    className={styles.sectionHeading}
                    hoverColor="var(--pink-light)"
                    shadowColor="#1D3557"
                />

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
