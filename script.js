// Environmental Awareness Through Social Media - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeAnimations();
    initializeStatCounters();
    initializeVideoLazyLoading();
    
    console.log('🌱 Environmental Awareness website loaded successfully!');
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active navigation link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .section').forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effects to interactive elements
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Animated counters for statistics
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = performance.now();
        const startValue = 0;
        
        // Extract numeric value and suffix
        const targetStr = target.toString();
        const numMatch = targetStr.match(/[\d.]+/);
        const suffix = targetStr.replace(/[\d.]+/, '');
        const targetNum = numMatch ? parseFloat(numMatch[0]) : 0;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (targetNum - startValue) * easeOutQuart;
            
            // Format the number based on original format
            let displayValue;
            if (suffix.includes('%')) {
                displayValue = Math.round(currentValue) + '%';
            } else if (suffix.includes('B')) {
                displayValue = currentValue.toFixed(1) + 'B';
            } else if (suffix.includes('M')) {
                displayValue = Math.round(currentValue) + 'M';
            } else if (suffix.includes('K')) {
                displayValue = Math.round(currentValue) + 'K';
            } else {
                displayValue = currentValue.toFixed(1) + suffix;
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target; // Ensure final value is exact
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Create intersection observer for stat cards
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.hasAttribute('data-animated')) {
                    const targetValue = statNumber.textContent;
                    statNumber.setAttribute('data-animated', 'true');
                    animateCounter(statNumber, targetValue);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
}

// Lazy loading for video iframes
function initializeVideoLazyLoading() {
    const videoContainers = document.querySelectorAll('.video-container');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                }
                videoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    videoContainers.forEach(container => {
        videoObserver.observe(container);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-button);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = debounce(() => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', addScrollProgress);

// Mobile menu toggle (if needed for smaller screens)
function initializeMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-primary);
        cursor: pointer;
    `;
    navToggle.className = 'nav-toggle';
    
    document.querySelector('.nav-header').insertBefore(navToggle, nav);
    
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
    });
    
    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
            }
            .nav-links {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                flex-direction: column;
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            .nav-links.nav-open {
                transform: translateY(0);
                opacity: 1;
                pointer-events: all;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// Console welcome message
console.log(`
🌱 Welcome to Environmental Awareness Through Social Media!
📊 This website demonstrates how digital platforms can drive environmental change.
🎯 Features: Interactive statistics, responsive design, and educational content.
✨ Built with modern web technologies for optimal performance.
`);
