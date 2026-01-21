"use client";

import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import styles from './BrandTitle.module.css';

export default function BrandTitle() {
    return (
        <div className={styles.brandHeader}> {/* Removed parent motion to control children independently */}
            <motion.div
                className={styles.brandLogoContainer}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                whileHover={{
                    y: -15,
                    rotate: -5,
                    scale: 1,
                    transition: { type: "spring", stiffness: 150, damping: 15 }
                }}
            >
                <div className={styles.brandLogoMask} />
            </motion.div>


        </div>
    );
}
