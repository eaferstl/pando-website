/**
 * Pando Website JavaScript
 * Handles form validation and interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation if contact form exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initializeContactForm(contactForm);
    }

    // Smooth scroll for anchor links
    initializeSmoothScroll();
    
    // Initialize scroll-triggered logo text visibility on home page
    initializeLogoTextScroll();
});

/**
 * Initialize contact form with validation and submission handling
 */
function initializeContactForm(form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('.btn-submit');
    const formStatus = document.getElementById('formStatus');

    // Real-time validation on blur
    nameInput.addEventListener('blur', function() {
        validateName(this.value);
    });

    emailInput.addEventListener('blur', function() {
        validateEmail(this.value);
    });

    subjectInput.addEventListener('blur', function() {
        validateSubject(this.value);
    });

    messageInput.addEventListener('blur', function() {
        validateMessage(this.value);
    });

    // Clear error on focus
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('focus', function() {
            clearError(this);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        // Validate all fields before submission
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isSubjectValid = validateSubject(subjectInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
            showFormStatus('error', 'Please fix the errors above before submitting.');
            return false;
        }

        // If using Netlify Forms, let it handle the submission naturally
        // The data-netlify attribute will handle the form processing
        
        // Disable submit button to prevent double submission
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    });
}

/**
 * Validate name field
 */
function validateName(value) {
    const nameError = document.getElementById('nameError');
    
    if (!value || value.trim().length === 0) {
        showError(nameError, 'Name is required.');
        return false;
    }
    
    if (value.trim().length < 2) {
        showError(nameError, 'Name must be at least 2 characters.');
        return false;
    }
    
    clearError(document.getElementById('name'));
    return true;
}

/**
 * Validate email field
 */
function validateEmail(value) {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value || value.trim().length === 0) {
        showError(emailError, 'Email is required.');
        return false;
    }
    
    if (!emailRegex.test(value)) {
        showError(emailError, 'Please enter a valid email address.');
        return false;
    }
    
    clearError(document.getElementById('email'));
    return true;
}

/**
 * Validate subject field
 */
function validateSubject(value) {
    const subjectError = document.getElementById('subjectError');
    
    if (!value || value === '') {
        showError(subjectError, 'Please select a subject.');
        return false;
    }
    
    clearError(document.getElementById('subject'));
    return true;
}

/**
 * Validate message field
 */
function validateMessage(value) {
    const messageError = document.getElementById('messageError');
    
    if (!value || value.trim().length === 0) {
        showError(messageError, 'Message is required.');
        return false;
    }
    
    if (value.trim().length < 10) {
        showError(messageError, 'Message must be at least 10 characters.');
        return false;
    }
    
    clearError(document.getElementById('message'));
    return true;
}

/**
 * Show error message for a field
 */
function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error styling to input
        const input = errorElement.previousElementSibling;
        if (input) {
            input.style.borderColor = '#D32F2F';
        }
    }
}

/**
 * Clear error for a field
 */
function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    input.style.borderColor = '#e5dfd5';
}

/**
 * Show form submission status
 */
function showFormStatus(type, message) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.className = 'form-status ' + type;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors, not empty ones
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Handle Netlify form success (redirect after submission)
 * This function can be called if you create a custom success page
 */
function handleFormSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showFormStatus('success', 'Thank you for your message! We will respond within 3-5 business days.');
        
        // Clear the URL parameter
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
}

// Check for success parameter on page load
handleFormSuccess();

/**
 * Utility: Debounce function for input validation
 * Helps prevent excessive validation during typing
 */
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

/**
 * Initialize scroll-triggered logo text visibility
 * On home page: hide logo text until scrolled past hero
 * On other pages: always show logo text
 */
function initializeLogoTextScroll() {
    const logoText = document.querySelector('.logo-text');
    const heroSection = document.querySelector('.hero');
    
    // Only apply this behavior on home page (where hero section exists)
    if (!logoText || !heroSection) {
        return;
    }
    
    // Hide logo text initially on home page
    logoText.classList.add('logo-text-hidden');
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleLogoTextScroll(logoText, heroSection);
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Check initial state
    handleLogoTextScroll(logoText, heroSection);
}

/**
 * Handle logo text visibility based on scroll position
 */
function handleLogoTextScroll(logoText, heroSection) {
    const heroHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;
    
    // Show logo text when scrolled past 35% of hero section
    if (scrollPosition > heroHeight * 0.35) {
        logoText.classList.remove('logo-text-hidden');
        logoText.classList.add('logo-text-visible');
    } else {
        logoText.classList.remove('logo-text-visible');
        logoText.classList.add('logo-text-hidden');
    }
}

/**
 * Add subtle hover effects to cards
 */
document.querySelectorAll('.problem-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
