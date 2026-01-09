"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerSection}>
            <div className={styles.waveTop} />

            <motion.div
                className={styles.quoteContainer}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <p className={styles.quote}>
                    "Donde las marcas encuentran su voz real, lejos del hype y cerca de los resultados."
                </p>
                <p className={styles.author}>Koe Digital - Manifesto</p>
            </motion.div>

            <div className={styles.footerGrid}>
                <div className={styles.brandName}>
                    <Image
                        src="/koe-logo.png"
                        alt="Koe Digital"
                        width={120}
                        height={70}
                        style={{ filter: 'brightness(0) invert(1)' }} /* Make white for footer */
                    />
                </div>

                <div className={styles.social}>
                    <a href="#">Instagram</a>
                    <a href="#">LinkedIn</a>
                    <a href="mailto:hola@koedigital">Email</a>
                </div>

                <div className={styles.copyright}>
                    © {new Date().getFullYear()} Koe Digital
                </div>
            </div>
        </footer>
    );
}
