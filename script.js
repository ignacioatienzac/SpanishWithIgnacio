// Spanish with Ignacio - Main JavaScript File

console.log("Welcome to Spanish with Ignacio! Script loaded correctly.");

const LANGUAGE_STORAGE_KEY = 'swi-language-preference';
const LANGUAGE_DATA_URL = '/data/translations-es.json';
const LANGUAGE_OPTIONS = {
    es: { label: 'Español', flag: '🇪🇸' },
    en: { label: 'English', flag: '🇬🇧' }
};

const ACCOUNT_COPY = {
    en: {
        loggedOut: {
            button: 'My account',
            options: [
                { label: 'Sign up', action: 'signup' },
                { label: 'Sign in', action: 'signin' }
            ]
        },
        loggedIn: {
            button: 'My account',
            options: [
                { label: 'See my account', action: 'see-account' },
                { label: 'Choose my avatar', action: 'choose-avatar' },
                { label: 'Sign out', action: 'sign-out' }
            ]
        }
    },
    es: {
        loggedOut: {
            button: 'Mi cuenta',
            options: [
                { label: 'Registrarse', action: 'signup' },
                { label: 'Iniciar sesión', action: 'signin' }
            ]
        },
        loggedIn: {
            button: 'Mi cuenta',
            options: [
                { label: 'Ver mi cuenta', action: 'see-account' },
                { label: 'Elegir mi avatar', action: 'choose-avatar' },
                { label: 'Cerrar sesión', action: 'sign-out' }
            ]
        }
    }
};

let cachedSpanishTranslations = null;
let spanishTranslationsPromise = null;
let translatableElementsCache = null;
let currentLanguage = document.documentElement.lang === 'en' ? 'en' : 'es';
let firebaseModulePromise = null;
let accountMenus = [];
let currentUser = null;

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

function getFirebaseModule() {
    if (!firebaseModulePromise) {
        firebaseModulePromise = import('/firebase-config.js').catch(error => {
            console.error('Unable to load Firebase configuration', error);
            return null;
        });
    }

    return firebaseModulePromise;
}

function getUserInitial(user) {
    if (!user) return '+';
    const source = user.displayName || user.email || '';
    return source.trim().charAt(0).toUpperCase() || '+';
}

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

    const combinedSelector = translatableSelectors.join(',');
    const uniqueElements = Array.from(new Set(document.querySelectorAll(combinedSelector)));

    translatableElementsCache = uniqueElements.filter((element, _, collection) => {
        const isCardElement = element.closest('.game-card') || element.closest('.mode-card');

        if (isCardElement) {
            return true;
        }

        return !collection.some(other => other !== element && other.contains(element));
    });
    return translatableElementsCache;
}

function createAccountMenuWrapper(isMobile) {
    const element = document.createElement(isMobile ? 'div' : 'li');
    element.className = `account-menu account-menu--${isMobile ? 'mobile' : 'desktop'}`;
    element.dataset.accountMenu = isMobile ? 'mobile' : 'desktop';
    return element;
}

function ensureAccountMenuSlots() {
    const headerContainer = document.querySelector('.header-container');
    const navList = document.querySelector('.main-nav ul');

    if (headerContainer && !headerContainer.querySelector('[data-account-menu="mobile"]')) {
        const mobileMenu = createAccountMenuWrapper(true);
        const menuToggle = headerContainer.querySelector('.menu-toggle');
        headerContainer.insertBefore(mobileMenu, menuToggle || headerContainer.lastElementChild?.nextSibling || null);
    }

    if (navList && !navList.querySelector('[data-account-menu="desktop"]')) {
        const desktopMenu = createAccountMenuWrapper(false);
        navList.appendChild(desktopMenu);
    }
}

function closeAccountMenus() {
    accountMenus.forEach(menu => {
        menu.button.setAttribute('aria-expanded', 'false');
        menu.dropdown.setAttribute('aria-hidden', 'true');
    });
}

function buildDropdownOptions(menu, copy) {
    menu.dropdown.innerHTML = '';

    copy.options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'account-menu__option';
        optionButton.dataset.accountAction = option.action;
        optionButton.textContent = option.label;
        optionButton.addEventListener('click', event => {
            event.stopPropagation();
            handleAccountAction(option.action);
            closeAccountMenus();
        });
        menu.dropdown.appendChild(optionButton);
    });
}

function renderAccountMenu(menu) {
    const stateCopy = currentUser ? ACCOUNT_COPY[currentLanguage].loggedIn : ACCOUNT_COPY[currentLanguage].loggedOut;
    menu.button.setAttribute('aria-label', stateCopy.button);
    menu.label.textContent = stateCopy.button;

    if (currentUser) {
        menu.badge.textContent = getUserInitial(currentUser);
        menu.badge.removeAttribute('aria-hidden');
        menu.button.classList.add('account-menu__button--authenticated');
    } else {
        menu.badge.textContent = '+';
        menu.badge.setAttribute('aria-hidden', 'true');
        menu.button.classList.remove('account-menu__button--authenticated');
    }

    buildDropdownOptions(menu, stateCopy);
}

function renderAllAccountMenus() {
    accountMenus.forEach(renderAccountMenu);
}

