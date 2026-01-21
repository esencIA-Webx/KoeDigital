"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(true);
    // Video ref for play/pause control
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    // Removed manual resize listener for performance - using native <source media> instead

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const stickerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <section ref={containerRef} className={styles.heroSection}>

            {/* Video Background */}
            <div className={styles.videoContainer}>
                <video
                    ref={videoRef}
                    className={`${styles.heroVideo} ${styles.active}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                >
                    {/* Mobile Source (Prioritized) */}
                    <source src="/KoeVert.mov" type="video/quicktime" media="(max-width: 768px)" />
                    <source src="/KoeVert.mov" type="video/mp4" media="(max-width: 768px)" />

                    {/* Desktop Source */}
                    <source src="/Koe.mov" type="video/quicktime" />
                    <source src="/Koe.mov" type="video/mp4" />
                </video>
            </div>

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
