"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingStickerProps {
    children: React.ReactNode;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    rotate?: number;
    speed?: number; // Parallax speed (e.g., 0.5 for slow, 2 for fast)
    delay?: number; // Floating delay
    shadowColor?: string;
}

export default function FloatingSticker({
    children,
    top, left, right, bottom,
    rotate = 0,
    speed = 1,
    delay = 0,
    shadowColor
}: FloatingStickerProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Parallax Logic
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Convert scroll progress (0 to 1) to Y movement (-100px to 100px * speed)
    const yParallax = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

    return (
        <motion.div
            ref={ref}
            style={{
                position: 'absolute',
                top, left, right, bottom,
                zIndex: 0,
                pointerEvents: 'none', // Ensure it doesn't block clicks
                y: yParallax
            }}
        >
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [rotate - 2, rotate + 2, rotate - 2]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }}
                style={{
                    rotate: rotate
                }}
            >
                {/* Visual Style for "Sticker/Stamp" feel */}
                <div style={{
                    background: 'white',
                    padding: '8px 12px', /* Padding creates the rim for the mask */
                    // Stamp Effect using Mask
                    mask: `
                        conic-gradient(#000 0 0) content-box, 
                        radial-gradient(circle at center, #0000 98%, #000) 0 0 / 10px 10px round border-box
                    `,
                    WebkitMask: `
                        conic-gradient(#000 0 0) content-box, 
                        radial-gradient(circle at center, #0000 98%, #000) 0 0 / 10px 10px round border-box
                    `,
                    filter: `drop-shadow(8px 8px 0px ${shadowColor || 'rgba(0,0,0,0.1)'})`,

                    fontFamily: 'var(--font-script)',
                    color: 'var(--bg-coral)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(0deg)', // Reset local rotation
                    opacity: 1
                }}>
                    <span style={{
                        background: '#fcf8f5',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '2px', // Slight inner round
                        display: 'block',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        {children}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
}