function handleAccountAction(action) {
    if (action === 'sign-out') {
        getFirebaseModule()
            .then(module => module?.signOutUser?.())
            .catch(error => console.error('Sign out failed', error));
        return;
    }

    if (action === 'signup' || action === 'signin') {
        window.location.href = action === 'signup' ? '/registro.html' : '/ingresar.html';
        return;
    }

    // Placeholder actions for upcoming features
    if (action === 'see-account' || action === 'choose-avatar') {
        console.info(`Action ${action} will be implemented soon.`);
    }
}

function createAccountMenu(element) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'account-menu__button';
    button.setAttribute('aria-expanded', 'false');

    const badge = document.createElement('span');
    badge.className = 'account-menu__badge';
    badge.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.className = 'account-menu__label';

    const chevron = document.createElement('span');
    chevron.className = 'account-menu__chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '▾';

    button.appendChild(badge);
    button.appendChild(label);
    button.appendChild(chevron);

    const dropdown = document.createElement('div');
    dropdown.className = 'account-menu__dropdown';
    dropdown.setAttribute('aria-hidden', 'true');

    button.addEventListener('click', event => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        closeAccountMenus();
        button.setAttribute('aria-expanded', String(!isExpanded));
        dropdown.setAttribute('aria-hidden', String(isExpanded));
        event.stopPropagation();
    });

    element.appendChild(button);
    element.appendChild(dropdown);

    const menuRecord = { root: element, button, badge, label, dropdown };
    accountMenus.push(menuRecord);
    renderAccountMenu(menuRecord);
}

function setupAccountMenus() {
    ensureAccountMenuSlots();
    const menuElements = document.querySelectorAll('[data-account-menu]');
    menuElements.forEach(element => {
        if (!accountMenus.some(menu => menu.root === element)) {
            createAccountMenu(element);
        }
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('[data-account-menu]')) {
            closeAccountMenus();
        }
    });
}

function observeAuthChanges() {
    getFirebaseModule().then(module => {
        if (!module?.onAuthChange) return;
        module.onAuthChange(user => {
            currentUser = user;
            renderAllAccountMenus();
        });
    });
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
    const isSameLanguage = document.documentElement.lang === normalizedLang;

    if (isSameLanguage && !document.documentElement.hasAttribute('data-lang-initializing')) {
        updateLanguageButtons(normalizedLang);
        currentLanguage = normalizedLang;
        renderAllAccountMenus();
        return;
    }
    document.documentElement.lang = normalizedLang;
    currentLanguage = normalizedLang;
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
        renderAllAccountMenus();
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
    .language-switcher__button { display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem; padding: 10px 14px; border-radius: 999px; border: none; background: linear-gradient(145deg, #f2f4f7, #d9dde3); cursor: pointer; font-weight: 700; color: #1f2933; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08); min-height: 38px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .language-switcher__button:focus-visible, .language-switcher__button:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12); }
    .language-switcher__icon { font-size: 1.05rem; line-height: 1; }
    .language-switcher__chevron { font-size: 0.8rem; color: rgba(47, 60, 71, 0.85); }
    .language-switcher__label { display: none; }
    .language-switcher__flag { display: inline-flex; font-size: 1.3rem; line-height: 1; }
    .language-switcher__sr-label { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; white-space: nowrap; }
    .language-switcher__menu { position: absolute; top: calc(100% + 6px); left: 0; background: linear-gradient(145deg, #f2f4f7, #d9dde3); border-radius: 10px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); padding: 8px 10px; min-width: 160px; z-index: 20; display: none; }
    .language-switcher__menu[aria-hidden="false"] { display: block; }
    .language-switcher__option { width: 100%; padding: 10px 12px; border: none; background: transparent; display: flex; align-items: center; justify-content: center; gap: 0.35rem; border-radius: 8px; cursor: pointer; color: #1f2933; font-weight: 700; text-align: center; }
    .language-switcher__option:hover, .language-switcher__option:focus-visible { background: rgba(31, 41, 51, 0.06); }
    .language-switcher__option[aria-selected="true"] { background: rgba(31, 41, 51, 0.12); }
    .language-switcher__option-flag { font-size: 1.5rem; line-height: 1; }
    @media (min-width: 769px) {
      .language-switcher--desktop .language-switcher__button { background: linear-gradient(135deg, #f2f4f7, #d9dde3); color: #1f2933; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); }
      .language-switcher--desktop .language-switcher__menu { background: linear-gradient(135deg, #f2f4f7, #d9dde3); }
    }
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
    button.innerHTML = `<span class="language-switcher__flag" aria-hidden="true">${LANGUAGE_OPTIONS.es.flag}</span>
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
        option.setAttribute('aria-label', meta.label);
        option.innerHTML = `<span class="language-switcher__option-flag" aria-hidden="true">${meta.flag}</span>
            <span class="language-switcher__sr-label">${meta.label}</span>`;
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
        navList.appendChild(desktopSwitcher);
    }
}

function renderLanguageButton(button, language) {
    const meta = language === 'es' ? LANGUAGE_OPTIONS.es : LANGUAGE_OPTIONS.en;
    button.innerHTML = `<span class="language-switcher__flag" aria-hidden="true">${meta.flag}</span>
        <span class="language-switcher__chevron" aria-hidden="true">▾</span>
        <span class="language-switcher__sr-label">${meta.label}</span>`;
    button.setAttribute('aria-label', `${meta.label} language menu`);
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
    setupAccountMenus();
    setupNavigationToggle();
    setupLanguageSwitcher();
    observeAuthChanges();
});
