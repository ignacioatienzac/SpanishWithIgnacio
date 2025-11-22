(function initializeLanguagePreference() {
    const savedLanguage = localStorage.getItem('swi-language-preference') || 'es';
    const normalizedLang = savedLanguage === 'es' ? 'es' : 'en';

    document.documentElement.lang = normalizedLang;
    document.documentElement.setAttribute('data-lang-initializing', 'true');
})();
