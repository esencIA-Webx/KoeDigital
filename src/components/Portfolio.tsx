"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Portfolio.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AnimatedTitle from './AnimatedTitle';
import ScrollPop from './ScrollPop';

export default function Portfolio() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cases = [
        {
            client: "Café Martínez",
            role: "Estrategia de Contenidos",
            desc: "Desarrollo de contenidos, combinando planificación, redacción, diseño y edición de video para optimizar su presencia online.",
            image: "/portfolio/puie-quesos.png",
            fullImage: "/portfolio/cafe-martinez-full.jpg"
        },
        {
            client: "Norberto Gnocchi",
            role: "Gestión Integral",
            desc: "Gestión integral de contenidos incluyendo estrategia, copywriting, diseño y producción de video para mejorar su impacto digital.",
            image: "/portfolio/norberto-gnocchi.jpg",
            fullImage: "/portfolio/norberto-gnocchi-full.jpg"
        },
        {
            client: "Puie",
            role: "Producción de Contenidos",
            desc: "producción y gestión de contenidos, integrando copy, diseño y edición de video para potenciar su comunicación digital.",
            image: "/portfolio/cafe-martinez.png",
            fullImage: "/portfolio/puie-full.jpg"
        }
    ];

    return (
        <section className={styles.portfolioSection}>
            <div className={styles.waveDividerTop} />

            <div className={styles.carouselContainer}>
                <div className={styles.grid}>
                    {cases.map((p, i) => (
                        <ScrollPop
                            key={p.client}
                            className={styles.projectCard}
                            delay={i * 0.2}
                            whileHover={{ y: -5 }}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={p.image}
                                    alt={p.client}
                                    fill
                                    className={styles.mockImage}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.role}>{p.role}</span>
                                <AnimatedTitle
                                    text={p.client}
                                    as="h3"
                                    className={styles.clientName}
                                    hoverColor="var(--orange-dark)"
                                    enableReveal={false}
                                />
                                <p className={styles.desc}>{p.desc}</p>
                                <button
                                    className={styles.viewBtn}
                                    onClick={() => setSelectedImage(p.fullImage)}
                                >
                                    Ver caso
                                </button>
                            </div>
                        </ScrollPop>
                    ))}
                </div>
            </div>

            {mounted && createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className={styles.lightbox}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                className={styles.lightboxContent}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setSelectedImage(null)}
                                >
                                    ✕
                                </button>
                                <div className={styles.fullImageWrapper}>
                                    <Image
                                        src={selectedImage}
                                        alt="Full case view"
                                        fill
                                        className={styles.fullImage}
                                        priority
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
}
