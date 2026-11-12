const menuButton = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('#menu-principal');
const desktop = window.matchMedia('(min-width: 1024px)');

if (menuButton && menu) {
    document.documentElement.classList.add('js');
    menu.dataset.collapsible = 'true';
    menuButton.hidden = false;

    function setMenu(open) {
        menu.classList.toggle('is-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    menuButton.addEventListener('click', () => {
        setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;
        setMenu(false);
        const destination = document.querySelector(link.getAttribute('href'));
        if (destination) {
            destination.setAttribute('tabindex', '-1');
            destination.focus({ preventScroll: true });
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            setMenu(false);
            menuButton.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
    });

    desktop.addEventListener('change', () => setMenu(false));
}
