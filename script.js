// DOM manipulation and animations
document.addEventListener('DOMContentLoaded', () => {
    // Set the body background color immediately based on current theme
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        document.body.style.backgroundColor = 'var(--bg-color)';
    }
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Wait for header component to load before animating content
    // And for content-loaded class to be added
    const waitForLoading = setInterval(() => {
        if (document.body.classList.contains('content-loaded')) {
            clearInterval(waitForLoading);
            initializeAnimations();
        }
    }, 50);
    
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const moonIcon = '<i class="fas fa-moon"></i>';
        const sunIcon = '<i class="fas fa-sun"></i>';
        const toggleText = themeToggle.querySelector('.toggle-text');
        
        // Set initial icon and text based on current theme
        if (isDarkMode) {
            themeToggle.innerHTML = sunIcon + '<span class="toggle-text">Light Mode</span>';
        } else {
            themeToggle.innerHTML = moonIcon + '<span class="toggle-text">Dark Mode</span>';
        }
        
        // Add click event listener to toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update data-theme attribute
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save theme preference to localStorage
            localStorage.setItem('theme', newTheme);
            
            // Update toggle button text and icon
            if (newTheme === 'dark') {
                themeToggle.innerHTML = sunIcon + '<span class="toggle-text">Light Mode</span>';
            } else {
                themeToggle.innerHTML = moonIcon + '<span class="toggle-text">Dark Mode</span>';
            }
        });
    }
    
    function initializeAnimations() {
        // Get page elements
        const header = document.querySelector('.header-content');
        const footer = document.querySelector('footer');
        const sections = document.querySelectorAll('main section, section.about, section.resume, section.projects, section.education, section.skills, section.contact');
        
        // Apply initial styles for fade-in animation
        [header, ...sections, footer].forEach(element => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
        });
        
        // Animate header immediately
        setTimeout(() => {
            if (header) {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
        }, 100);
        
        // Animate sections with delay
        sections.forEach((section, index) => {
            setTimeout(() => {
                if (section) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            }, 400 + (index * 200));
        });
        
        // Animate footer last
        setTimeout(() => {
            if (footer) {
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }
        }, 400 + (sections.length * 200));
    }
}); 