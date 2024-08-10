const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeSwitcher.textContent = body.classList.contains('dark') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
});
