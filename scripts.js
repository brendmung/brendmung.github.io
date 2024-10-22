document.addEventListener('DOMContentLoaded', () => {
    const musicButton = document.querySelector('.music-button');
    const toggleThemeCheckbox = document.getElementById('toggle-theme');
    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicCheckbox = document.getElementById('toggle-music');
    const musicIcon = document.getElementById('musicIcon');
    const bootScreen = document.querySelector('.boot-screen');
    const percentageText = bootScreen.querySelector('.percentage');
    const assetList = document.querySelector('.asset-list');
    const assets = [...assetList.querySelectorAll('img'), ...assetList.querySelectorAll('script')];
    const startMenuIcon = document.querySelector('.start-menu-icon');
    
    let loadedAssets = 0;
    const totalAssets = assets.length;
    const startTime = Date.now();
    const minLoadTime = 0; // 5 seconds in milliseconds

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

// Function to close all open windows with animation
function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(window => {
        const windowId = window.id;
        window.classList.remove('show');
        
        setTimeout(() => {
            window.style.display = 'none';
        }, 300); // This duration matches the animation time (300ms)
    });

    document.querySelectorAll('.desktop-icon-container, .taskbar-icon').forEach(icon => {
        icon.classList.remove('active');
    });
}


// Event listener for Start Menu icon to close all windows
startMenuIcon.addEventListener('click', () => {
    closeAllWindows();
});

    document.querySelectorAll('.desktop-icon-container, .start-menu-item, .taskbar-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            const windowId = e.currentTarget.getAttribute('data-window');
            const targetWindow = document.getElementById(windowId);

            document.querySelectorAll('.window').forEach(win => {
                win.classList.remove('show');
            });
            document.querySelectorAll('.desktop-icon-container, .taskbar-icon').forEach(icon => {
                icon.classList.remove('active');
            });

            if (targetWindow) {
                targetWindow.style.display = 'flex';
                setTimeout(() => {
                    targetWindow.classList.add('show');
                }, 10);

                if (e.currentTarget.classList.contains('desktop-icon-container')) {
                    e.currentTarget.classList.add('active');
                }
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

    // Boot screen loading functionality
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

    setTimeout(() => {
        if (loadedAssets < totalAssets) {
            const percentage = Math.round((loadedAssets / totalAssets) * 100);
            percentageText.textContent = `${percentage}%`;
        }
    }, minLoadTime);
});

const tabs = document.querySelectorAll('#sidebar-tabs li');
        const breadcrumbs = document.getElementById('breadcrumbs');
        const fileList = document.getElementById('file-list');

                const tabContents = {
            'this-pc': {
                type: 'welcome',
                content: `
                    <h2>Explore!</h2>
                `
            },
            'apps': [
                { name: 'Ping-r.apk', icon: 'fab fa-android android-icon', url: 'https://github.com/brendmung/Ping-r/releases' },
                { name: 'AbodeLLM.apk', icon: 'fab fa-android android-icon', url: 'https://github.com/brendmung/abodellm/releases' },
                { name: 'Noted!.apk', icon: 'fab fa-android android-icon', url: 'https://github.com/brendmung/Noted-App/releases' }
            ],
            'py-scripts': [
                { name: 'adv-image-info.py', icon: 'fab fa-python python-icon', url: 'https://github.com/brendmung/image-metadata-extractor' },
                { name: 'save-win-images.py', icon: 'fab fa-python python-icon', url: 'https://github.com/brendmung/python-scripts/blob/main/save-windows-spotlight-wallpapers.py' },
            ],
            'ml-models': [
                { name: 'jump-game-ai', icon: 'fas fa-brain brain-icon', url: 'https://github.com/brendmung/jump-game-ai' },
                { name: 'forex-prediction-lstm', icon: 'fas fa-project-diagram project-diagram-icon', url: 'https://github.com/brendmung/forex-prediction-lstm' },
            ],
            'other': [
                { name: '.nomedia', icon: 'fas fa-file-code file-code-icon', url: '' },
            ]
        };

        function updateContent(tabName) {
            // Fade out
            fileList.classList.add('fade-out');
            
            setTimeout(() => {
                breadcrumbs.textContent = tabName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
                fileList.innerHTML = '';
                
                const content = tabContents[tabName];
                if (content.type === 'welcome') {
                    fileList.innerHTML = content.content;
                } else {
                    content.forEach(item => {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'file-item';
                        fileItem.innerHTML = `
                            <i class="${item.icon}"></i>
                            <div class="file-name">${item.name}</div>
                        `;
                        fileItem.onclick = () => window.open(item.url, '_blank');
                        fileList.appendChild(fileItem);
                    });
                }

                // Fade in
                setTimeout(() => {
                    fileList.classList.remove('fade-out');
                    fileList.classList.add('fade-in');
                }, 50);

                // Remove the fade-in class after animation completes
                setTimeout(() => {
                    fileList.classList.remove('fade-in');
                }, 300);
            }, 300); // This timeout should match the transition duration
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                updateContent(tab.dataset.tab);
            });
        });

        // Initialize with "This PC" content
        updateContent('this-pc');
