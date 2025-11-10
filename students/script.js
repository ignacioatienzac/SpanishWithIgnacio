document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach((btn) => {
                const isActive = btn === button;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive.toString());
            });

            tabPanels.forEach((panel) => {
                const isTarget = panel.dataset.tabContent === targetTab;
                panel.classList.toggle('active', isTarget);
                panel.toggleAttribute('hidden', !isTarget);
            });
        });
    });

    document.querySelectorAll('.resource-card.active[href="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });
});
