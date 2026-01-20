"use client";
import { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [points, setPoints] = useState<{ x: number, y: number }[]>([]);
    const animationFrame = useRef<number>(0);

    useEffect(() => {
        const checkDevice = () => {
            if (window.matchMedia("(pointer: fine)").matches) {
                setIsDesktop(true);
            } else {
                setIsDesktop(false);
            }
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);

        if (window.matchMedia("(pointer: fine)").matches) {
            document.body.style.cursor = 'none';
        }

        return () => {
            window.removeEventListener('resize', checkDevice);
            document.body.style.cursor = 'auto';
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const handleMouseMove = (e: MouseEvent) => {
            const newPoint = { x: e.clientX, y: e.clientY };
            setPoints(prev => {
                const newPoints = [...prev, newPoint];
                if (newPoints.length > 30) newPoints.shift(); // Max trail length
                return newPoints;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Loop to remove points if mouse stops (fading tail effect)
        const loop = () => {
            setPoints(prev => {
                if (prev.length > 0) {
                    // Remove oldest point slowly to shrink tail when inactive
                    // Or just keep the path? Usually trails shrink.
                    // Let's shorten it slightly every frame if no movement?
                    // Actually, simplified: Just decay.
                    // For a direct stroke, we usually just keep the history.
                    // To make it disappear like a trail:
                    return prev.slice(1);
                }
                return prev;
            });
            animationFrame.current = requestAnimationFrame(loop);
        };

        // Actually, requestAnimationFrame loop is too fast for simple slice, it will vanish instantly.
        // We need 'mousemove' to ADD, and a timer or decay to REMOVE.
        // Better strategy: Use a timestamp or just standard history buffer.
        // If we want it to "vanish" when stopping, we need the decay.
        // Let's use a simpler decay interval.

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame.current);
        };
    }, [isDesktop]);

    // Decay timer
    useEffect(() => {
        if (!isDesktop) return;
        const interval = setInterval(() => {
            setPoints(prev => {
                if (prev.length > 0) return prev.slice(1);
                return prev;
            });
        }, 30); // Speed of trail disappearance
        return () => clearInterval(interval);
    }, [isDesktop]);

    if (!isDesktop) return null;

    // Generate Path Data
    // Simple polyline: "M x y L x y ..."
    // For smoothness, could use quadratic bezier, but L is fine for high sample rate.
    const pathData = points.length > 1
        ? `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`
        : '';

    // Get current mouse pos (last point)
    const currentPos = points[points.length - 1] || { x: -100, y: -100 };

    return (
        <div className={styles.cursorContainer}>
            <style jsx global>{`
                a, button, input, textarea, select, .pointer-element {
                    cursor: none !important;
                }
            `}</style>

            {/* SVG Layer for Stroke */}
            <svg className={styles.svgLayer}>
                <defs>
                    <linearGradient id="trailGradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--pink-light)" />
                        <stop offset="25%" stopColor="var(--green-light)" />
                        <stop offset="50%" stopColor="var(--cyan-light)" />
                        <stop offset="75%" stopColor="var(--orange-light)" />
                        <stop offset="100%" stopColor="var(--pink-dark)" />
                        {/* Gradient needs to map to path length? 
                             userSpaceOnUse is coordinates. 
                             Ideally, stroke gradient should follow the path. 
                             SVG can't easily do 'gradient along path'. 
                             Workaround: Just a cool screen-space gradient or fixed gradient.
                             Let's stick to standard gradient for now.
                         */}
                    </linearGradient>
                </defs>

                {/* 
                   To make colors cycle, we can either use the gradient above (static to screen or bounding box)
                   OR render segments. Segments are better for "rainbow brush".
                   Let's try rendering segments for nice effect.
                */}
                {points.map((point, i) => {
                    if (i === 0) return null;
                    const prev = points[i - 1];
                    // Cycle color based on index
                    const colors = [
                        'var(--pink-light)', 'var(--green-light)', 'var(--cyan-light)',
                        'var(--olive-light)', 'var(--orange-light)'
                    ];
                    const color = colors[i % colors.length];

                    return (
                        <path
                            key={i}
                            d={`M ${prev.x} ${prev.y} L ${point.x} ${point.y}`}
                            stroke={color}
                            // Taper logic: index near length is Thick (Head), near 0 is Thin (Tail). Correct?
                            // i = 0 (Tail) -> Stroke small
                            // i = length (Head) -> Stroke big
                            // Formula: BaseWidth * (i / length)
                            strokeWidth={(i / points.length) * 8}
                            strokeLinecap="round"
                            fill="none"
                        />
                    );
                })}
            </svg>

            {/* Main Cursor Dot - Always visible on top */}
            <div
                className={styles.mainCursor}
                style={{
                    left: currentPos.x,
                    top: currentPos.y
                }}
            />
        </div>
    );
}
