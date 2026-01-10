"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Map, BarChart, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Process.module.css';

export default function Process() {
    const steps = [
        {
            title: "Diagnóstico",
            icon: <Search />,
            description: "Analizamos la base del proyecto antes de accionar.",
            subtitle: "Nos enfocamos en entender el negocio, su contexto y sus objetivos para tomar decisiones con criterio y no desde la intuición.",
            includes: [
                "Análisis de la marca, su identidad y su posicionamiento actual",
                "Estudio del mercado y la competencia directa",
                "Definición de objetivos claros alineados al plan de marketing"
            ]
        },
        {
            title: "Estrategia",
            icon: <Map />,
            description: "Definimos el camino antes de crear contenido.",
            subtitle: "A partir del diagnóstico, construimos una estrategia de comunicación clara, coherente y orientada a resultados.",
            includes: [
                "Definición de qué decir, cómo decirlo y para qué",
                "Elección de canales y formatos más adecuados",
                "Planificación estratégica alineada a los objetivos del negocio"
            ]
        },
        {
            title: "Ejecución",
            icon: <BarChart />,
            description: "Transformamos la estrategia en acciones concretas.",
            subtitle: "Creamos, diseñamos y publicamos contenido siguiendo los lineamientos definidos, manteniendo coherencia y calidad en cada pieza.",
            includes: [
                "Creación de contenido y desarrollo de piezas visuales",
                "Implementación de campañas y acciones planificadas",
                "Optimización constante durante el proceso de ejecución"
            ]
        },
        {
            title: "Medición",
            icon: <Trophy />,
            description: "Analizamos resultados para mejorar continuamente.",
            subtitle: "Medimos el rendimiento de cada acción para ajustar la estrategia y tomar decisiones basadas en datos reales.",
            includes: [
                "Análisis de métricas y desempeño",
                "Lectura de datos claros y accionables",
                "Aprendizajes y ajustes mensuales según resultados"
            ]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextStep = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % steps.length);
    };

    const prevStep = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5
        })
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
                4 pasos tan simples.
            </motion.h2>

            <div className={styles.cardsContainer}>
                <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevStep} aria-label="Previous step">
                    <ChevronLeft size={32} />
                </button>

                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 }
                        }}
                        className={styles.processCard}
                        whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <motion.div
                            className={styles.stepSticker}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [-12, -8, -12]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className={styles.stickerInner}>#{currentIndex + 1}</span>
                        </motion.div>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}>
                                {steps[currentIndex].icon}
                            </div>
                            <h3 className={styles.cardTitle}>{steps[currentIndex].title}</h3>
                        </div>

                        <div className={styles.cardContent}>
                            <p className={styles.cardDescription}>{steps[currentIndex].description}</p>
                            <p className={styles.cardSubtitle}>{steps[currentIndex].subtitle}</p>

                            <div className={styles.includesSection}>
                                <p className={styles.includesLabel}>Incluye:</p>
                                <ul className={styles.includesList}>
                                    {steps[currentIndex].includes.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextStep} aria-label="Next step">
                    <ChevronRight size={32} />
                </button>
            </div>

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
