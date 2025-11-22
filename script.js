// Spanish with Ignacio - Main JavaScript File

console.log("Welcome to Spanish with Ignacio! Script loaded correctly.");

const LANGUAGE_STORAGE_KEY = 'swi-language-preference';
const LANGUAGE_OPTIONS = {
    es: { label: 'Español', flag: '🇪🇸' },
    en: { label: 'English', flag: '🇬🇧' }
};

const textTranslations = {
    // Navigation
    'Home': 'Inicio',
    'Students': 'Estudiantes',
    'Teachers': 'Profesores',
    'Games': 'Juegos',
    'Guess the word': 'Adivina la palabra',

    // Home
    'Learn Spanish with Spanish With Ignacio!': '¡Aprende español con Spanish With Ignacio!',

    // Students main page
    'Resources for students': 'Recursos para estudiantes',
    'Select your level to access personalized activities and materials.': 'Selecciona tu nivel para acceder a actividades y materiales personalizados.',
    'Grammar 📘': 'Gramática 📘',
    'Vocabulary 🧠': 'Vocabulario 🧠',
    'Listening 🎧': 'Comprensión auditiva 🎧',
    'Reading 📖': 'Lectura 📖',
    'Writing ✍️': 'Escritura ✍️',

    // Students A1 Grammar
    'Present tense': 'Presente de indicativo',
    'Learn step by step how to talk about what you do each day, what you like, and simple things about yourself.': 'Aprende paso a paso a hablar de lo que haces cada día, lo que te gusta y detalles sencillos sobre ti.',
    'Reflexive verbs': 'Verbos reflexivos',
    'Discover why some verbs end in “se” and practice how to use them to say what you do for yourself.': 'Descubre por qué algunos verbos terminan en “se” y practica cómo usarlos para decir lo que haces por ti mismo.',
    'Direct object pronouns': 'Pronombres de objeto directo',
    'Learn to swap people or things for pronouns like lo and la so you can speak in a short, clear way.': 'Aprende a sustituir personas o cosas por pronombres como lo y la para hablar de forma breve y clara.',
    'Verb “gustar”': 'Verbo “gustar”',
    'Understand in a simple way how to use gustar to say what you like and what you do not, without complications.': 'Comprende de forma sencilla cómo usar gustar para decir lo que te gusta y lo que no, sin complicaciones.',

    // Students A1 Vocabulary
    'The alphabet': 'El abecedario',
    'Learn how to pronounce every letter of the Spanish alphabet and practice their order with guided activities.': 'Aprende a pronunciar cada letra del alfabeto español y practica su orden con actividades guiadas.',
    'Basic expressions to start talking': 'Expresiones básicas para empezar a hablar',
    'Discover greetings, farewells, and essential phrases to start conversations confidently from day one.': 'Descubre saludos, despedidas y frases esenciales para iniciar conversaciones con confianza desde el primer día.',
    'Countries and nationalities': 'Países y nacionalidades',
    'Match countries with their demonyms and practice introducing yourself and talking about others accurately.': 'Relaciona países con sus gentilicios y practica cómo presentarte y hablar de otras personas con precisión.',
    'Numbers (0-100)': 'Números (0-100)',
    'Review basic numbers with listening and writing exercises to talk about ages, prices, and quantities.': 'Repasa los números básicos con ejercicios de escucha y escritura para hablar de edades, precios y cantidades.',
    'Professions': 'Profesiones',
    'Expand your work vocabulary with visual flashcards and model phrases to talk about professions and workplaces.': 'Amplía tu vocabulario laboral con tarjetas visuales y frases modelo para hablar de profesiones y lugares de trabajo.',
    'The weather': 'El clima',
    'Practice common expressions to describe the weather and plan activities based on the temperature or season.': 'Practica expresiones comunes para describir el tiempo y planear actividades según la temperatura o la estación.',

    // Teachers page
    'Resources for teachers': 'Recursos para profesores',
    'Support your classes with ready-to-use activities, dynamic strategies, and digital tools created by Ignacio.': 'Apoya tus clases con actividades listas para usar, estrategias dinámicas y herramientas digitales creadas por Ignacio.',
    'Explore downloadable materials, activity ideas, and templates to keep your students motivated.': 'Explora materiales descargables, ideas de actividades y plantillas para mantener motivados a tus estudiantes.',
    'Lesson plans': 'Planes de clase',
    'Complete sequences with objectives, steps, and extra resources for every CEFR level.': 'Secuencias completas con objetivos, pasos y recursos adicionales para cada nivel del MCER.',
    'Interactive activities': 'Actividades interactivas',
    'Digital games, guided debates, and cooperative tasks ready to share with your groups.': 'Juegos digitales, debates guiados y tareas cooperativas listas para compartir con tus grupos.',
    'Printable material': 'Material imprimible',
    'Worksheets, vocabulary cards, and graphic organizers in PDF to print or edit.': 'Fichas, tarjetas de vocabulario y organizadores gráficos en PDF para imprimir o editar.',
    'Training': 'Formación',
    'Update your teaching skills with practical workshops and professional collaboration spaces.': 'Actualiza tus habilidades docentes con talleres prácticos y espacios de colaboración profesional.',
    'Live sessions': 'Sesiones en vivo',
    'Join monthly sessions with Ignacio to analyze real cases and share best practices.': 'Únete a sesiones mensuales con Ignacio para analizar casos reales y compartir buenas prácticas.',
    'More information': 'Más información',
    'Next session: "Designing activities for real communication." Includes a recording and downloadable materials.': 'Próxima sesión: "Diseñar actividades para la comunicación real". Incluye grabación y materiales descargables.',
    'Self-paced course': 'Curso a tu ritmo',
    'Advance at your own pace with modules on assessment, gamification, and effective feedback.': 'Avanza a tu propio ritmo con módulos sobre evaluación, gamificación y retroalimentación efectiva.',
    'Includes short videos, editable templates, and private forums to resolve questions with other teachers.': 'Incluye vídeos cortos, plantillas editables y foros privados para resolver dudas con otros docentes.',
    'Teaching community': 'Comunidad docente',
    'Share resources, organize class exchanges, and receive feedback from colleagues.': 'Comparte recursos, organiza intercambios de clase y recibe retroalimentación de colegas.',
    'Access a private space with monthly challenges, newsletters, and co-creation sessions for materials.': 'Accede a un espacio privado con retos mensuales, boletines y sesiones de cocreación de materiales.',

    // Games page
    'Interactive games': 'Juegos interactivos',
    'Practice your Spanish with digital activities designed for each level.': 'Practica tu español con actividades digitales diseñadas para cada nivel.',
    'Guess the Word': 'Adivina la palabra',
    'Challenge yourself with a Wordle-style game to grow your Spanish vocabulary level by level.': 'Rétate con un juego tipo Wordle para ampliar tu vocabulario de español nivel a nivel.',
    'The power of verbs!': '¡El poder de los verbos!',
    'Defend the kingdom by conjugating Spanish verbs and power up your hero with every correct answer.': 'Defiende el reino conjugando verbos en español y fortalece a tu héroe con cada respuesta correcta.',

    // Guess the Word index
    'Choose how you want to play': 'Elige cómo quieres jugar',
    'Daily puzzle': 'Reto diario',
    'Solve the challenge of the day by choosing your level and testing your vocabulary.': 'Resuelve el desafío del día eligiendo tu nivel y poniendo a prueba tu vocabulario.',
    'Play now': 'Jugar ahora',
    'Adventure mode': 'Modo aventura',
    'Advance through the map by completing challenges and unlocking new missions.': 'Avanza por el mapa completando desafíos y desbloqueando nuevas misiones.',
    'Explore the map': 'Explora el mapa',

    // Guess the Word daily
    'Beginner': 'Principiante',
    'Elementary': 'Elemental',
    'Intermediate': 'Intermedio',
    'Upper-Intermediate': 'Intermedio alto',
    'Advanced': 'Avanzado',
    'Proficient': 'Competente',
    'Available soon': 'Disponible pronto'
};

