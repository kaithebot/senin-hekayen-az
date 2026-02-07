// ========================================
// Sənin Hekayən - Interactive Scripts
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Mobile menu toggle (if needed in future)
    initMobileMenu();
    
    // Form handling
    initFormHandling();
});

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.step, .gallery-item, .feature-card, .book-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu functionality (placeholder for future expansion)
function initMobileMenu() {
    // Add mobile menu logic here if needed
    const navbar = document.querySelector('.navbar');
    
    // Add shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Form handling
function initFormHandling() {
    // Track form interactions for analytics (if needed)
    const form = document.querySelector('.order-form iframe');
    
    if (form) {
        // Add loading state
        form.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        form.style.opacity = '0';
        form.style.transition = 'opacity 0.5s ease';
        
        // Fade in after short delay
        setTimeout(() => {
            form.style.opacity = '1';
        }, 500);
    }
}

// Utility function to debounce scroll events
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

// Add parallax effect to floating elements
window.addEventListener('scroll', debounce(() => {
    const floatingElements = document.querySelectorAll('.float-item');
    const scrolled = window.pageYOffset;
    
    floatingElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 10));

// WhatsApp link click tracking (for analytics)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp clicked');
        // Add analytics tracking here if needed
    });
});

// Gallery item hover effect enhancement
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Book card 3D tilt effect
document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Feature counter animation
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Navbar hide/show on scroll (optional enhancement)
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Add CSS transition for navbar
document.querySelector('.navbar').style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

console.log('🎉 Sənin Hekayən website loaded successfully!');
