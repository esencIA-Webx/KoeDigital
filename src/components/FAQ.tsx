"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './FAQ.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';

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

    // Mobile Carousel Logic
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScroll = () => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft <= 5);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        
        // Update active dot
        const slideWidth = scrollWidth / faqs.length;
        const index = Math.round(scrollLeft / slideWidth);
        if (index >= 0 && index < faqs.length && index !== currentMobileSlide) {
            setCurrentMobileSlide(index);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const handlePrevMobile = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const handleNextMobile = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' });
        }
    };

    const scrollToSlideMobile = (index: number) => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.scrollWidth / faqs.length;
            carouselRef.current.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.faqSection}>
            {/* Curved Top Border */}
            <div className={styles.waveDividerTop}></div>

            <div className={`container ${styles.faqContainer}`}>


                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
                    <AnimatedTitle
                        text="PREGUNTAS"
                        className={styles.faqTitlePrefix}
                        style={{ fontWeight: '800', color: 'var(--foreground)', textTransform: 'uppercase' }}
                        hoverColor="var(--text-yellow)"
                        shadowColor="#1D3557"
                        enableReveal={true}
                        revealDirection="right"
                    />
                    <AnimatedTitle
                        text="Frecuentes"
                        style={{ fontFamily: 'var(--font-detail)', fontSize: '5.5rem', color: 'var(--foreground)', marginBottom: '-10px' }}
                        hoverColor="var(--text-yellow)"
                        shadowColor="#1D3557"
                        enableReveal={true}
                        revealDirection="right"
                    />
                </div>

                <div className={styles.desktopCarousel}>
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>

                        <div className={styles.slideWrapper}>
                            <AnimatePresence mode="wait" custom={direction} initial={false}>
                                <motion.div
                                    key={currentSlide}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 200, damping: 25 },
                                        opacity: { duration: 0.3 },
                                        scale: { duration: 0.3 },
                                        rotate: { duration: 0.3 }
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
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

                <div className={styles.mobileCarousel}>
                    <div className={styles.carouselContainer}>
                        <button
                            className={`${styles.navButton} ${styles.navButtonPrev}`}
                            onClick={handlePrevMobile}
                            disabled={isAtStart}
                            aria-label="Pregunta anterior"
                            style={{ opacity: isAtStart ? 0.5 : 1 }}
                        >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>

                        <div className={styles.mobileSlideWrapper} ref={carouselRef} onScroll={checkScroll}>
                            {faqs.map((faq, index) => (
                                <div key={index} className={styles.mobileSlide}>
                                    <h3 className={styles.question}>{faq.q}</h3>
                                    <p className={styles.answer}>{faq.a}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            className={`${styles.navButton} ${styles.navButtonNext}`}
                            onClick={handleNextMobile}
                            disabled={isAtEnd}
                            aria-label="Siguiente pregunta"
                            style={{ opacity: isAtEnd ? 0.5 : 1 }}
                        >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>

                    <div className={styles.dotIndicators}>
                        {faqs.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === currentMobileSlide ? styles.dotActive : ''}`}
                                onClick={() => scrollToSlideMobile(index)}
                                aria-label={`Ir a pregunta ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Green Wave at Bottom - Rising into FAQ */}
                <div className={styles.waveDividerBottom}></div>
            </div>
        </section>
    );
}
