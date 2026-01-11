"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    // Initial check and resize listener
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const stickerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.ended) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                if (isPlaying) {
                    videoRef.current.pause();
                } else {
                    videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
            }
        }
    };

    return (
        <section ref={containerRef} className={styles.heroSection}>

            {/* Video Background */}
            <div className={styles.videoContainer}>
                <video
                    key={isMobile ? 'mobile' : 'desktop'} // Remount video when source changes
                    ref={videoRef}
                    className={`${styles.heroVideo} ${styles.active}`}
                    src={isMobile ? "/KoeVert.mov" : "/Koe.mov"}
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                />
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
