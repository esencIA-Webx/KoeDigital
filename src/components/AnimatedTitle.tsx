"use client";

import { motion } from 'framer-motion';

interface AnimatedTitleProps {
    text: string;
    className?: string; // For container styles (font, size, etc.)
    hoverColor?: string; // Color to change to on hover
    baseColor?: string; // Initial color (optional, usually handled by CSS class)
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span' | 'p' | 'section' | 'a'; // Added 'a' to types
    style?: React.CSSProperties;
}

export default function AnimatedTitle({
    text,
    className,
    hoverColor = "var(--bg-coral)", // Default fallback
    shadowColor = "rgba(0,0,0,0.2)", // Default shadow
    as = 'h2',
    enableReveal = false, // New prop to toggle scroll animation
    revealDirection = 'right', // 'right' (default) means text comes FROM right. 'left' means from left.
    delay = 0.1, // Delay before starting animation
    style
}: AnimatedTitleProps & { shadowColor?: string, enableReveal?: boolean, revealDirection?: 'left' | 'right', delay?: number }) {
    const Tag = motion[as as keyof typeof motion] || motion.div; // Safe access to motion component

    // Variants for the container to stagger children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Time between each letter appearing
                delayChildren: delay
            }
        }
    };

    // Variants for each letter
    const letterVariants = {
        hidden: {
            opacity: 0,
            x: revealDirection === 'right' ? 100 : -100, // Direction logic
            rotate: revealDirection === 'right' ? 10 : -10
        },
        visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100
            }
        }
    };

    // Default display based on 'as' prop
    const defaultDisplay = (as === 'span' || (as as string) === 'a') ? 'inline-block' : 'block';

    return (
        <Tag
            className={className}
            style={{ display: defaultDisplay, ...style }}
            // Apply animations only if enableReveal is true
            initial={enableReveal ? "hidden" : undefined}
            whileInView={enableReveal ? "visible" : undefined}
            viewport={enableReveal ? { once: false, margin: "-10%" } : undefined}
            variants={enableReveal ? containerVariants : undefined}
        >
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            style={{
                                display: "inline-block",
                                color: 'inherit'
                            }}
                            // If reveal is enabled, use variants. Otherwise just hover.
                            variants={enableReveal ? letterVariants : undefined}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 15
                            }}
                            whileHover={{
                                y: -5, // Reduced movement for inline text
                                rotate: -2,
                                scale: 1.1,
                                color: hoverColor,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    <span style={{ display: 'inline-block', whiteSpace: 'pre' }}> </span>
                </span>
            ))}
        </Tag>
    );
}
