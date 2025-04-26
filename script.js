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
        // Check which page we're on
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname.includes('index.html');
        const isBlogPage = window.location.pathname.includes('blog.html');
        
        // Get page-specific elements
        const header = document.querySelector('.header-content');
        const footer = document.querySelector('footer');
        let sections = [];
        
        // Get the appropriate sections based on the page
        if (isHomePage) {
            sections = document.querySelectorAll('main section, section.about, section.resume, section.projects, section.education, section.skills, section.contact');
        } else if (isBlogPage) {
            sections = document.querySelectorAll('section.blog-intro, section.blog-posts');
        } else {
            sections = document.querySelectorAll('section');
        }
        
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
        
        // Add page transition functionality
        document.addEventListener('click', function(e) {
            // Only intercept links to our own pages
            const link = e.target.closest('a');
            if (link && link.hostname === window.location.hostname) {
                const href = link.getAttribute('href');
                
                // Only animate if we're navigating to a different page
                if (href && (href !== window.location.pathname.split('/').pop())) {
                    e.preventDefault();
                    
                    // Get current theme to pass to the next page
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    
                    // Add loading indicator before transition
                    const loadingIndicator = document.createElement('div');
                    loadingIndicator.className = 'loading-indicator';
                    document.body.appendChild(loadingIndicator);
                    
                    // Fade out content
                    document.body.style.opacity = '0.5';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    // Navigate after animation completes
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            }
        });
    }
}); 