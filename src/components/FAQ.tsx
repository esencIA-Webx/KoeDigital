"use client";

import styles from './FAQ.module.css';
import { motion } from 'framer-motion';

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

                {faqs.map((item, i) => (
                    <motion.div
                        key={i}
                        className={styles.faqItem}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <h3 className={styles.question}>{item.q}</h3>
                        <p className={styles.answer}>{item.a}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