const titleTranslations = {
    'Spanish with Ignacio - Home': 'Spanish with Ignacio - Inicio',
    'Spanish with Ignacio - Students': 'Spanish with Ignacio - Estudiantes',
    'Spanish with Ignacio - Teachers': 'Spanish with Ignacio - Profesores',
    'Spanish with Ignacio - Games': 'Spanish with Ignacio - Juegos',
    'Adivina la Palabra - Spanish with Ignacio': 'Adivina la Palabra - Spanish with Ignacio',
    'Spanish with Ignacio - Adventure mode': 'Spanish with Ignacio - Modo aventura',
    'Spanish with Ignacio - Students A1 Grammar': 'Spanish with Ignacio - Estudiantes A1 Gramática',
    'Spanish with Ignacio - Students A1 Vocabulary': 'Spanish with Ignacio - Estudiantes A1 Vocabulario',
    'Spanish with Ignacio - Professions': 'Spanish with Ignacio - Profesiones',
    'Guess the Word - Game': 'Adivina la palabra - Juego'
};

const htmlTranslations = {
    'Learn to swap people or things for pronouns like <em>lo</em> and <em>la</em> so you can speak in a short, clear way.': 'Aprende a sustituir personas o cosas por pronombres como <em>lo</em> y <em>la</em> para hablar de forma breve y clara.'
};

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

