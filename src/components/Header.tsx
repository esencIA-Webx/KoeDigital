"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const LOGO_COLORS = [
    '#ffffff', // White (Default)
    'var(--pink-light)',
    'var(--pink-dark)',
    'var(--green-light)',
    'var(--green-dark)',
    'var(--cyan-light)',
    'var(--cyan-medium)',
    'var(--olive-light)',
    'var(--olive-dark)',
    'var(--orange-light)',
    'var(--orange-dark)',
];

type SectionTheme = {
    themeColor: string;     // Logo & Button Background
    textColor: string;      // Nav Links Text
    shadowColor: string;    // Navbar Shadow
    borderColor?: string;   // Navbar Border (Optional, defaults to shadowColor)
};

// Comprehensive Theme Mapping per Section
// Comprehensive Theme Mapping per Section
const SECTION_THEME: { [key: string]: SectionTheme } = {
    'hero': {
        themeColor: 'var(--orange-dark)', // Changed to orange as initial color
        textColor: 'var(--text-navy)',
        shadowColor: 'var(--text-navy)',
        borderColor: 'var(--text-navy)'
    },
    'sobre': {
        themeColor: 'var(--orange-dark)', // Changed to orange per user request
        textColor: 'var(--green-light)', // Changed to green for nav links
        shadowColor: 'var(--green-light)',
        borderColor: 'var(--green-light)'
    },
    'como-trabajamos': {
        themeColor: 'var(--pink-light)', // Matches Script Title & Card Shadow
        textColor: 'var(--pink-dark)',   // Matches Description & Card Border
        shadowColor: 'var(--pink-light)', // CHANGED: Matches Card Shadow (Light)
        borderColor: 'var(--pink-dark)'   // Matches Card Border
    },
    'servicios': {
        themeColor: '#c1dcfd', // Light Blue (Matches Title/Button)
        textColor: '#7da1b9',  // Dark Blue (Matches Text/Border)
        shadowColor: '#7da1b9',
        borderColor: '#7da1b9'
    },
    'portfolio': {
        themeColor: 'var(--orange-light)', // Matches "NUESTRO" Title
        textColor: '#1D3557',     // Matches Card Border/Text
        shadowColor: '#1D3557',   // CHANGED: Matches Card Shadow (Dark Blue)
        borderColor: '#1D3557'    // CHANGED: Matches Card Border
    },
    'faq': {
        themeColor: 'var(--text-yellow)',  // Matches "Frecuentes" hover / Accent
        textColor: 'var(--text-navy)',
        shadowColor: 'var(--text-navy)',
        borderColor: 'var(--text-navy)'
    },
    'manifesto': {
        themeColor: 'var(--text-yellow)',  // Matches Quote text
        textColor: 'var(--green-dark)',    // Contrast on white pill
        shadowColor: 'var(--green-light)', // CHANGED: Matches Card Shadow (Light Green)
        borderColor: 'var(--green-light)'  // CHANGED: Matches Card Border
    },
    'contacto': {
        themeColor: 'var(--text-yellow)',
        textColor: 'var(--green-dark)',
        shadowColor: 'var(--text-navy)', // CHANGED: Matches Icon Borders
        borderColor: 'var(--text-navy)'  // CHANGED: Matches Icon Borders
    },
};

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    // Default to Hero theme
    const [headerProps, setHeaderProps] = useState<SectionTheme>(SECTION_THEME['hero']);

    const observerRef = useRef<IntersectionObserver | null>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Click Logic: Rotate ONLY the themeColor (Logo/Button) manually
    // Text and Shadow remain synced to section to maintain readability/context
    const handleLogoClick = (e: React.MouseEvent) => {
        const currentIndex = LOGO_COLORS.indexOf(headerProps.themeColor);
        const nextIndex = (currentIndex + 1) % LOGO_COLORS.length;

        setHeaderProps(prev => ({
            ...prev,
            themeColor: LOGO_COLORS[nextIndex]
        }));
    };

    // Scroll Logic: Intersection Observer
    useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const newTheme = SECTION_THEME[sectionId];
                    if (newTheme) {
                        setHeaderProps(newTheme);
                    }
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        });

        // Observe all sections
        const sections = Object.keys(SECTION_THEME);
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el && observerRef.current) {
                observerRef.current.observe(el);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Link Styles synced with state
    const linkStyle = { color: headerProps.textColor, transition: 'color 0.3s ease' };

    // Navbar Container Style (Dynamic Shadow)
    const containerStyle = {
        boxShadow: `4px 4px 0px ${headerProps.shadowColor}`,
        transition: 'all 0.3s ease',
        border: `3px solid ${headerProps.borderColor || headerProps.shadowColor}` // Dynamic Border
    };

    // Desktop Items
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
            <div className={styles.pillContainer} style={containerStyle}>

                {/* Left Nav (Desktop) */}
                <nav className={`${styles.navGroup} ${styles.leftNav}`}>
                    {leftItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={styles.navLink}
                            style={linkStyle}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className={styles.squiggle} aria-hidden />
                </nav>

                {/* Center Logo */}
                <div className={styles.logoContainer}>
                    <Link
                        href="/"
                        className={styles.circleLogo}
                        onClick={handleLogoClick}
                        style={{ position: 'relative' }}
                    >
                        {/* Invisible Original */}
                        <Image
                            src="/koe-logo.png"
                            alt="Koe Digital"
                            width={80}
                            height={50}
                            className={styles.logoImage}
                            style={{ opacity: 0 }}
                        />
                        {/* Masked Color Overlay */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: headerProps.themeColor,
                                maskImage: 'url(/koe-logo.png)',
                                WebkitMaskImage: 'url(/koe-logo.png)',
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                transition: 'background-color 0.3s ease',
                                pointerEvents: 'none',
                                filter: 'drop-shadow(1px 0 0 black) drop-shadow(-1px 0 0 black) drop-shadow(0 1px 0 black) drop-shadow(0 -1px 0 black)'
                            }}
                        />
                    </Link>
                </div>

                {/* Right Nav (Desktop) */}
                <nav className={`${styles.navGroup} ${styles.rightNav}`}>
                    <div className={styles.squiggle} aria-hidden />
                    {rightItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={styles.navLink}
                            style={linkStyle}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="#contacto"
                        className={styles.contactBtn}
                        style={{
                            backgroundColor: headerProps.themeColor,
                            transition: 'all 0.3s ease',
                            border: `2px solid ${headerProps.borderColor || headerProps.shadowColor}`, // Dynamic Border
                            boxShadow: `5px 5px 0px ${headerProps.borderColor || headerProps.shadowColor}` // Dynamic Shadow
                        }}
                    >
                        Contacto
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={toggleMenu}
                    aria-label="Menu"
                    style={{ backgroundColor: headerProps.themeColor, transition: 'background-color 0.3s ease' }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* Mobile Drawer */}
            <div className={`${styles.mobileDrawer} ${isOpen ? styles.open : ''}`}>
                {[...leftItems, ...rightItems].map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={styles.mobileLink}
                        onClick={() => setIsOpen(false)}
                        style={{ color: headerProps.textColor }}
                    >
                        {item.name}
                    </Link>
                ))}
                <Link
                    href="#contacto"
                    className={styles.contactBtn}
                    onClick={() => setIsOpen(false)}
                    style={{ backgroundColor: headerProps.themeColor, transition: 'background-color 0.3s ease' }}
                >
                    Contacto
                </Link>
            </div>
        </header>
    );
}
