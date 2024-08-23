document.addEventListener('DOMContentLoaded', () => {
            const musicButton = document.querySelector('.music-button');
            const toggleThemeCheckbox = document.getElementById('toggle-theme');
			const backgroundMusic = document.getElementById('background-music');
			const toggleMusicCheckbox = document.getElementById('toggle-music');
			const musicIcon = document.getElementById('musicIcon');
			
			
            // Check and apply theme from local storage
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-theme');
                toggleThemeCheckbox.checked = true;
            }

			musicButton.addEventListener('click', () => {
                if (toggleMusicCheckbox.checked) {
					toggleMusicCheckbox.checked = false;
					musicIcon.classList.remove('fa-pause');
					musicIcon.classList.add('fa-music');
					backgroundMusic.pause();
                } else {
					toggleMusicCheckbox.checked = true;
					musicIcon.classList.remove('fa-music');
					musicIcon.classList.add('fa-pause');
					backgroundMusic.play();
				}
            });

            // Initialize clock
            function updateClock() {
				const clock = document.querySelector('.taskbar-clock');
				const now = new Date();
				clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            setInterval(updateClock, 1000);
            updateClock();

            // Event listeners for start menu and windows
           document.querySelector('.start-menu-icon').addEventListener('click', () => {
    const startMenu = document.querySelector('.start-menu');
    const startMenuIcon = document.querySelector('.start-menu-icon');

    if (startMenu.classList.contains('active')) {
        startMenu.classList.remove('active');
        setTimeout(() => {
            startMenu.style.display = 'none';
        }, 300);
    } else {
        startMenu.style.display = 'flex';
        startMenu.style.left = `${startMenuIcon.getBoundingClientRect().left}px`; // Set the left position of the start menu
        setTimeout(() => {
            startMenu.classList.add('active');
        }, 10);
    }
});

document.querySelectorAll('.desktop-icon-container, .start-menu-item, .taskbar-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const windowId = e.currentTarget.getAttribute('data-window');
        const targetWindow = document.getElementById(windowId);

        // Close all open windows and deactivate all icons
        document.querySelectorAll('.window').forEach(win => {
            win.classList.remove('show');
        });
        document.querySelectorAll('.desktop-icon-container, .taskbar-icon').forEach(icon => {
            icon.classList.remove('active');
        });

        // Open the selected window
        if (targetWindow) {
            targetWindow.style.display = 'flex';
            setTimeout(() => {
                targetWindow.classList.add('show');
            }, 10);

            // Highlight the selected icon
            if (e.currentTarget.classList.contains('desktop-icon-container')) {
                e.currentTarget.classList.add('active');
            }
            // Activate corresponding taskbar icon
            const taskbarIcon = document.querySelector(`.taskbar-icon[data-window="${windowId}"]`);
            if (taskbarIcon) {
                taskbarIcon.classList.add('active');
            }
        }
    });
});

document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const window = e.target.closest('.window');
        const windowId = window.id;
        window.classList.remove('show');
        setTimeout(() => {
            window.style.display = 'none';
        }, 300);

        // Remove active class from all icons
        document.querySelectorAll('.desktop-icon-container, .taskbar-icon').forEach(icon => {
            icon.classList.remove('active');
        });
    });
});
            // File manager functionality
            document.querySelectorAll('.file').forEach(file => {
                file.addEventListener('click', () => {
                    alert('Folder currently unavailable for viewing!');
                });
            });

            // Settings window functionality
            toggleThemeCheckbox.addEventListener('change', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });

            toggleMusicCheckbox.addEventListener('change', () => {
                if (toggleMusicCheckbox.checked) {
                    backgroundMusic.play();
					musicIcon.classList.remove('fa-music');
					musicIcon.classList.add('fa-pause');
                } else {
                    backgroundMusic.pause();
					musicIcon.classList.remove('fa-pause');
					musicIcon.classList.add('fa-music');
                }
            });
        });
		
			document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.querySelector('.boot-screen');
    const percentageText = bootScreen.querySelector('.percentage');
    const assetList = document.querySelector('.asset-list');
    const assets = [...assetList.querySelectorAll('img'), ...assetList.querySelectorAll('script')];
    
    let loadedAssets = 0;
    const totalAssets = assets.length;
    const startTime = Date.now();
    const minLoadTime = 0; // 5 seconds in milliseconds

    function updateLoading() {
        loadedAssets++;
        const percentage = Math.round((loadedAssets / totalAssets) * 100);
        percentageText.textContent = `${percentage}%`;

        if (loadedAssets === totalAssets) {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            if (elapsedTime >= minLoadTime) {
                hideBootScreen();
            } else {
                const remainingTime = minLoadTime - elapsedTime;
                setTimeout(hideBootScreen, remainingTime);
            }
        }
    }

    function hideBootScreen() {
        bootScreen.classList.add('hidden');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 1000);
    }

    assets.forEach(asset => {
        if (asset.tagName === 'IMG') {
            if (asset.complete) {
                updateLoading();
            } else {
                asset.addEventListener('load', updateLoading);
                asset.addEventListener('error', updateLoading);
            }
        } else if (asset.tagName === 'SCRIPT') {
            asset.addEventListener('load', updateLoading);
            asset.addEventListener('error', updateLoading);
        }
    });

    // Ensure the loading screen stays for at least 5 seconds
    setTimeout(() => {
        if (loadedAssets < totalAssets) {
            const percentage = Math.round((loadedAssets / totalAssets) * 100);
            percentageText.textContent = `${percentage}%`;
        }
    }, minLoadTime);
});