function selectTranslatableElements() {
    const elements = new Set();
    translatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => elements.add(el));
    });
    return Array.from(elements);
}

function storeOriginalText(element) {
    if (!element.dataset.i18nEn) {
        element.dataset.i18nEn = element.textContent.trim();
    }
    if (!element.dataset.i18nEnHtml) {
        element.dataset.i18nEnHtml = element.innerHTML.trim();
    }
}

function translateElement(element, language) {
    const hasHtmlTranslation = element.hasAttribute('data-i18n-es-html');
    const storedHtml = element.dataset.i18nEnHtml || element.innerHTML.trim();
    const storedText = element.dataset.i18nEn || element.textContent.trim();

    if (language === 'es') {
        const dataHtml = element.dataset.i18nEsHtml;
        const dataText = element.dataset.i18nEs;
        const htmlKey = storedHtml;
        const textKey = storedText;
        const translatedHtml = dataHtml || htmlTranslations[htmlKey];
        const translatedText = dataText || textTranslations[textKey];

        if (translatedHtml) {
            element.innerHTML = translatedHtml;
        } else if (translatedText) {
            element.textContent = translatedText;
        }
    } else {
        // Default to English values
        if (hasHtmlTranslation || htmlTranslations[storedHtml]) {
            element.innerHTML = storedHtml;
        } else {
            element.textContent = storedText;
        }
    }
}

function applyLanguage(language) {
    const normalizedLang = language === 'es' ? 'es' : 'en';
    document.documentElement.lang = normalizedLang;
    const targets = selectTranslatableElements();
    targets.forEach(element => {
        storeOriginalText(element);
        translateElement(element, normalizedLang);
    });

    const titleElement = document.querySelector('title');
    if (titleElement) {
        if (!titleElement.dataset.i18nEnTitle) {
            titleElement.dataset.i18nEnTitle = titleElement.textContent.trim();
        }

        const spanishTitle = titleElement.dataset.i18nEs || titleTranslations[titleElement.dataset.i18nEnTitle];
        if (normalizedLang === 'es' && spanishTitle) {
            titleElement.textContent = spanishTitle;
        } else if (normalizedLang === 'en' && titleElement.dataset.i18nEnTitle) {
            titleElement.textContent = titleElement.dataset.i18nEnTitle;
        }
    }

    updateLanguageButtons(normalizedLang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLang);

    document.documentElement.removeAttribute('data-lang-initializing');
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
            applyLanguage(selectedLanguage);
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
    applyLanguage(savedLanguage);
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
