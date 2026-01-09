"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FloatingSticker from './FloatingSticker';
import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.aboutSection}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >

                <h2 className={styles.title}>Más que una agencia, <br /> tu equipo estratégico.</h2>
            </motion.div>

            <motion.p
                className={styles.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
            >
                Hola, somos Ceci y Sofi. Fundamos Koe Digital con una premisa clara:
                alejar a las marcas de las "fórmulas mágicas" y acercarlas a resultados reales a través de estrategias sólidas.
            </motion.p>
            <motion.p
                className={styles.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
            >
                Entendemos que cada negocio tiene una voz única. Nuestro trabajo es encontrarla,
                amplificarla y conectarla con las personas correctas mediante contenido de valor
                y publicidad inteligente. No creemos en el hype, creemos en el criterio.
            </motion.p>

            <motion.div
                className={styles.signature}
                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
            >
                Sofi y Ceci
            </motion.div>

            {/* Image of Ceci and Sofi */}
            <div className={styles.imageWrapper}>
                <Image
                    src="/SofiCeci.png"
                    alt="Sofi y Ceci"
                    width={400}
                    height={500}
                    priority
                    className={styles.foundersImage}
                />
            </div>

            {/* Decorative Stickers */}
            <FloatingSticker top="15%" left="10%" rotate={-10} speed={0.5}>
                Resultados Reales
            </FloatingSticker>
            <FloatingSticker bottom="20%" right="10%" rotate={10} speed={0.8} delay={1}>
                Sin Humo
            </FloatingSticker>
            <FloatingSticker top="40%" right="20%" rotate={5} speed={0.3} delay={2}>
                ★
            </FloatingSticker>
        </section>
    );
}
