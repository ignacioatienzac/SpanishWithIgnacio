import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es');

    // Close menu if window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleLang = () => setIsLangOpen(!isLangOpen);
    
    const changeLang = (lang: 'es' | 'en') => {
        setCurrentLang(lang);
        setIsLangOpen(false);
    };

    const LanguageSwitcher = ({ isMobile }: { isMobile: boolean }) => (
        <div className={`language-switcher language-switcher--${isMobile ? 'mobile' : 'desktop'}`}>
            <button 
                className="language-switcher__button" 
                type="button" 
                aria-expanded={isLangOpen}
                onClick={(e) => { e.stopPropagation(); toggleLang(); }}
            >
                <span className="language-switcher__flag" aria-hidden="true">{currentLang === 'es' ? '🇪🇸' : '🇬🇧'}</span>
                <span className="language-switcher__chevron" aria-hidden="true">▾</span>
                <span className="language-switcher__sr-label">{currentLang === 'es' ? 'Español' : 'English'}</span>
            </button>
            
            {isLangOpen && (
                <div 
                    className="language-switcher__menu" 
                    role="listbox" 
                    style={{ display: 'block' }}
                >
                    <button 
                        className="language-switcher__option" 
                        type="button" 
                        aria-selected={currentLang === 'es'}
                        onClick={() => changeLang('es')}
                    >
                        <span className="language-switcher__option-flag" aria-hidden="true">🇪🇸</span>
                        <span>Español</span>
                    </button>
                    <button 
                        className="language-switcher__option" 
                        type="button" 
                        aria-selected={currentLang === 'en'}
                        onClick={() => changeLang('en')}
                    >
                        <span className="language-switcher__option-flag" aria-hidden="true">🇬🇧</span>
                        <span>English</span>
                    </button>
                </div>
            )}
        </div>
    );

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setIsLangOpen(false);
        if (isLangOpen) document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isLangOpen]);

    return (
        <header className="main-header">
            <div className="header-container">
                <a href="#" className="logo">
                    <span className="logo-main">Spanish with</span>
                    <span className="logo-script">Ignacio</span>
                </a>

                {/* Mobile Language Switcher */}
                <LanguageSwitcher isMobile={true} />

                {/* Menu Toggle */}
                <button 
                    className="menu-toggle" 
                    aria-expanded={isMenuOpen} 
                    aria-label="Open navigation menu"
                    onClick={toggleMenu}
                >
                    <span className="menu-toggle__bar" style={isMenuOpen ? { transform: 'rotate(45deg) translate(5px, 6px)' } : {}}></span>
                    <span className="menu-toggle__bar" style={isMenuOpen ? { opacity: 0 } : {}}></span>
                    <span className="menu-toggle__bar" style={isMenuOpen ? { transform: 'rotate(-45deg) translate(5px, -6px)' } : {}}></span>
                </button>

                {/* Navigation */}
                <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`} id="primary-navigation">
                    <ul>
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#">Students</a></li>
                        <li><a href="#">Teachers</a></li>
                        <li><a href="#">Games</a></li>
                        
                        {/* Desktop Language Switcher placed inside nav as per design */}
                        <li className="language-switcher--desktop-wrapper">
                             <LanguageSwitcher isMobile={false} />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;