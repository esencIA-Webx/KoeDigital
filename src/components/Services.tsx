"use client";

import styles from './Services.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import ScrollPop from './ScrollPop';

export default function Services() {
    const plans = [
        {
            title: "Plan Dirección",
            // Price removed
            desc: "Un plan enfocado en el análisis estratégico y la organización de la comunicación de la marca. Está pensado para definir objetivos, ordenar la presencia digital y establecer una base clara para el desarrollo de contenido.",
            includes: [
                "Análisis inicial de marca para definir objetivos",
                "Optimización completa de perfiles en todas las plataformas",
                "Planificación de la estrategia de comunicación",
                "Creación de categorías de contenido por red social",
                "Guía creativa simple con guiones orientativos para reels"
            ],
            process: [
                { week: "Semana 1", task: "Análisis inicial, objetivos y optimización de perfiles." },
                { week: "Semana 2", task: "Desarrollo de estrategia: enfoque, tono y lineamientos." },
                { week: "Semana 3", task: "Creación de categorías de contenido específicas." },
                { week: "Semana 4", task: "Entrega de guía creativa con guiones para reels." }
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
            process: [
                { week: "Semana 1", task: "Análisis, brief estratégico y calendario de contenido." },
                { week: "Semana 2", task: "Corrección de ideas y comienzo de diseño/edición." },
                { week: "Semana 3", task: "Producción visual y edición asegurando calidad." },
                { week: "Semana 4", task: "Correcciones finales y programación." }
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
            process: [
                { week: "Semana 1", task: "Análisis de marca, brief estratégico y calendario." },
                { week: "Semana 2", task: "Correcciones y comienzo del diseño y edición." },
                { week: "Semana 3", task: "Producción visual y edición de contenido." },
                { week: "Semana 4", task: "Correcciones finales, programación y publicación." }
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



            <div className={styles.grid}>
                {plans.map((plan, i) => (
                    <ScrollPop
                        key={plan.title}
                        className={styles.card}
                        delay={i * 0.2}
                        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <div className={styles.cardHeaderContent}>
                            <h3 className={styles.cardTitle}>{plan.title}</h3>
                            {/* Price removed */}
                            <p className={styles.cardDesc}>{plan.desc}</p>
                        </div>

                        <div className={styles.contentSection}>
                            <h4 className={styles.sectionTitle}>Qué incluye</h4>
                            <ul className={styles.detailList}>
                                {plan.includes.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.contentSection}>
                            <h4 className={styles.sectionTitle}>Proceso de trabajo</h4>
                            {plan.process.map((step, idx) => (
                                <div key={idx} className={styles.weekItem}>
                                    <span className={styles.weekTitle}>{step.week}</span>
                                    <p className={styles.weekDesc}>{step.task}</p>
                                </div>
                            ))}
                        </div>

                        <div className={styles.contentSection}>
                            <h4 className={styles.sectionTitle}>Entregables</h4>
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
