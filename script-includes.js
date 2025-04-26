document.addEventListener('DOMContentLoaded', function() {
    // Get the base path for current page
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/blog/');
    const basePath = isInSubfolder ? '../' : '';
    
    // Load the header component
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        // Use current directory's header or the root header
        const headerPath = isInSubfolder ? 'header.html' : 'header.html';
        
        fetch(headerPath)
            .then(response => {
                if (!response.ok) {
                    // Fallback to absolute path if relative path fails
                    throw new Error('Header not found at relative path');
                }
                return response.text();
            })
            .catch(() => {
                // Try with absolute path from root
                const rootHeaderPath = isInSubfolder ? '/blog/header.html' : '/header.html';
                return fetch(rootHeaderPath).then(resp => resp.text());
            })
            .then(data => {
                // Replace placeholder with header content
                headerPlaceholder.innerHTML = data;
                
                // Set active navigation item based on current page
                const currentPage = window.location.pathname;
                if (currentPage.includes('/blog/')) {
                    document.getElementById('nav-blog').classList.add('active');
                } else {
                    document.getElementById('nav-home').classList.add('active');
                }
                
                // Initialize dark mode after header is loaded
                initializeDarkMode();
                
                // Indicate content is ready to be shown
                document.body.classList.add('content-loaded');
                
                // Remove loading indicator
                const loadingIndicator = document.querySelector('.loading-indicator');
                if (loadingIndicator) {
                    setTimeout(() => {
                        loadingIndicator.style.opacity = '0';
                        loadingIndicator.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => {
                            loadingIndicator.remove();
                        }, 300);
                    }, 200);
                }
            })
            .catch(error => {
                console.error('Failed to load header component:', error);
                // In case of error, still show content
                document.body.classList.add('content-loaded');
                // Remove loading indicator
                const loadingIndicator = document.querySelector('.loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
            });
    }
});

// Initialize dark mode
function initializeDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('.toggle-text');
        
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme based on saved preference or device preference
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Light Mode';
        }
        
        // Toggle theme function
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update the theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button icon and text
            if (newTheme === 'dark') {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                themeText.textContent = 'Light Mode';
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                themeText.textContent = 'Dark Mode';
            }
        }
        
        // Add event listener to theme toggle button
        themeToggle.addEventListener('click', toggleTheme);
    }
} 