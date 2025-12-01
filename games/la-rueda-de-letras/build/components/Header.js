import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('es');
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
    const changeLang = (lang) => {
        setCurrentLang(lang);
        setIsLangOpen(false);
    };
    const LanguageSwitcher = ({ isMobile }) => (_jsxs("div", { className: `language-switcher language-switcher--${isMobile ? 'mobile' : 'desktop'}`, children: [_jsxs("button", { className: "language-switcher__button", type: "button", "aria-expanded": isLangOpen, onClick: (e) => { e.stopPropagation(); toggleLang(); }, children: [_jsx("span", { className: "language-switcher__flag", "aria-hidden": "true", children: currentLang === 'es' ? '🇪🇸' : '🇬🇧' }), _jsx("span", { className: "language-switcher__chevron", "aria-hidden": "true", children: "\u25BE" }), _jsx("span", { className: "language-switcher__sr-label", children: currentLang === 'es' ? 'Español' : 'English' })] }), isLangOpen && (_jsxs("div", { className: "language-switcher__menu", role: "listbox", style: { display: 'block' }, children: [_jsxs("button", { className: "language-switcher__option", type: "button", "aria-selected": currentLang === 'es', onClick: () => changeLang('es'), children: [_jsx("span", { className: "language-switcher__option-flag", "aria-hidden": "true", children: "\uD83C\uDDEA\uD83C\uDDF8" }), _jsx("span", { children: "Espa\u00F1ol" })] }), _jsxs("button", { className: "language-switcher__option", type: "button", "aria-selected": currentLang === 'en', onClick: () => changeLang('en'), children: [_jsx("span", { className: "language-switcher__option-flag", "aria-hidden": "true", children: "\uD83C\uDDEC\uD83C\uDDE7" }), _jsx("span", { children: "English" })] })] }))] }));
    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setIsLangOpen(false);
        if (isLangOpen)
            document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isLangOpen]);
    return (_jsx("header", { className: "main-header", children: _jsxs("div", { className: "header-container", children: [_jsxs("a", { href: "#", className: "logo", children: [_jsx("span", { className: "logo-main", children: "Spanish with" }), _jsx("span", { className: "logo-script", children: "Ignacio" })] }), _jsx(LanguageSwitcher, { isMobile: true }), _jsxs("button", { className: "menu-toggle", "aria-expanded": isMenuOpen, "aria-label": "Open navigation menu", onClick: toggleMenu, children: [_jsx("span", { className: "menu-toggle__bar", style: isMenuOpen ? { transform: 'rotate(45deg) translate(5px, 6px)' } : {} }), _jsx("span", { className: "menu-toggle__bar", style: isMenuOpen ? { opacity: 0 } : {} }), _jsx("span", { className: "menu-toggle__bar", style: isMenuOpen ? { transform: 'rotate(-45deg) translate(5px, -6px)' } : {} })] }), _jsx("nav", { className: `main-nav ${isMenuOpen ? 'open' : ''}`, id: "primary-navigation", children: _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { href: "#", className: "active", children: "Home" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Students" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Teachers" }) }), _jsx("li", { children: _jsx("a", { href: "#", children: "Games" }) }), _jsx("li", { className: "language-switcher--desktop-wrapper", children: _jsx(LanguageSwitcher, { isMobile: false }) })] }) })] }) }));
};
export default Header;
