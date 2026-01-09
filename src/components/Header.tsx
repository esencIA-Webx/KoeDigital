"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Split items for desktop
    const leftItems = [
        { name: 'Sobre Koe', href: '#sobre' },
        { name: 'Cómo trabajamos', href: '#como-trabajamos' },
    ];

    const rightItems = [
        { name: 'Servicios', href: '#servicios' },
        { name: 'Portfolio', href: '#portfolio' },
    ];

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.pillContainer}>

                {/* Left Nav (Desktop) */}
                <nav className={`${styles.navGroup} ${styles.leftNav}`}>
                    {leftItems.map((item) => (
                        <Link key={item.name} href={item.href} className={styles.navLink}>
                            {item.name}
                        </Link>
                    ))}
                    <div className={styles.squiggle} aria-hidden />
                </nav>

                {/* Center Logo */}
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.circleLogo}>
                        <Image
                            src="/koe-logo.png"
                            alt="Koe Digital"
                            width={80}
                            height={50}
                            className={styles.logoImage}
                        />
                    </Link>
                </div>

                {/* Right Nav (Desktop) */}
                <nav className={`${styles.navGroup} ${styles.rightNav}`}>
                    <div className={styles.squiggle} aria-hidden />
                    {rightItems.map((item) => (
                        <Link key={item.name} href={item.href} className={styles.navLink}>
                            {item.name}
                        </Link>
                    ))}
                    <Link href="#contacto" className={styles.contactBtn}>
                        Contacto
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Drawer */}
                <div className={`${styles.mobileDrawer} ${isOpen ? styles.open : ''}`}>
                    {[...leftItems, ...rightItems].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={styles.mobileLink}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#contacto"
                        className={styles.contactBtn}
                        onClick={() => setIsOpen(false)}
                    >
                        Contacto
                    </Link>
                </div>

            </div>
        </header>
    );
}
