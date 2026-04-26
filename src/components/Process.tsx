"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Map, BarChart, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import ScrollPop from './ScrollPop';
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        checkMobile();
        const mq = window.matchMedia('(max-width: 768px)');
        mq.addEventListener('change', checkMobile);
        return () => mq.removeEventListener('change', checkMobile);
    }, []);



    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        })
    };

    const carouselRef = useRef<HTMLDivElement>(null);

    const handleCarouselScroll = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        const clientWidth = container.clientWidth;
        
        // Find which card is closest to the center of the view
        let closestIndex = currentIndex;
        let minDistance = Infinity;
        
        Array.from(container.children).forEach((child, index) => {
            const htmlChild = child as HTMLElement;
            const childCenter = htmlChild.offsetLeft + htmlChild.offsetWidth / 2 - container.offsetLeft;
            const viewCenter = scrollLeft + clientWidth / 2;
            const distance = Math.abs(childCenter - viewCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== currentIndex) {
            setCurrentIndex(closestIndex);
        }
    };

    const scrollToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        
        if (carouselRef.current) {
            const container = carouselRef.current;
            const child = container.children[index] as HTMLElement;
            if (child) {
                const paddingLeft = parseInt(window.getComputedStyle(container).paddingLeft || '0');
                container.scrollTo({ left: child.offsetLeft - container.offsetLeft - paddingLeft, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={styles.processSection}>
            {/* Wave Divider Top */}
            <div className={styles.waveDividerTop}></div>



            <ScrollPop
                className={styles.introCard}
                delay={0.2}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
                <div className={styles.descriptionText} style={{ margin: 0, padding: 0 }}>
                    <div className={styles.introCardHeader}>
                        <p className={styles.introCardTitle}>
                            <AnimatedTitle
                                text="En KOE no aplicamos fórmulas genéricas."
                                as="span"
                                hoverColor="var(--pink-dark)"
                                style={{ display: 'inline-block' }}
                            />
                        </p>
                        <p>
                            Ofrecemos un servicio 100% personalizado, <br className={styles.mobileBreak} />
                            donde cada estrategia, diseño y acción <br className={styles.mobileBreak} />
                            está pensada a medida del negocio <br className={styles.mobileBreak} />
                            y alineada a objetivos concretos.
                        </p>
                    </div>
                    <ul>
                        <li>Visión integral: marca, comunicación y resultados.</li>
                        <li>Estudio del mercado y la competencia directa.</li>
                        <li>Procesos claros, ordenados y medibles.</li>
                    </ul>
                </div>
            </ScrollPop>

            {/* Desktop nav stickers */}
            <div className={styles.navContainer}>
                {steps.map((step, index) => {
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
                            animate={{ y: [0, -5, 0], rotate: 0 }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: randomDelay },
                                rotate: { duration: 0.3 }
                            }}
                            whileHover={{ scale: 1.1, rotate: 0, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {step.title}
                        </motion.button>
                    );
                })}
            </div>

            {/* Mobile numbered buttons */}
            <div className={styles.mobileNavContainer}>
                {steps.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.numButton} ${currentIndex === index ? styles.numButtonActive : ''}`}
                        onClick={() => scrollToSlide(index)}
                        aria-label={`Paso ${index + 1}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className={styles.desktopCardsContainer}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 280, damping: 28 },
                            opacity: { duration: 0.15 },
                        }}
                        className={styles.processCard}
                        whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <motion.div
                            className={styles.stepSticker}
                            animate={{
                                y: [0, -10, 0],
                                rotate: -10
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
                            <AnimatedTitle
                                text={steps[currentIndex].title}
                                as="h3"
                                className={styles.cardTitle}
                                hoverColor="var(--pink-dark)"
                                enableReveal={true}
                                key={currentIndex}
                            />
                        </div>

                        <div className={styles.cardContent}>
                            <p className={styles.cardDescription}>{steps[currentIndex].description}</p>
                            <p className={styles.cardSubtitle}>{steps[currentIndex].subtitle}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={styles.mobileCardsContainer} ref={carouselRef} onScroll={handleCarouselScroll}>
                {steps.map((step, index) => (
                    <ScrollPop key={index} className={styles.mobileCardWrapper} delay={index * 0.2}>
                        <div className={styles.processCard}>
                            <motion.div
                                className={styles.stepSticker}
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: -10
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <span className={styles.stickerInner}>#{index + 1}</span>
                            </motion.div>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconContainer}>
                                    {step.icon}
                                </div>
                                <h3 className={styles.cardTitle} style={{ color: 'var(--pink-dark)' }}>
                                    {step.title}
                                </h3>
                            </div>

                            <div className={styles.cardContent}>
                                <p className={styles.cardDescription}>{step.description}</p>
                                <p className={styles.cardSubtitle}>{step.subtitle}</p>
                            </div>
                        </div>
                    </ScrollPop>
                ))}
            </div>

            <ScrollPop
                delay={0.5}
                className={styles.processCtaContainer}
                style={{ marginTop: '4rem' }}
            >
                <div style={{ display: 'inline-block' }}> {/* Wrapper for float animation inner */}
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
                    >
                        <Link href="#servicios" className={styles.exploreBtn}>
                            Explorá nuestros servicios
                        </Link>
                    </motion.div>
                </div>
            </ScrollPop>
        </section>
    );
}
