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

            /*themeButton.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                toggleThemeCheckbox.checked = isDark;
            });*/
			
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
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
				const seconds = now.getSeconds().toString().padStart(2, '0');
                clock.textContent = `${hours}:${minutes}:${seconds}`;
            }

            setInterval(updateClock, 1000);
            updateClock();

            // Event listeners for start menu and windows
            document.querySelector('.start-menu-icon').addEventListener('click', () => {
                const startMenu = document.querySelector('.start-menu');
                if (startMenu.classList.contains('active')) {
                    startMenu.classList.remove('active');
                    setTimeout(() => {
                        startMenu.style.display = 'none';
                    }, 300);
                } else {
                    startMenu.style.display = 'flex';
                    setTimeout(() => {
                        startMenu.classList.add('active');
                    }, 10);
                }
            });

            document.querySelectorAll('.desktop-icon-container, .start-menu-item, .taskbar-icon').forEach(icon => {
                icon.addEventListener('click', (e) => {
                    const windowId = e.currentTarget.getAttribute('data-window');
                    const targetWindow = document.getElementById(windowId);

                    // Close all open windows
                    document.querySelectorAll('.window').forEach(win => {
                        win.classList.remove('show');
                    });

                    // Remove active class from all icons
                    document.querySelectorAll('.desktop-icon-container').forEach(icon => {
                        icon.classList.remove('active');
                    });
					
					document.querySelectorAll('.taskbar-icon').forEach(icon => {
                        icon.classList.remove('active');
                    });

                    // Open the selected window
                    if (targetWindow) {
                        targetWindow.style.display = 'flex'; // Ensure the display is set before transitioning
                        setTimeout(() => {
                            targetWindow.classList.add('show');
                        }, 10);

                        // Highlight the selected icon
                        if (e.currentTarget.classList.contains('desktop-icon-container')) {
                            e.currentTarget.classList.add('active');
                        }
						if (e.currentTarget.classList.contains('taskbar-icon')) {
                            e.currentTarget.classList.add('active');
                        }
                    }
                });
            });

            document.querySelectorAll('.close-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const window = e.target.closest('.window');
                    window.classList.remove('show');
                    setTimeout(() => {
                        window.style.display = 'none';
                    }, 300);

                    // Remove active class from all icons
                    document.querySelectorAll('.desktop-icon-container').forEach(icon => {
                        icon.classList.remove('active');
                    });
					document.querySelectorAll('.taskbar-icon').forEach(icon => {
                        icon.classList.remove('active');
                    });
                });
            });

            // File manager functionality
            document.querySelectorAll('.file').forEach(file => {
                file.addEventListener('click', () => {
                    alert('File unavailable for viewing/editing!');
                });
            });

            // Dragging functionality for windows
            /*const windows = document.querySelectorAll('.window');
windows.forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent default text selection behavior
        isDragging = true;
        offsetX = e.clientX - win.getBoundingClientRect().left;
        offsetY = e.clientY - win.getBoundingClientRect().top;
        win.style.zIndex = 1000;
        document.body.classList.add('no-select'); // Add no-select class to body
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            win.style.left = `${e.clientX - offsetX}px`;
            win.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        win.style.zIndex = '';
        document.body.classList.remove('no-select'); // Remove no-select class from body
    });
});*/


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
			
            let percentage = 0;

            const interval = setInterval(() => {
                if (percentage < 100) {
                    percentage += Math.floor(Math.random() * 3) + 1; // Random increment to simulate real-time loading
                    if (percentage > 100) percentage = 100; // Ensure percentage doesn't exceed 100
                    percentageText.textContent = `${percentage}%`;
                } else {
                    clearInterval(interval);
                    bootScreen.classList.add('hidden');
                    setTimeout(() => {
                        bootScreen.style.display = 'none';
                    }, 1000);
                }
            }, 100); // Adjust the interval timing as needed
        });
