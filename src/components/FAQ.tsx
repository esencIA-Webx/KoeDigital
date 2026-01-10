"use client";

import { useState, useEffect } from 'react';
import styles from './FAQ.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
    const faqs = [
        {
            q: "¿Cuánto tardan en verse los resultados?",
            a: "Depende del objetivo y el canal. En publicidad paga, los resultados pueden ser inmediatos, mientras que una estrategia de branding y posicionamiento orgánico suele madurar entre los 3 y 6 meses."
        },
        {
            q: "¿Existe un tiempo de permanencia mínima?",
            a: "Para servicios de gestión mensual (Social Media), sugerimos un compromiso mínimo de 3 meses para poder evaluar métricas y optimizar la estrategia correctamente."
        },
        {
            q: "¿Hacen solo redes sociales?",
            a: "No. Somos una agencia integral. Ofrecemos desarrollo web, publicidad online (Ads), email marketing y consultoría estratégica de marca."
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    // Autoplay functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 6000); // 6 seconds

        return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % faqs.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + faqs.length) % faqs.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume autoplay after 3 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 3000);
    };

    const handleNavClick = (callback: () => void) => {
        setIsAutoPlaying(false);
        callback();
        // Resume autoplay after 3 seconds
        setTimeout(() => setIsAutoPlaying(true), 3000);
    };

    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -100 : 100,
            opacity: 0
        })
    };

    return (
        <section className={styles.faqSection}>
            <div className={`container ${styles.faqContainer}`}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Preguntas Frecuentes
                </motion.h2>

                <div
                    className={styles.carouselContainer}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        className={`${styles.navButton} ${styles.navButtonPrev}`}
                        onClick={() => handleNavClick(prevSlide)}
                        aria-label="Pregunta anterior"
                    >
                        ←
                    </button>

                    <div className={styles.slideWrapper}>
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentSlide}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "tween", duration: 0.6, ease: "easeInOut" },
                                    opacity: { duration: 0.6, ease: "easeInOut" }
                                }}
                                className={styles.slide}
                            >
                                <h3 className={styles.question}>{faqs[currentSlide].q}</h3>
                                <p className={styles.answer}>{faqs[currentSlide].a}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        className={`${styles.navButton} ${styles.navButtonNext}`}
                        onClick={() => handleNavClick(nextSlide)}
                        aria-label="Siguiente pregunta"
                    >
                        →
                    </button>
                </div>

                <div className={styles.dotIndicators}>
                    {faqs.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir a pregunta ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
