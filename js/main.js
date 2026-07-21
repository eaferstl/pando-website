/**
 * Pando Website JavaScript
 * Handles form validation and interactive features
 */

// EmailJS Configuration
// These values are replaced during build by environment variables
const EMAILJS_CONFIG = {
    publicKey: 'QOE9Vl1cBq8l2TlPN',
    serviceId: 'service_1q1byab',
    templateId: 'template_1zf3ykh'
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS only if library is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    
    // Initialize form validation if contact form exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initializeContactForm(contactForm);
    }

    // Smooth scroll for anchor links
    initializeSmoothScroll();
    
    // Initialize mobile menu
    initializeMobileMenu();

    // Render blog cards (only runs on the blog index page)
    initializeBlogIndex();
});

/**
 * Populate the blog grid from the posts.json manifest.
 * Runs only where a .blog-grid element exists; inert on every other page.
 */
function initializeBlogIndex() {
    const grid = document.querySelector('.blog-grid');
    if (!grid) return;

    fetch('/blog/posts.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load posts');
            return response.json();
        })
        .then(function(posts) {
            // Hide posts dated in the future so they can be scheduled ahead of
            // time; each appears automatically once its publish date arrives.
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            posts = posts.filter(function(post) {
                const published = new Date(post.date + 'T00:00:00');
                return isNaN(published.getTime()) || published <= today;
            });

            posts.sort(function(a, b) {
                return String(b.date).localeCompare(String(a.date));
            });

            grid.textContent = '';

            if (!posts.length) {
                showBlogMessage(grid, 'No posts yet. Check back soon.');
                return;
            }

            posts.forEach(function(post) {
                grid.appendChild(buildBlogCard(post));
            });
        })
        .catch(function() {
            showBlogMessage(grid, 'Posts are unavailable right now. Please try again later.');
        });
}

/**
 * Build a single blog card element from a manifest entry.
 * User-supplied text is assigned via textContent to avoid HTML injection.
 */
function buildBlogCard(post) {
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = post.url;

    if (post.image) {
        const img = document.createElement('img');
        img.className = 'blog-card-image';
        img.src = post.image;
        img.alt = post.title || '';
        img.loading = 'lazy';
        card.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'blog-card-body';

    if (post.date) {
        const meta = document.createElement('p');
        meta.className = 'blog-card-meta';
        meta.textContent = formatBlogDate(post.date);
        body.appendChild(meta);
    }

    const title = document.createElement('h3');
    title.className = 'blog-card-title';
    title.textContent = post.title || 'Untitled';
    body.appendChild(title);

    if (post.excerpt) {
        const excerpt = document.createElement('p');
        excerpt.className = 'blog-card-excerpt';
        excerpt.textContent = post.excerpt;
        body.appendChild(excerpt);
    }

    if (post.author) {
        const author = document.createElement('p');
        author.className = 'blog-card-author';
        author.textContent = 'By ' + post.author;
        body.appendChild(author);
    }

    card.appendChild(body);
    return card;
}

/**
 * Format an ISO date (YYYY-MM-DD) as e.g. "July 15, 2026".
 * Falls back to the raw string if it can't be parsed.
 */
function formatBlogDate(value) {
    const date = new Date(value + 'T00:00:00');
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Show a centered status message inside the blog grid.
 */
function showBlogMessage(grid, message) {
    grid.textContent = '';
    const el = document.createElement('p');
    el.className = 'blog-empty';
    el.textContent = message;
    grid.appendChild(el);
}

/**
 * Initialize mobile hamburger menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (!mobileMenuToggle || !navLinks) return;
    
    // Toggle menu on hamburger click
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize to desktop
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 767 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 100));
}

/**
 * Close the mobile menu
 */
function closeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
    }
    
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    
    if (navOverlay) {
        navOverlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
}

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
        e.preventDefault();
        
        // Validate all fields before submission
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isSubjectValid = validateSubject(subjectInput.value);
        const isMessageValid = validateMessage(messageInput.value);

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            showFormStatus('error', 'Please fix the errors above before submitting.');
            return false;
        }

        // Disable submit button to prevent double submission
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Prepare template parameters
        const templateParams = {
            from_name: nameInput.value,
            from_email: emailInput.value,
            organization: document.getElementById('organization').value || 'Not provided',
            subject: subjectInput.value,
            message: messageInput.value
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormStatus('success', 'Thank you for your message! We will typically respond within 1-3 business days.');
                
                // Reset form
                form.reset();
                
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, function(error) {
                console.error('FAILED...', error);
                showFormStatus('error', 'Failed to send message. Please try again or contact us directly via LinkedIn or X.');
                
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            });
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
        showError(subjectError, 'Subject is required.');
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
            input.style.borderColor = 'var(--error-red)';
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
    input.style.borderColor = '';
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
        showFormStatus('success', 'Thank you for your message! We will respond within 1-3 business days.');
        
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
