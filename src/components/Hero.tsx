"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(true);
    // Video refs for play/pause control
    const desktopVideoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const stickerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const toggleVideo = () => {
        const vids = [desktopVideoRef.current, mobileVideoRef.current];
        let wasPaused = false;
        
        // Find if the currently visible video is paused
        vids.forEach(vid => {
            if (vid && vid.offsetParent !== null) { // visible check
                if (vid.paused) wasPaused = true;
            }
        });

        // Toggle both just in case resize happens
        vids.forEach(vid => {
            if (vid) {
                if (wasPaused) vid.play();
                else vid.pause();
            }
        });
        
        setIsPlaying(wasPaused);
    };

    return (
        <section ref={containerRef} className={styles.heroSection}>

            {/* Video Background */}
            <div className={styles.videoContainer}>
                {/* Desktop Source */}
                <video
                    ref={desktopVideoRef}
                    className={`${styles.heroVideo} ${styles.desktopVideo}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    onEnded={() => setIsPlaying(false)}
                    src="/Koe.mp4"
                />

                {/* Mobile Source */}
                <video
                    ref={mobileVideoRef}
                    className={`${styles.heroVideo} ${styles.mobileVideo}`}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    onEnded={() => setIsPlaying(false)}
                    src="/Koevert.mp4"
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
