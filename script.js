// Spanish with Ignacio - Main JavaScript File

console.log("Welcome to Spanish with Ignacio! Script loaded correctly.");

const LANGUAGE_STORAGE_KEY = 'swi-language-preference';
const LANGUAGE_DATA_URL = '/data/translations-es.json';
const LANGUAGE_OPTIONS = {
    es: { label: 'Español', flag: '🇪🇸' },
    en: { label: 'English', flag: '🇬🇧' }
};

let cachedSpanishTranslations = null;
let spanishTranslationsPromise = null;
let translatableElementsCache = null;

const translatableSelectors = [
    '[data-i18n-es]',
    '[data-i18n-es-html]',
    'h1',
    'h2',
    'h3',
    'h4',
    'p',
    'a',
    'button',
    '.page-hero__subtitle',
    '.resource-card__title',
    '.resource-card__description',
    '.teachers-card p',
    '.teachers-card h3',
    '.game-card__title',
    '.game-card__description',
    '.mode-card__header',
    '.mode-card__body p',
    '.mode-card__cta',
    '.level-button span'
];

async function loadSpanishTranslations() {
    if (cachedSpanishTranslations) return cachedSpanishTranslations;
    if (!spanishTranslationsPromise) {
        spanishTranslationsPromise = fetch(LANGUAGE_DATA_URL)
            .then(response => response.ok ? response.json() : { textTranslations: {}, titleTranslations: {}, htmlTranslations: {} })
            .catch(() => ({ textTranslations: {}, titleTranslations: {}, htmlTranslations: {} }))
            .then(data => {
                cachedSpanishTranslations = {
                    textTranslations: data.textTranslations || {},
                    titleTranslations: data.titleTranslations || {},
                    htmlTranslations: data.htmlTranslations || {}
                };
                return cachedSpanishTranslations;
            });
    }

    return spanishTranslationsPromise;
}

function getTranslatableElements() {
    if (translatableElementsCache) return translatableElementsCache;

    const elements = new Set();
    translatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => elements.add(el));
    });

    translatableElementsCache = Array.from(elements);
    return translatableElementsCache;
}

function storeOriginalText(element) {
    if (!element.dataset.i18nEn) {
        element.dataset.i18nEn = element.textContent.trim();
    }
    if (!element.dataset.i18nEnHtml) {
        element.dataset.i18nEnHtml = element.innerHTML.trim();
    }
}

function updateElementContent(element, content, useHtml = false) {
    if (useHtml) {
        if (element.innerHTML !== content) {
            element.innerHTML = content;
        }
        return;
    }

    if (element.textContent !== content) {
        element.textContent = content;
    }
}

function translateElement(element, language, translations) {
    const storedHtml = element.dataset.i18nEnHtml || element.innerHTML.trim();
    const storedText = element.dataset.i18nEn || element.textContent.trim();

    if (language === 'es') {
        const dataHtml = element.dataset.i18nEsHtml;
        const dataText = element.dataset.i18nEs;
        const translatedHtml = dataHtml || (translations.htmlTranslations && translations.htmlTranslations[storedHtml]);
        const translatedText = dataText || (translations.textTranslations && translations.textTranslations[storedText]);

        if (translatedHtml) {
            updateElementContent(element, translatedHtml, true);
        } else if (translatedText) {
            updateElementContent(element, translatedText);
        }
    } else {
        updateElementContent(element, storedHtml, true);
    }
}

async function applyLanguage(language) {
    const normalizedLang = language === 'es' ? 'es' : 'en';
    document.documentElement.lang = normalizedLang;
    try {
        const translations = normalizedLang === 'es'
            ? await loadSpanishTranslations()
            : { textTranslations: {}, htmlTranslations: {}, titleTranslations: {} };
        const targets = getTranslatableElements();

        targets.forEach(element => {
            storeOriginalText(element);
            translateElement(element, normalizedLang, translations);
        });

        const titleElement = document.querySelector('title');
        if (titleElement) {
            if (!titleElement.dataset.i18nEnTitle) {
                titleElement.dataset.i18nEnTitle = titleElement.textContent.trim();
            }

            const spanishTitle = titleElement.dataset.i18nEs || translations.titleTranslations[titleElement.dataset.i18nEnTitle];
            if (normalizedLang === 'es' && spanishTitle) {
                updateElementContent(titleElement, spanishTitle);
            } else if (normalizedLang === 'en' && titleElement.dataset.i18nEnTitle) {
                updateElementContent(titleElement, titleElement.dataset.i18nEnTitle);
            }
        }

        updateLanguageButtons(normalizedLang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLang);
    } finally {
        document.documentElement.removeAttribute('data-lang-initializing');
    }
}

