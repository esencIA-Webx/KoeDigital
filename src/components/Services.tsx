"use client";

import styles from './Services.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingSticker from './FloatingSticker';

export default function Services() {
    const plans = [
        { title: "Social Media", desc: "Gestión estratégica integral.", btn: "Ver planes" },
        { title: "Publicidad", desc: "Campañas de alto rendimiento (Ads).", btn: "Consultar" },
        { title: "Web Design", desc: "Sitios que venden y enamoran.", btn: "Cotizar" }
    ];

    return (
        <section className={styles.servicesSection}>
            <div className={styles.header}>
                <span className={styles.blockHeader}>NEW</span>
                <span className={styles.scriptHeader}>& Noteworthy</span>
            </div>

            <div className={styles.grid}>
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.title}
                        className={styles.card}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{plan.title}</h3>
                            <p className={styles.cardDesc}>{plan.desc}</p>
                            <Link href="#contacto" className={styles.cardBtn}>{plan.btn}</Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <FloatingSticker top="20%" left="5%" rotate={15} speed={0.6}>
                Crecimiento
            </FloatingSticker>
            <FloatingSticker bottom="15%" right="5%" rotate={-5} speed={0.9} delay={1.5}>
                Creatividad
            </FloatingSticker>
        </section>
    );
}
