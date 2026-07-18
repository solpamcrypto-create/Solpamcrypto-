// ================================
// SOLAPAM - Interactive Features
// ================================

// DOM Elements
const ctaButton = document.querySelector('.cta-button');
const packageButtons = document.querySelectorAll('.package-btn');
const reservationForm = document.querySelector('.reservation-form');
const navMenu = document.querySelector('.nav-menu');

// ================================
// 1. Smooth Scroll Navigation
// ================================
navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ================================
// 2. CTA Button Click Handler
// ================================
ctaButton.addEventListener('click', () => {
    const tariffSection = document.querySelector('#tarifs');
    if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth' });
        showNotification('Découvrez nos forfaits disponibles!', 'success');
    }
});

// ================================
// 3. Package Selection Handler
// ================================
packageButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const packageCard = btn.closest('.pricing-card');
        const packageName = packageCard.querySelector('.package-name').textContent;
        const price = packageCard.querySelector('.price').textContent;
        
        showNotification(`Forfait ${packageName} sélectionné! ${price}/mois`, 'success');
        
        // Add animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
        
        // Highlight the selected package
        packageButtons.forEach(b => {
            b.classList.remove('selected');
        });
        btn.classList.add('selected');
    });
});

// ================================
// 4. Reservation Form Handler
// ================================
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);
        
        // Get form values
        const inputs = reservationForm.querySelectorAll('input, select');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const phone = inputs[2].value;
        const date = inputs[3].value;
        const time = inputs[4].value;
        const service = inputs[5].value;
        
        // Validate form
        if (!name || !email || !phone || !date || !time || !service) {
            showNotification('Veuillez remplir tous les champs!', 'error');
            return;
        }
        
        // Show success message
        showNotification(`Réservation confirmée pour ${name}! 🎉`, 'success');
        
        // Log reservation data (in a real app, this would be sent to a server)
        console.log({
            name,
            email,
            phone,
            date,
            time,
            service,
            timestamp: new Date().toISOString()
        });
        
        // Reset form
        reservationForm.reset();
        
        // Optional: Scroll to footer
        setTimeout(() => {
            const footer = document.querySelector('.footer-taskbar');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    });
}

// ================================
// 5. Notification System
// ================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#F44336';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#FF6B35';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ================================
// 6. Add Animation Styles
// ================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .pricing-card .selected {
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #2C3E50;
    }
`;
document.head.appendChild(style);

// ================================
// 7. Scroll Animation - Fade In Elements
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service and testimonial cards
document.querySelectorAll('.service-card, .testimonial-card, .pricing-card, .progress-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ================================
// 8. Navbar Active Link Highlight
// ================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navMenu.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add active style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-menu a.active {
        color: #FFD700 !important;
        font-weight: 600;
    }
`;
document.head.appendChild(activeStyle);

// ================================
// 9. Service Cards Counter Animation
// ================================
function animateCounter(element, finalValue, duration = 2000) {
    let currentValue = 0;
    const increment = finalValue / (duration / 16);
    
    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// ================================
// 10. Form Input Validation
// ================================
const inputs = document.querySelectorAll('.reservation-form input, .reservation-form select');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#FF6B35';
        this.style.boxShadow = '0 0 8px rgba(255, 107, 53, 0.3)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '#FFA500';
        this.style.boxShadow = 'none';
    });
});

// ================================
// 11. Service Card Hover Effect
// ================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ================================
// 12. Mobile Menu Toggle (Optional)
// ================================
function initMobileMenu() {
    const nav = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if mobile
    if (window.innerWidth <= 768) {
        // Mobile menu setup (if needed)
        navMenu.style.flexWrap = 'wrap';
    }
}

window.addEventListener('resize', initMobileMenu);
window.addEventListener('load', initMobileMenu);

// ================================
// 13. Testimonials Carousel (Auto-scroll)
// ================================
function createTestimonialCarousel() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid) return;
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    let index = 0;
    
    setInterval(() => {
        testimonials.forEach((card, i) => {
            if (i === index) {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.3)';
            } else {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.2)';
            }
        });
        
        index = (index + 1) % testimonials.length;
    }, 5000);
}

// ================================
// 14. Page Load Animation
// ================================
window.addEventListener('load', () => {
    createTestimonialCarousel();
    
    // Add page loaded class
    document.body.classList.add('page-loaded');
    
    console.log('✨ SOLAPAM Page Loaded Successfully! ✨');
});

// ================================
// 15. Keyboard Navigation
// ================================
document.addEventListener('keydown', (e) => {
    // ESC to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notif => notif.remove());
    }
    
    // Alt + S to scroll to Services
    if (e.altKey && e.key === 's') {
        document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Alt + T to scroll to Tariffs
    if (e.altKey && e.key === 't') {
        document.querySelector('#tarifs').scrollIntoView({ behavior: 'smooth' });
    }
});

// ================================
// 16. Performance Optimization
// ================================
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('🎉 SOLAPAM JavaScript loaded and ready!');