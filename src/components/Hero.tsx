"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const stickerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section ref={containerRef} className={styles.heroSection}>

            {/* Video Background */}
            <div className={styles.videoContainer}>
                {/* Placeholder video - using a generic sample or empty src until user uploads */}
                <video
                    ref={videoRef}
                    className={`${styles.heroVideo} ${isPlaying ? styles.active : ''}`}
                    src="/hero-placeholder.mp4"
                    loop
                    muted={false}
                    playsInline
                />
            </div>

            <div className={styles.contentOverlay}>
                <motion.span
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Donde las marcas
                </motion.span>

                <motion.h1
                    className={styles.mainTitle}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    ENCUENTRAN<br />SU VOZ
                </motion.h1>

                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Estrategia, contenido y publicidad pensados a medida.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link href="#como-trabajamos" style={{
                        background: 'var(--bg-coral)',
                        color: 'white',
                        padding: '1rem 3rem',
                        borderRadius: '50px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        display: 'inline-block',
                        textDecoration: 'none'
                    }}>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block' }}
                        >
                            Conocé cómo trabajamos
                        </motion.span>
                    </Link>
                </motion.div>
            </div>

            {/* Funny Sticker - Parallax Effect */}
            <motion.div
                className={styles.sticker}
                style={{ y: stickerY, rotate: 15 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                KOE IS<br />DIGITAL
            </motion.div>

            {/* Play/Pause Toggle */}
            <div className={styles.playBtnContainer}>
                <motion.button
                    className={styles.playToggleBtn}
                    onClick={toggleVideo}
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </motion.button>
            </div>

        </section>
    );
}
