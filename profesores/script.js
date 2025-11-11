document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.training-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const details = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            toggle.setAttribute('aria-expanded', String(!isExpanded));
            details.hidden = isExpanded;
        });
    });
});
