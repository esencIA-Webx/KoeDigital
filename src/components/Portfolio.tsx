"use client";

import styles from './Portfolio.module.css';
import { motion } from 'framer-motion';

export default function Portfolio() {
    const cases = [
        { client: "Café Martínez", role: "Content Strategy", desc: "Engagement +200% mediante storytelling visual." },
        { client: "Norberto Gnocchi", role: "Rebranding", desc: "Nueva identidad visual combinando tradición y modernidad." },
        { client: "Puie Quesos", role: "Ads Campaign", desc: "Lanzamiento de producto con ROI positivo en primer mes." }
    ];

    return (
        <section className={styles.portfolioSection}>
            <div className={styles.header}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Nuestros Trabajos
                </motion.h2>
                <motion.span
                    className={styles.subtitle}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Selected Cases
                </motion.span>
            </div>

            <div className={styles.grid}>
                {cases.map((p, i) => (
                    <motion.div
                        key={p.client}
                        className={styles.projectCard}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className={styles.imageContainer}>
                            {/* Placeholder */}
                        </div>
                        <div className={styles.content}>
                            <span className={styles.role}>{p.role}</span>
                            <h3 className={styles.clientName}>{p.client}</h3>
                            <p className={styles.desc}>{p.desc}</p>
                            <a href="#" className={styles.viewBtn}>Ver caso</a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
