// Hide the loading screen after 2 seconds
setTimeout(() => {
  document.querySelector('.loading-screen').style.display = 'none';
}, 2000);

const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark');
    themeSwitcher.textContent = body.classList.contains('dark') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
});
