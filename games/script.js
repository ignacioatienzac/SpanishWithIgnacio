document.addEventListener('DOMContentLoaded', () => {
    const disabledCards = document.querySelectorAll('.game-card[data-state="disabled"]');
    const messageRegion = document.querySelector('[data-role="games-message"]');
    let hideTimeout;

    function announce(message) {
        if (!messageRegion) {
            return;
        }

        messageRegion.textContent = message;
        messageRegion.classList.add('is-visible');

        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        hideTimeout = setTimeout(() => {
            messageRegion.classList.remove('is-visible');
            messageRegion.textContent = '';
        }, 4000);
    }

    disabledCards.forEach((card) => {
        const englishMessage = card.dataset.message || 'This game will be available soon.';
        const spanishMessage = card.dataset.messageEs || englishMessage;

        card.addEventListener('click', (event) => {
            event.preventDefault();
            const language = document.documentElement.lang === 'es' ? 'es' : 'en';
            const message = language === 'es' ? spanishMessage : englishMessage;
            announce(message);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const language = document.documentElement.lang === 'es' ? 'es' : 'en';
                const message = language === 'es' ? spanishMessage : englishMessage;
                announce(message);
            }
        });
    });
});
