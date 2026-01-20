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
};

// Comprehensive Theme Mapping per Section
// Comprehensive Theme Mapping per Section
const SECTION_THEME: { [key: string]: SectionTheme } = {
    'hero': {
        themeColor: 'var(--cyan-light)', // Keep as is or adapt if needed
        textColor: 'var(--text-navy)',
        shadowColor: 'var(--text-navy)'
    },
    'sobre': {
        themeColor: 'var(--bg-coral)', // Matching 'Contáctanos' button in AboutBody
        textColor: 'var(--text-navy)',
        shadowColor: 'var(--text-navy)'
    },
    'como-trabajamos': {
        themeColor: 'var(--pink-light)', // Matches Script Title & Card Shadow
        textColor: 'var(--pink-dark)',   // Matches Description & Card Border
        shadowColor: 'var(--pink-dark)'
    },
    'servicios': {
        themeColor: '#c1dcfd', // Light Blue (Matches Title/Button)
        textColor: '#7da1b9',  // Dark Blue (Matches Text/Border)
        shadowColor: '#7da1b9'
    },
    'portfolio': {
        themeColor: 'var(--orange-light)', // Matches "NUESTRO" Title
        textColor: 'var(--text-navy)',     // Matches Card Border/Text
        shadowColor: 'var(--text-navy)'
    },
    'faq': {
        themeColor: 'var(--text-yellow)',  // Matches "Frecuentes" hover / Accent
        textColor: 'var(--text-navy)',
        shadowColor: 'var(--text-navy)'
    },
    'manifesto': {
        themeColor: 'var(--text-yellow)',  // Matches Quote text
        textColor: 'var(--green-dark)',    // Contrast on white pill
        shadowColor: 'var(--green-dark)'
    },
    'contacto': {
        themeColor: 'var(--text-yellow)',
        textColor: 'var(--green-dark)',
        shadowColor: 'var(--green-dark)'
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
        transition: 'box-shadow 0.3s ease',
        border: '3px solid var(--text-navy)' // Adding border to match card style completely if desired? User just said shadow. 
        // Logic: The pill usually is white. Cards are white.
        // Let's keep the pill white background from CSS, just override shadow.
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
                        style={{ backgroundColor: headerProps.themeColor, transition: 'background-color 0.3s ease' }}
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