function injectLanguageStyles() {
    if (document.getElementById('language-switcher-styles')) return;

    const style = document.createElement('style');
    style.id = 'language-switcher-styles';
    style.textContent = `
    .language-switcher { position: relative; }
    .language-switcher--mobile { display: none; }
    .language-switcher__button { display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; padding: 10px 14px; border-radius: 999px; border: none; background: linear-gradient(135deg, #ff8a00, #e52e71); cursor: pointer; font-weight: 700; color: #ffffff; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12); min-height: 38px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .language-switcher__button:focus-visible, .language-switcher__button:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16); }
    .language-switcher__icon { font-size: 1.05rem; line-height: 1; }
    .language-switcher__chevron { font-size: 0.8rem; color: rgba(255, 255, 255, 0.9); }
    .language-switcher__label, .language-switcher__flag { display: none; }
    .language-switcher__sr-label { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; white-space: nowrap; }
    .language-switcher__menu { position: absolute; top: calc(100% + 6px); left: 0; background: #ffffff; border-radius: 10px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12); padding: 6px; min-width: 160px; z-index: 20; display: none; }
    .language-switcher__menu[aria-hidden="false"] { display: block; }
    .language-switcher__option { width: 100%; padding: 10px 12px; border: none; background: transparent; display: flex; align-items: center; gap: 0.6rem; border-radius: 8px; cursor: pointer; color: #2c3e50; font-weight: 600; text-align: left; }
    .language-switcher__option[aria-selected="true"] { background: rgba(192, 57, 43, 0.16); }
    @media (max-width: 768px) {
      .language-switcher--desktop { display: none; }
      .language-switcher--mobile { display: block; margin-left: auto; order: 2; }
      .menu-toggle { order: 3; }
      .header-container { flex-wrap: nowrap; gap: 0.5rem; }
    }
    `;
    document.head.appendChild(style);
}

function createLanguageSwitcher(isMobile) {
    const switcher = document.createElement(isMobile ? 'div' : 'li');
    switcher.className = `language-switcher language-switcher--${isMobile ? 'mobile' : 'desktop'}`;

    const button = document.createElement('button');
    button.className = 'language-switcher__button';
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-haspopup', 'listbox');
    button.dataset.languageToggle = 'true';
    button.innerHTML = `<span class="language-switcher__icon" aria-hidden="true">🌐</span>
        <span class="language-switcher__chevron" aria-hidden="true">▾</span>
        <span class="language-switcher__sr-label">${LANGUAGE_OPTIONS.es.label}</span>`;

    const menu = document.createElement('div');
    menu.className = 'language-switcher__menu';
    menu.role = 'listbox';
    menu.setAttribute('aria-hidden', 'true');

    Object.entries(LANGUAGE_OPTIONS).forEach(([code, meta]) => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'language-switcher__option';
        option.dataset.languageOption = code;
        option.role = 'option';
        option.setAttribute('aria-selected', 'false');
        option.textContent = `${meta.flag} ${meta.label}`;
        menu.appendChild(option);
    });

    switcher.append(button, menu);
    return switcher;
}

function ensureLanguageSwitchers() {
    const headerContainer = document.querySelector('.header-container');
    const navList = document.querySelector('.main-nav ul');
    const menuToggle = document.querySelector('.menu-toggle');

    if (headerContainer && menuToggle && !headerContainer.querySelector('.language-switcher--mobile')) {
        const mobileSwitcher = createLanguageSwitcher(true);
        headerContainer.insertBefore(mobileSwitcher, menuToggle);
    }

    if (navList && !navList.querySelector('.language-switcher--desktop')) {
        const desktopSwitcher = createLanguageSwitcher(false);
        navList.insertBefore(desktopSwitcher, navList.firstElementChild);
    }
}

function renderLanguageButton(button, language) {
    const label = language === 'es' ? LANGUAGE_OPTIONS.es.label : LANGUAGE_OPTIONS.en.label;
    button.innerHTML = `<span class="language-switcher__icon" aria-hidden="true">🌐</span>
        <span class="language-switcher__chevron" aria-hidden="true">▾</span>
        <span class="language-switcher__sr-label">${label}</span>`;
    button.setAttribute('aria-label', `${label} language menu`);
}

function updateLanguageButtons(language) {
    const buttons = document.querySelectorAll('.language-switcher__button');
    const options = document.querySelectorAll('.language-switcher__option');

    buttons.forEach(button => {
        renderLanguageButton(button, language);
        button.setAttribute('aria-expanded', 'false');
        const menu = button.nextElementSibling;
        if (menu) {
            menu.setAttribute('aria-hidden', 'true');
        }
    });

    options.forEach(option => {
        option.setAttribute('aria-selected', option.dataset.languageOption === language ? 'true' : 'false');
    });
}

function setupLanguageSwitcher() {
    injectLanguageStyles();
    ensureLanguageSwitchers();
    const buttons = document.querySelectorAll('.language-switcher__button');
    const options = document.querySelectorAll('.language-switcher__option');

    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const menu = button.nextElementSibling;
            buttons.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                const siblingMenu = btn.nextElementSibling;
                if (siblingMenu) siblingMenu.setAttribute('aria-hidden', 'true');
            });
            button.setAttribute('aria-expanded', String(!isExpanded));
            if (menu) menu.setAttribute('aria-hidden', String(isExpanded));
            event.stopPropagation();
        });
    });

    options.forEach(option => {
        option.addEventListener('click', event => {
            const selectedLanguage = option.dataset.languageOption;
            applyLanguage(selectedLanguage).catch(error => console.error('Language switch failed', error));
            event.stopPropagation();
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.language-switcher')) {
            document.querySelectorAll('.language-switcher__button').forEach(button => button.setAttribute('aria-expanded', 'false'));
            document.querySelectorAll('.language-switcher__menu').forEach(menu => menu.setAttribute('aria-hidden', 'true'));
        }
    });

    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'es';
    applyLanguage(savedLanguage).catch(error => console.error('Initial language apply failed', error));
}

// Navigation toggle for mobile devices
function setupNavigationToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open') && window.innerWidth <= 768) {
                    mainNav.classList.remove('open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigationToggle();
    setupLanguageSwitcher();
});
