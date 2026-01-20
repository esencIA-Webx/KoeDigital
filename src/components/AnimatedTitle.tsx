"use client";

import { motion } from 'framer-motion';

interface AnimatedTitleProps {
    text: string;
    className?: string; // For container styles (font, size, etc.)
    hoverColor?: string; // Color to change to on hover
    baseColor?: string; // Initial color (optional, usually handled by CSS class)
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span'; // Tag to render
    style?: React.CSSProperties;
}

export default function AnimatedTitle({
    text,
    className,
    hoverColor = "var(--bg-coral)", // Default fallback
    shadowColor = "rgba(0,0,0,0.2)", // Default shadow
    as = 'h2',
    style
}: AnimatedTitleProps & { shadowColor?: string }) {
    const Tag = motion[as];

    return (
        <Tag className={className} style={{ display: 'block', ...style }}>{/* Changed to block to allow container width to control wrapping */}
            {text.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            style={{
                                display: "inline-block",
                                color: 'inherit',
                                textShadow: `4px 4px 0px ${shadowColor}`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 15
                            }}
                            whileHover={{
                                y: -15,
                                rotate: -5,
                                scale: 1,
                                color: hoverColor,
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {/* Add space as a separate non-breaking element or margin, but we need it to be selectable/copyable ideally. 
                        A simple space string " " between inline-blocks might collapse. 
                        Let's append a space to the word span, but putting it inside the nowrap span might make it stick to the word. 
                        Actually we want the space to be part of the flow. 
                        Let's just add a space char motion span? Or just a normal space char. 
                     */}
                    <span style={{ display: 'inline-block', whiteSpace: 'pre' }}> </span>
                </span>
            ))}
        </Tag>
    );
}
