"use client";

import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import styles from './BrandTitle.module.css';

export default function BrandTitle() {
    return (
        <motion.div
            className={styles.brandHeader}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <motion.div
                className={styles.brandLogoContainer}
                whileHover={{
                    y: -15,
                    rotate: -5,
                    scale: 1,
                    transition: { type: "spring", stiffness: 150, damping: 15 }
                }}
            >
                <div className={styles.brandLogoMask} />
            </motion.div>

            <AnimatedTitle
                text="Digital"
                className={styles.brandTitle}
                hoverColor="#6c8c7d" // Green hover
                shadowColor="#1D3557"
            />
        </motion.div>
    );
}
