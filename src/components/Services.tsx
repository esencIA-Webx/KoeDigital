"use client";

import { useState } from 'react';
import styles from './Services.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import ScrollPop from './ScrollPop';

const cardHover = { y: -8, transition: { type: "spring" as const, stiffness: 300 } };

export default function Services() {
    const [activeTab, setActiveTab] = useState(1); // Default to second plan (Esencial)

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

    return (
        <section className={styles.servicesSection}>
            {/* Wave Divider Top */}
            <div className={styles.waveDividerTop} />

            {/* Mobile Tabs */}
            <div className={styles.mobileTabs}>
                {plans.map((plan, index) => (
                    <button
                        key={index}
                        className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {plan.label || plan.title.replace('Plan ', '')}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {plans.map((plan, i) => (
                    <ScrollPop
                        key={plan.title}
                        // Add hiddenMobile class if not active tab (logic handled in CSS via media query to only apply on mobile)
                        className={`${styles.card} ${activeTab !== i ? styles.hiddenMobile : ''}`}
                        delay={i * 0.2}
                        whileHover={cardHover}
                    >
                        <div className={styles.cardHeaderContent}>
                            <AnimatedTitle
                                text={plan.title}
                                as="h3"
                                className={styles.cardTitle}
                                hoverColor="var(--cyan-medium)" // Matching Services theme
                                enableReveal={true}
                            />
                            {/* Price removed */}
                            <p className={styles.cardDesc}>{plan.desc}</p>
                        </div>

                        <div className={styles.contentSection}>
                            <AnimatedTitle
                                text="Qué incluye"
                                as="h4"
                                className={styles.sectionTitle}
                                hoverColor="var(--cyan-medium)"
                                enableReveal={true}
                            />
                            <ul className={styles.detailList}>
                                {plan.includes.map((item, idx) => (
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
                                enableReveal={true}
                            />
                            <ul className={styles.detailList}>
                                {plan.deliverables.map((item, idx) => (
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
        </section>
    );
}
