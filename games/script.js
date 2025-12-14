document.addEventListener('DOMContentLoaded', () => {
    const disabledCards = document.querySelectorAll('.game-card[data-state="disabled"]');
    const messageRegion = document.querySelector('[data-role="games-message"]');
    const DEFAULT_DISABLED_MESSAGE_KEY = 'games.disabled.unavailable';
    const GAME_TRANSLATIONS = {
        [DEFAULT_DISABLED_MESSAGE_KEY]: {
            en: 'This game will be available soon.',
            es: 'Este juego estará disponible pronto.',
        },
    };

    let hideTimeout;
    let activeMessageKey = null;

    function getCurrentLanguage() {
        return document.documentElement.lang === 'es' ? 'es' : 'en';
    }

    function translate(key) {
        const language = getCurrentLanguage();
        const entry = GAME_TRANSLATIONS[key];
        if (!entry) return key;
        return entry[language] || entry.en || key;
    }

    function renderActiveMessage() {
        if (!messageRegion || !activeMessageKey) return;
        messageRegion.textContent = translate(activeMessageKey);
    }

    function announce(messageKey) {
        if (!messageRegion) {
            return;
        }

        activeMessageKey = messageKey;
        messageRegion.textContent = translate(messageKey);
        messageRegion.classList.add('is-visible');

        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        hideTimeout = setTimeout(() => {
            messageRegion.classList.remove('is-visible');
            messageRegion.textContent = '';
            activeMessageKey = null;
        }, 4000);
    }

    disabledCards.forEach((card) => {
        const messageKey = card.dataset.messageKey || DEFAULT_DISABLED_MESSAGE_KEY;

        card.addEventListener('click', (event) => {
            event.preventDefault();
            announce(messageKey);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                announce(messageKey);
            }
        });
    });

    window.addEventListener('swi:languagechange', renderActiveMessage);
});
