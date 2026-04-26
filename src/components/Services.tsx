"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Services.module.css';
import Link from 'next/link';
import AnimatedTitle from './AnimatedTitle';
import ScrollPop from './ScrollPop';

const cardHover = { y: -8, transition: { type: "spring" as const, stiffness: 300 } };

export default function Services() {

    const plans = [
        {
            title: "Plan Dirección",
            label: "DIRECCIÓN",
            // Price removed
            desc: "Un plan enfocado en el análisis estratégico y la organización de la comunicación de la marca. Está pensado para definir objetivos, ordenar la presencia digital y establecer una base clara para el desarrollo de contenido.",
            includes: [
                "Análisis inicial de marca para definir objetivos",
                "Optimización completa de perfiles en todas las plataformas",
                "Planificación de la estrategia de comunicación",
                "Creación de categorías de contenido por red social",
                "Guía creativa simple con guiones orientativos para reels"
            ],
            deliverables: [
                "Estrategia de comunicación",
                "Categorías de contenido",
                "Guía creativa para reels"
            ],
            note: "Este plan no incluye diseño ni programación de contenido."
        },
        {
            title: "Plan Esencial",
            // Price removed
            desc: "Un plan orientado a la gestión activa de redes sociales, combinando estrategia, creación de contenido y publicación, con seguimiento de métricas y soporte publicitario.",
            includes: [
                "Análisis inicial de marca y definición de objetivos",
                "Optimización completa de la red social",
                "Búsqueda de temas, creación, diseño y redacción",
                "Diseño gráfico de piezas para historias y feed",
                "Guión y edición simple de reels",
                "Análisis de métricas",
                "Publicidad en Meta Ads / Google Ads"
            ],
            deliverables: [
                "6 posteos",
                "2 reels",
                "8 historias"
            ]
        },
        {
            title: "Plan Escala",
            // Price removed
            desc: "Un plan pensado para marcas que buscan aumentar su presencia digital y escalar su comunicación, con mayor volumen de contenido y acompañamiento estratégico continuo.",
            includes: [
                "Análisis inicial de marca y revisión del plan de marketing",
                "Optimización completa de la red social",
                "Búsqueda de temas, creación, diseño, redacción y subida",
                "Diseño gráfico de piezas para historias y feed",
                "Guión y edición simple de reels",
                "Análisis de métricas",
                "Publicidad en Meta Ads / Google Ads"
            ],
            deliverables: [
                "8 posteos",
                "4 reels",
                "20 historias"
            ]
        }
    ];

    const carouselRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(false);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsAtStart(scrollLeft <= 5);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        }
    };

    // Al montar y en resize, verificar posición
    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    // Scroll to middle (Esencial) initially on mobile
    useEffect(() => {
        if (carouselRef.current && window.innerWidth <= 900) {
            // Give layout a tick to paint for correct scrollWidth
            setTimeout(() => {
                if (carouselRef.current) {
                    const itemWidth = carouselRef.current.scrollWidth / plans.length;
                    carouselRef.current.scrollTo({ left: itemWidth, behavior: 'instant' as ScrollBehavior });
                    checkScrollPosition();
                }
            }, 100);
        }
    }, [plans.length]);

    const handlePrev = () => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.clientWidth * 0.8; // roughly the width of a card + gap
            carouselRef.current.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.clientWidth * 0.8;
            carouselRef.current.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.servicesSection}>
            {/* Wave Divider Top */}
            <div className={styles.waveDividerTop} />

            {/* Mobile Tabs (Arrows) */}
            <div className={styles.mobileTabs}>
                <button
                    className={styles.arrowButton}
                    onClick={handlePrev}
                    disabled={isAtStart}
                    aria-label="Plan anterior"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                    className={styles.arrowButton}
                    onClick={handleNext}
                    disabled={isAtEnd}
                    aria-label="Plan siguiente"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
            </div>

            {/* Grid / Carousel View */}
            <div className={styles.carouselContainer} ref={carouselRef} onScroll={checkScrollPosition}>
                <div className={styles.grid}>
                    {plans.map((plan, i) => (
                        <ScrollPop
                            key={plan.title}
                            className={styles.card}
                            delay={i * 0.2}
                            whileHover={cardHover}
                            disableMobileAnimation={true}
                        >
                            <div className={styles.cardHeaderContent}>
                                <AnimatedTitle
                                    text={plan.title}
                                    as="h3"
                                    className={styles.cardTitle}
                                    hoverColor="var(--cyan-medium)"
                                    enableReveal={false}
                                />
                                <p className={styles.cardDesc}>{plan.desc}</p>
                            </div>

                            <div className={styles.contentSection}>
                                <AnimatedTitle
                                    text="Qué incluye"
                                    as="h4"
                                    className={styles.sectionTitle}
                                    hoverColor="var(--cyan-medium)"
                                    enableReveal={false}
                                />
                                <ul className={styles.detailList}>
                                    {plan.includes.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.contentSection}>
                                <AnimatedTitle
                                    text="Entregables"
                                    as="h4"
                                    className={styles.sectionTitle}
                                    hoverColor="var(--cyan-medium)"
                                    enableReveal={false}
                                />
                                <ul className={styles.detailList}>
                                    {plan.deliverables.map((item: string, idx: number) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.cardBtnWrapper}>
                                <Link href="#contacto" className={styles.cardBtn}>
                                    Contratar Plan
                                </Link>
                            </div>
                        </ScrollPop>
                    ))}
                </div>
            </div>
        </section>
    );
}
