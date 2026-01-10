"use client";

import { motion } from 'framer-motion';
import styles from './Manifesto.module.css';

export default function Manifesto() {
    return (
        <section className={styles.manifestoSection}>
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
        </section>
    );
}
