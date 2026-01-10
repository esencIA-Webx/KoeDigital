"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerSection}>
            <div className={styles.container}>
                {/* Horizontal Layout: Logo | Divider | Info ... Socials */}

                <div className={styles.leftGroup}>
                    {/* Brand/Logo */}
                    <div className={styles.brandContainer}>
                        <Image
                            src="/koe-logo.png"
                            alt="Koe Digital"
                            width={100}
                            height={60}
                            className={styles.logoImage}
                        />
                    </div>

                    {/* Vertical Divider */}
                    <div className={styles.verticalDivider} />

                    {/* Contact Info */}
                    <div className={styles.contactInfo}>
                        <p className={styles.infoTitle}>KOE DIGITAL AGENCY</p>
                        <p>BUENOS AIRES, ARGENTINA</p>
                        <p>Transformando marcas con estrategia real</p>
                        <a href="mailto:hola@koedigital.com" className={styles.emailLink}>hola@koedigital.com</a>
                    </div>
                </div>

                {/* Social Icons (Right side) */}
                <div className={styles.socialContainer}>
                    <div className={styles.socialIcons}>
                        <a href="#" className={styles.iconLink} aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" className={styles.iconLink} aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="#" className={styles.iconLink} aria-label="Email">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
