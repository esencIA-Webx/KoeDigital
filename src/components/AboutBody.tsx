"use client";

import { motion } from 'framer-motion';
import styles from './About.module.css';
import ScrollPop from './ScrollPop';
import AnimatedTitle from './AnimatedTitle';

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
                    {/* Mobile Layout: 3 Split Cards */}
                    <div className={styles.mobileOnly}>
                        {/* Card 1: Mission (Short Paragraph) */}
                        <ScrollPop
                            className={styles.presentationCard}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                            delay={0.2}
                        >
                            <div className={styles.brandContent}>
                                <p>
                                    Somos una agencia de marketing digital que acompaña a marcas, emprendedores y negocios en el desarrollo de su comunicación, estrategia y presencia digital.
                                </p>
                            </div>
                        </ScrollPop>

                        {/* Card 2: Agency Description Part 1 */}
                        <ScrollPop
                            className={styles.presentationCard}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                            delay={0.3}
                        >
                            <div className={styles.brandContent}>
                                <p>El trabajo en KOE parte siempre del entendimiento profundo del negocio, su contexto, sus objetivos y su mercado, para luego diseñar <AnimatedTitle
                                    text="estrategias personalizadas, realistas y sostenibles en el tiempo"
                                    as="span"
                                    style={{ fontWeight: '800', display: 'inline-block' }}
                                    hoverColor="var(--orange-dark)"
                                />.</p>
                            </div>
                        </ScrollPop>

                        {/* Card 3: Agency Description Part 2 */}
                        <ScrollPop
                            className={styles.presentationCard}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                            delay={0.4}
                        >
                            <div className={styles.brandContent}>
                                <p>No se trata solo de crear contenido, sino de <AnimatedTitle
                                    text="construir resultados"
                                    as="span"
                                    style={{ fontWeight: '800', display: 'inline-block' }}
                                    hoverColor="var(--orange-dark)"
                                />.</p>
                            </div>
                        </ScrollPop>
                    </div>

                    {/* Desktop Layout: 1 Unified Card */}
                    <div className={styles.desktopOnly}>
                        <ScrollPop
                            className={styles.presentationCard}
                            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                            delay={0.2}
                        >
                            <div className={styles.brandContent}>
                                <p>
                                    Somos una agencia de marketing digital que acompaña a marcas, emprendedores y negocios en el desarrollo de su comunicación, estrategia y presencia digital.
                                </p>
                                <p>
                                    El trabajo en KOE parte siempre del entendimiento profundo del negocio, su contexto, sus objetivos y su mercado, para luego diseñar <AnimatedTitle
                                        text="estrategias personalizadas, realistas y sostenibles en el tiempo"
                                        as="span"
                                        style={{ fontWeight: '800', display: 'inline-block' }}
                                        hoverColor="var(--orange-dark)"
                                    />.
                                </p>
                                <p>
                                    No se trata solo de crear contenido, sino de <AnimatedTitle
                                        text="construir resultados"
                                        as="span"
                                        style={{ fontWeight: '800', display: 'inline-block' }}
                                        hoverColor="var(--orange-dark)"
                                    />.
                                </p>
                            </div>
                        </ScrollPop>
                    </div>

                    <div
                        className={styles.actionArea}
                    >
                        <ScrollPop
                            delay={0.5}
                            animate={{
                                y: [0, -8, 0],
                                rotate: 0
                            }}
                            transition={{
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2 // Offset
                                },
                                rotate: { duration: 0 }
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 0,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'inline-block' }}
                        >
                            <a href="#contacto" className={styles.contactButton}>
                                Contáctanos
                            </a>
                        </ScrollPop>
                    </div>
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
        </section >
    );
}
