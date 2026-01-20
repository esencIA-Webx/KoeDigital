"use client";

import { ReactNode } from 'react';
import styles from './SectionDivider.module.css';

interface SectionDividerProps {
    children: ReactNode;
    id?: string;
    style?: React.CSSProperties;
}

export default function SectionDivider({ children, id, style }: SectionDividerProps) {
    return (
        <section className={styles.dividerSection} id={id} style={style}>
            <div className={styles.waveDividerTop}></div>
            <div className={styles.contentContainer}>
                {children}
            </div>

        </section>
    );
}
