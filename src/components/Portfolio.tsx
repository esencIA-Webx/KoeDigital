"use client";

import styles from './Portfolio.module.css';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import ScrollPop from './ScrollPop';

export default function Portfolio() {
    const cases = [
        { client: "Café Martínez", role: "Content Strategy", desc: "Engagement +200% mediante storytelling visual." },
        { client: "Norberto Gnocchi", role: "Rebranding", desc: "Nueva identidad visual combinando tradición y modernidad." },
        { client: "Puie Quesos", role: "Ads Campaign", desc: "Lanzamiento de producto con ROI positivo en primer mes." }
    ];

    return (
        <section className={styles.portfolioSection}>
            <div className={styles.waveDividerTop} />


            <div className={styles.grid}>
                {cases.map((p, i) => (
                    <ScrollPop
                        key={p.client}
                        className={styles.projectCard}
                        delay={i * 0.2}
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
                    </ScrollPop>
                ))}
            </div>
        </section>
    );
}
