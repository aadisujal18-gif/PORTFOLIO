const root = document.documentElement;
const themeButton = document.getElementById('themeBtn');
const themeIcon = themeButton.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('theme');

function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeIcon.textContent = isDark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    localStorage.setItem('theme', theme);
}

setTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeButton.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
});

const menuButton = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
    navMenu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    navMenu.classList.toggle('is-open', !isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
});

navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = `Portfolio message from ${name}`;
    const body = `Hi Aadi,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    const mailto = `mailto:aadisujal18@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = 'Your email app should open with the message ready to send. The message is not sent until you send it there.';
    window.location.href = mailto;
});
