"use client";

import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function AboutBody() {
    return (
        <section className={styles.aboutSection} style={{
            paddingTop: '2rem',
            minHeight: 'auto',
            backgroundImage: "url('/textura 2.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            position: 'relative',
            overflow: 'visible', // Allow wave to hang out
            zIndex: 18 // Increased to 18 to sit on top of KOE DIGITAL Divider (zIndex 15)
        }}>
            {/* Wave Divider */}
            <div className={styles.waveDividerTop}></div>

            {/* Using texture background to follow divider */}
            <div className={styles.contentContainer}>
                <div className={styles.textColumn}>
                    <motion.div
                        className={styles.institutionalBlock}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        {/* Presentation Card (Content Only) */}
                        <motion.div
                            className={styles.presentationCard}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.brandContent}>
                                <p>Somos una agencia de marketing digital que acompaña a marcas, emprendedores y negocios en el desarrollo de su comunicación, estrategia y presencia digital.</p>
                                <p>El trabajo en KOE parte siempre del entendimiento profundo del negocio, su contexto, sus objetivos y su mercado, para luego diseñar estrategias personalizadas, realistas y sostenibles en el tiempo.</p>
                                <p>No se trata solo de crear contenido, sino de construir resultados.</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className={styles.actionArea}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block' }}
                        >
                            <a href="#contacto" className={styles.contactButton}>
                                Contáctanos
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                className={styles.footerAccent}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
            >
            </motion.div>
        </section>
    );
}
