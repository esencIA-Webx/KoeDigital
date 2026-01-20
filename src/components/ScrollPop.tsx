"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

// Use 'any' to allow swapping 'as' prop between div, button, etc without type conflicts
interface ScrollPopProps extends HTMLMotionProps<any> {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    as?: 'div' | 'section' | 'article' | 'li' | 'button' | 'span';
}

export default function ScrollPop({
    children,
    className,
    style,
    delay = 0,
    as = 'div',
    ...props
}: ScrollPopProps) {
    // Cast to any to avoid "Expression produces a union type that is too complex to represent" 
    // and strict event handler compatibility checks (button vs div). 
    // Framer Motion handles this safely at runtime.
    const Tag = motion[as] as any;

    return (
        <Tag
            className={className}
            style={style}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }} // Trigger once, slightly before fully in view
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: delay
            }}
            {...props}
        >
            {children}
        </Tag>
    );
}
