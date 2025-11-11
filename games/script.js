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
        const message = card.dataset.message || 'This game will be available soon.';

        card.addEventListener('click', (event) => {
            event.preventDefault();
            announce(message);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                announce(message);
            }
        });
    });
});
