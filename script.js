// DOM manipulation and animations
document.addEventListener('DOMContentLoaded', () => {
    // Set the body background color immediately based on current theme
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        document.body.style.backgroundColor = 'var(--bg-color)';
    }
    
    // Wait for header component to load before animating content
    // And for content-loaded class to be added
    const waitForLoading = setInterval(() => {
        if (document.body.classList.contains('content-loaded')) {
            clearInterval(waitForLoading);
            initializeAnimations();
        }
    }, 50);
    
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