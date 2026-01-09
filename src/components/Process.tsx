"use client";

import Link from 'next/link';
import { Search, Map, BarChart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Process.module.css';

export default function Process() {
    const steps = [
        { title: "Diagnóstico", icon: <Search /> },
        { title: "Estrategia", icon: <Map /> },
        { title: "Ejecución", icon: <BarChart /> },
        { title: "Medición", icon: <Trophy /> }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className={styles.processSection}>
            <div className={styles.gridLines} aria-hidden />

            <motion.h2
                className={styles.scriptTitle}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                4 Steps So Simple.
            </motion.h2>

            <motion.div
                className={styles.blocksContainer}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {steps.map((step) => (
                    <motion.div
                        key={step.title}
                        className={styles.processBlock}
                        variants={itemVariants}
                        whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <div className={styles.iconContainer}>
                            {step.icon}
                        </div>
                        <span className={styles.blockTitle}>{step.title}</span>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
            >
                <Link href="#servicios" className={styles.exploreBtn}>
                    Explorá nuestros servicios
                </Link>
            </motion.div>
        </section>
    );
}
