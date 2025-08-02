// FarmFresh Animations and Interactive Features
// This file contains additional animations and interactive features

// Utility functions for animations
const AnimationUtils = {
    // Fade in animation
    fadeIn: (element, duration = 600) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        setTimeout(() => {
            element.style.opacity = '1';
        }, 100);
    },

    // Slide in from bottom
    slideInUp: (element, duration = 600) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    },

    // Scale animation
    scaleIn: (element, duration = 400) => {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        }, 100);
    },

    // Bounce animation
    bounce: (element) => {
        element.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    },

    // Shake animation
    shake: (element) => {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
};

// Enhanced scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
        this.init();
    }

    init() {
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.product-card, .feature-card, .product-item, .about-content > *');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// Enhanced button interactions
class ButtonInteractions {
    constructor() {
        this.init();
    }

    init() {
        // Add ripple effect to all buttons
        document.querySelectorAll('.cta-button, .contact-farmer, button').forEach(button => {
            this.addRippleEffect(button);
            this.addHoverEffects(button);
        });
    }

    addRippleEffect(button) {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    addHoverEffects(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Enhanced image loading
class ImageLoader {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('img').forEach(img => {
            // Add loading animation
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.classList.add('loaded');
            });
            
            if (img.complete) {
                img.style.opacity = '1';
                img.classList.add('loaded');
            }
        });
    }
}

// Enhanced navigation
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavbar();
        this.setupMobileMenu();
        this.setupScrollToTop();
    }

    setupNavbar() {
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navOverlay = document.querySelector('.nav-overlay');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                if (navOverlay) {
                    navOverlay.classList.toggle('active');
                }
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow the default navigation to happen
                // Don't prevent default - let the link work normally
                
                // Close the mobile menu
                navLinks.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                
                // Add a small delay to ensure the menu closes before navigation
                setTimeout(() => {
                    // The link will navigate naturally
                }, 100);
            });
        });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Enhanced form interactions
class FormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Add floating label effect to form inputs
        document.querySelectorAll('input, textarea').forEach(input => {
            this.addFloatingLabel(input);
            this.addFocusEffects(input);
        });
    }

    addFloatingLabel(input) {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    }

    addFocusEffects(input) {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.ticking = false;
        this.init();
    }

    init() {
        // Throttle scroll events
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    updateScrollAnimations() {
        // Update any scroll-based animations here
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Enhanced accessibility
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addFocusIndicators();
        this.addSkipLinks();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navLinks = document.querySelector('.nav-links');
                const navOverlay = document.querySelector('.nav-overlay');
                
                if (navLinks) navLinks.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
            }
        });
    }

    addFocusIndicators() {
        document.querySelectorAll('button, a, input, textarea').forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary-color)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    addSkipLinks() {
        // Add skip to main content link for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new ButtonInteractions();
    new ImageLoader();
    new Navigation();
    new FormEnhancements();
    new PerformanceOptimizer();
    new AccessibilityEnhancements();
    
    // Add page load animation
    document.body.classList.add('loaded');
});

// Add CSS for additional animations
const additionalStyles = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .focused {
        transform: scale(1.02);
        box-shadow: 0 0 0 2px var(--primary-color);
    }
    
    .floating-label {
        position: relative;
    }
    
    .floating-label label {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        transition: all 0.3s ease;
        pointer-events: none;
        color: #666;
    }
    
    .floating-label label.active {
        top: 0;
        font-size: 0.8em;
        color: var(--primary-color);
    }
    
    .floating-label input:focus + label,
    .floating-label textarea:focus + label {
        top: 0;
        font-size: 0.8em;
        color: var(--primary-color);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 