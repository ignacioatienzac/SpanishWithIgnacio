// Spanish with Ignacio - Main JavaScript File

// This console log will show up in the browser's developer tools to confirm the script is loaded.
console.log("¡Bienvenido a Español con Ignacio! Script loaded correctly.");

// Navigation toggle for mobile devices
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
