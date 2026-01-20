"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Map, BarChart, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import styles from './Process.module.css';

export default function Process() {
    const steps = [
        {
            title: "Diagnóstico",
            icon: <Search />,
            description: "Analizamos la base del proyecto antes de accionar.",
            subtitle: "Nos enfocamos en entender el negocio, su contexto y sus objetivos para tomar decisiones con criterio y no desde la intuición."
        },
        {
            title: "Estrategia",
            icon: <Map />,
            description: "Definimos el camino antes de crear contenido.",
            subtitle: "A partir del diagnóstico, construimos una estrategia de comunicación clara, coherente y orientada a resultados."
        },
        {
            title: "Ejecución",
            icon: <BarChart />,
            description: "Transformamos la estrategia en acciones concretas.",
            subtitle: "Creamos, diseñamos y publicamos contenido siguiendo los lineamientos definidos, manteniendo coherencia y calidad en cada pieza."
        },
        {
            title: "Medición",
            icon: <Trophy />,
            description: "Analizamos resultados para mejorar continuamente.",
            subtitle: "Medimos el rendimiento de cada acción para ajustar la estrategia y tomar decisiones basadas en datos reales."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);



    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            rotate: direction > 0 ? 5 : -5,
            scale: 0.9,
            zIndex: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotate: 0,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            rotate: direction < 0 ? 5 : -5,
            scale: 0.9
        })
    };

    return (
        <section className={styles.processSection}>
            {/* Wave Divider Top */}
            <div className={styles.waveDividerTop}></div>



            <motion.div
                className={styles.introCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
                <div className={styles.descriptionText} style={{ margin: 0, padding: 0 }}>
                    <p className={styles.introCardTitle}>En KOE no aplicamos fórmulas genéricas.</p>
                    <p>Ofrecemos un servicio 100% personalizado, donde cada estrategia, diseño y acción está pensada a medida del negocio y alineada a objetivos concretos.</p>
                    <ul>
                        <li>Visión integral: marca, comunicación y resultados.</li>
                        <li>Estudio del mercado y la competencia directa.</li>
                        <li>Procesos claros, ordenados y medibles.</li>
                    </ul>
                </div>
            </motion.div>

            <div className={styles.navContainer}>
                {steps.map((step, index) => {
                    // Stagger animation slightly based on index
                    const randomDelay = index * 0.5;

                    return (
                        <motion.button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={`${styles.navSticker} ${currentIndex === index ? styles.activeSticker : ''}`}
                            aria-label={`Go to step ${index + 1}: ${step.title}`}
                            aria-current={currentIndex === index ? 'step' : undefined}
                            // Floating animation
                            animate={{
                                y: [0, -8, 0],
                                rotate: 0 // Maintain base rotation logic
                            }}
                            transition={{
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: randomDelay
                                },
                                rotate: { duration: 0.3 } // Quick rotation change on select
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 0,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {step.title}
                        </motion.button>
                    );
                })}
            </div>

            <div className={styles.cardsContainer}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 200, damping: 25 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                            rotate: { duration: 0.3 }
                        }}
                        className={styles.processCard}
                        whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <motion.div
                            className={styles.stepSticker}
                            animate={{
                                y: [0, -10, 0], // Only float up and down
                                rotate: -10     // Keep fixed rotation like CSS
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
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }} // Entrance delay
            >
                <motion.div
                    // Floating animation matching stickers
                    animate={{
                        y: [0, -8, 0],
                        rotate: 0
                    }}
                    transition={{
                        y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2 // Offset from nav buttons
                        },
                        rotate: { duration: 0 } // Fixed rotation
                    }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 0,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ display: 'inline-block', marginTop: '4rem' }}
                >
                    <Link href="#servicios" className={styles.exploreBtn}>
                        Explorá nuestros servicios
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
