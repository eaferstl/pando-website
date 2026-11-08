/**
 * Pando Website JavaScript
 * Handles form validation and interactive features
 */

// EmailJS Configuration
//
// These literals ship exactly as written. There is no build step and nothing
// substitutes them, whatever an older comment here used to claim; that comment
// was wrong and it is the reason a rotated key could sit unfixed.
//
// The public key is not a secret. EmailJS sends it as `user_id` and it is meant
// to ship in client-side JS, so editing it here is the fix, not a workaround.
//
// A wrong key fails silently: the form reports no error and the message is
// never delivered. After rotating, submit the form once on the deployed site
// and confirm the mail arrives. Nothing on the page will tell you otherwise.
const EMAILJS_CONFIG = {
    publicKey: 'VdBU9EQjbYtG0R6UG',
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
    
    // Initialize mobile menu
    initializeMobileMenu();

    // Render blog cards (only runs on the blog index page)
    initializeBlogIndex();

    // Add copy controls to command blocks
    initializeCopyButtons();

    // Collapse the docs sidebar list on narrow viewports
    initializeDocsSidebar();

    // Build the docs search control (only runs where a docs sidebar exists)
    initializeDocsSearch();

    // Reveal the mobile conversion bar once the hero scrolls away
    initializeMobileCtaBar();
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
            // Leave the static fallback list in place. Replacing it put the
            // reader at a hard dead end on the only route to eight posts.
            const note = document.createElement('p');
            note.className = 'blog-empty';
            note.textContent = 'Could not load the full post list. Every post is linked below.';
            grid.insertBefore(note, grid.firstChild);
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

    // h3 under the "All Posts" h2 in blog/index.html. That heading is what keeps
    // the outline from skipping; promoting the cards themselves to h2 instead
    // would have given h2 a fourth size on the site.
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
        const isOpen = navLinks.classList.contains('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        setPageInert(isOpen);
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
        // 1023, matching the nav drawer's media query in styles.css. If these
        // two ever disagree the drawer is stuck open or cannot be closed.
        if (window.innerWidth > 1023 && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 100));
}

/**
 * Make everything outside the navbar inert while the drawer is open.
 *
 * The drawer is a modal: an overlay is painted over the page and body scroll is
 * locked. Without this, Tab walked the eight drawer links and then carried on
 * into the page behind the overlay, and because the scroll lock still held, the
 * stops past the fold could not be scrolled to or even seen. WCAG 2.4.3.
 *
 * The header is deliberately left alone - it holds the drawer, the toggle and
 * the logo, which all stay visible and operable. The skip link goes inert with
 * its target, because skipping into inert content would do nothing.
 *
 * `inert` is a no-op in browsers that do not support it, which leaves the old
 * behaviour rather than a broken drawer.
 */
function setPageInert(isInert) {
    document
        .querySelectorAll('.skip-to-main, main, footer, .mobile-cta-bar')
        .forEach(function(el) {
            el.inert = isInert;
        });
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
    setPageInert(false);

    // Return focus to the control that opened it, but only if focus is still
    // inside the drawer we are closing. The links go visibility: hidden, so
    // without this the active element is destroyed and focus falls to <body>:
    // the next Tab restarts in the page content, past the whole navbar.
    // Guarded because this also runs on resize and on link activation, and
    // stealing focus back from a page the reader has just navigated to, or
    // from wherever they happen to be at 1024px, would be worse than the bug.
    if (mobileMenuToggle && navLinks && navLinks.contains(document.activeElement)) {
        mobileMenuToggle.focus();
    }
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

    // Clear the error once the field is being corrected, not on focus. On focus
    // it wiped the message the instant a keyboard user tabbed into the field,
    // so a screen reader never got to read it.
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.hasAttribute('aria-invalid')) {
                clearError(this);
            }
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
            // Then send the reader to the first problem. Focus used to stay on
            // the submit button, so on a phone the only signal was a status
            // line and four messages they had already scrolled past, with
            // nothing indicating which field to go back to.
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return false;
        }

        // The EmailJS SDK is a third-party script. If it was blocked, failed to
        // load, or is still in flight, emailjs.send() throws a ReferenceError
        // from inside this handler: the button sticks on "Sending...", the live
        // region never updates, and the message is gone. That is the silent
        // failure the config comment at the top of this file warns about, on the
        // only inbound channel the site has.
        if (typeof emailjs === 'undefined' || typeof emailjs.send !== 'function') {
            showFormStatus('error', 'The message form could not load, so this would not have reached us. Please email', 'eliot@pandocore.io');
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
                showFormStatus('success', 'Thank you for your message! We will typically respond within 1-3 business days.');
                
                // Reset form
                form.reset();
                
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, function(error) {
                console.error('FAILED...', error);
                // Names a route that exists on this page. It used to point at an
                // X link, and there has never been one here.
                showFormStatus('error', 'Could not send your message. Please try again, or email', 'eliot@pandocore.io');
                
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
    
    if (!value || value.trim().length === 0) {
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
    if (!errorElement) return;
    // No display toggling: role="alert" only fires for content that appears in
    // an element already in the layout, and an empty .error-message is 0px tall
    // anyway. No inline borderColor either - aria-invalid carries the styling.
    errorElement.textContent = message;
    const input = errorElement.previousElementSibling;
    if (input && input.matches('input, select, textarea')) {
        input.setAttribute('aria-invalid', 'true');
    }
}

/**
 * Clear error for a field
 */
function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
    }
    input.removeAttribute('aria-invalid');
}

/**
 * Show form submission status.
 *
 * `fallbackEmail` appends a mailto link after the message, for the paths where
 * the form itself is what broke and a second route is the only useful thing we
 * can offer. Built with createElement so the status line never takes markup.
 */
function showFormStatus(type, message, fallbackEmail) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        // No display toggling. The element carries role="status" aria-live, and
        // a live region that is display: none is not in the accessibility tree,
        // so setting its text first and revealing it second changed the text
        // while nothing was observing: the submit result could land silently.
        // It is always rendered now and collapses while empty (.form-status:empty).
        formStatus.className = 'form-status ' + type;
        formStatus.textContent = message;

        if (fallbackEmail) {
            const link = document.createElement('a');
            link.href = 'mailto:' + fallbackEmail;
            link.textContent = fallbackEmail;
            formStatus.appendChild(document.createTextNode(' '));
            formStatus.appendChild(link);
            formStatus.appendChild(document.createTextNode('.'));
        }

        // Scroll to status message
        formStatus.scrollIntoView({ block: 'nearest' });
    }
}

// Anchor scrolling is deliberately left to the browser. `html { scroll-behavior:
// smooth; scroll-padding-top }` in styles.css does the scroll, and the
// prefers-reduced-motion block there turns it off. A click handler that called
// preventDefault() here set no hash (so Back left the site), never moved focus to
// the target despite its tabindex="-1" (WCAG 2.4.1), passed behavior: 'smooth'
// explicitly (overriding reduced motion in Chrome) and ignored scroll-padding-top
// (landing targets under the sticky nav). Do not reintroduce it.

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
/**
 * The docs sidebar list ships with `open` so it is correct on a desktop with no
 * JavaScript, and so a phone without JavaScript still gets every link. Here we
 * close it at the width where docs.css turns it into a wrapped chip cloud: open,
 * those 14 links pushed the h1 roughly 700px down the page.
 *
 * 1023 matches the `@media (max-width: 1023px)` block in css/docs.css, and it
 * is the same width the nav drawer uses. The two have to move together. It was
 * 900, which left 901-1023 running a hamburger nav beside a fixed sidebar and
 * squeezed the content column to 545px - narrower than at 900.
 */
function initializeDocsSidebar() {
    const disclosure = document.querySelector('.docs-nav-disclosure');
    if (!disclosure) return;

    let wide = window.innerWidth > 1023;
    disclosure.open = wide;

    // Only act when the breakpoint is actually crossed, so a reader who opened
    // the list on a phone does not have it shut on them by a scrollbar resize.
    window.addEventListener('resize', debounce(function() {
        const nowWide = window.innerWidth > 1023;
        if (nowWide !== wide) {
            wide = nowWide;
            disclosure.open = nowWide;
        }
    }, 150));
}

/**
 * Documentation search.
 *
 * The control is built here rather than written into the 14 pages, so a reader
 * without JS never meets an input that cannot do anything, and the index is
 * fetched on first use rather than on load: 15 KB gzipped is not worth
 * spending on everyone who never searches.
 *
 * It is inserted ahead of the <details> that holds the nav list, because below
 * 1024px that disclosure is closed and the sidebar scrolls away with the page.
 * Inside it, the search box would be invisible on a phone.
 *
 * Results are built with createElement and textContent. The index is our own
 * file, but it is still fetched content rendered into the page, and the rule
 * for that here is the same one buildBlogCard follows.
 */
function initializeDocsSearch() {
    const sidebar = document.querySelector('.docs-sidebar');
    if (!sidebar) return;

    const form = document.createElement('form');
    form.className = 'docs-search';
    form.setAttribute('role', 'search');
    form.addEventListener('submit', function (event) { event.preventDefault(); });

    const label = document.createElement('label');
    label.className = 'sr-only';
    label.htmlFor = 'docs-search-input';
    label.textContent = 'Search the documentation';

    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'docs-search-input';
    input.className = 'docs-search-input';
    input.placeholder = 'Search docs';
    input.autocomplete = 'off';
    input.setAttribute('aria-describedby', 'docs-search-status');

    const status = document.createElement('p');
    status.className = 'docs-search-status';
    status.id = 'docs-search-status';
    status.setAttribute('aria-live', 'polite');

    const results = document.createElement('ul');
    results.className = 'docs-search-results';
    results.setAttribute('role', 'list');

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(status);
    form.appendChild(results);
    sidebar.insertBefore(form, sidebar.firstChild);

    let records = null;
    let pending = null;
    let failed = false;

    function loadIndex() {
        if (records) return Promise.resolve(records);
        if (pending) return pending;
        pending = fetch('/docs/search-index.json')
            .then(function (response) {
                if (!response.ok) throw new Error('Failed to load the search index');
                return response.json();
            })
            .then(function (pages) {
                records = [];
                pages.forEach(function (page) {
                    page.headings.forEach(function (heading) {
                        records.push({
                            page: page.title,
                            url: page.url + '#' + heading.slug,
                            heading: heading.text,
                            depth: heading.depth,
                            headingLower: heading.text.toLowerCase(),
                            haystack: (heading.text + ' ' + page.title + ' ' + heading.body).toLowerCase()
                        });
                    });
                });
                return records;
            });
        return pending;
    }

    function rank(terms, query) {
        const hits = [];
        records.forEach(function (record) {
            let score = 0;
            for (let i = 0; i < terms.length; i++) {
                const term = terms[i];
                // Every term has to appear somewhere, or the result is noise.
                if (record.haystack.indexOf(term) === -1) return;
                if (record.headingLower === term) score += 100;
                else if (record.headingLower.indexOf(term) === 0) score += 50;
                else if (record.headingLower.indexOf(term) !== -1) score += 25;
                else score += 1;
            }
            // The whole query outranks any one word inside it. Scoring terms
            // alone put the heading "Mode" above "Isolate Mode" for the query
            // "isolate mode", because an exact hit on one term beat a partial
            // hit on both.
            if (record.headingLower === query) score += 200;
            else if (record.headingLower.indexOf(query) !== -1) score += 80;
            // A section outranks a subsection when nothing else separates them.
            if (record.depth === 2) score += 2;
            hits.push({ record: record, score: score });
        });
        hits.sort(function (a, b) {
            return b.score - a.score || a.record.heading.localeCompare(b.record.heading);
        });
        return hits.slice(0, 12);
    }

    // Wraps each matched run in <mark> without ever assigning markup.
    function highlight(text, terms) {
        const fragment = document.createDocumentFragment();
        const lower = text.toLowerCase();
        let index = 0;
        while (index < text.length) {
            let at = -1;
            let length = 0;
            terms.forEach(function (term) {
                const found = lower.indexOf(term, index);
                if (found !== -1 && (at === -1 || found < at)) {
                    at = found;
                    length = term.length;
                }
            });
            if (at === -1) {
                fragment.appendChild(document.createTextNode(text.slice(index)));
                break;
            }
            if (at > index) fragment.appendChild(document.createTextNode(text.slice(index, at)));
            const mark = document.createElement('mark');
            mark.textContent = text.slice(at, at + length);
            fragment.appendChild(mark);
            index = at + length;
        }
        return fragment;
    }

    function render(hits, terms) {
        results.textContent = '';
        hits.forEach(function (hit) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = hit.record.url;

            const heading = document.createElement('span');
            heading.className = 'docs-search-result-heading';
            heading.appendChild(highlight(hit.record.heading, terms));

            const page = document.createElement('span');
            page.className = 'docs-search-result-page';
            page.textContent = hit.record.page;

            link.appendChild(heading);
            link.appendChild(page);
            item.appendChild(link);
            results.appendChild(item);
        });
    }

    function clear() {
        results.textContent = '';
        status.textContent = '';
    }

    function run() {
        const query = input.value.trim();
        if (query.length < 2) {
            clear();
            return;
        }
        if (failed) return;
        loadIndex()
            .then(function () {
                const lowered = query.toLowerCase();
                const terms = lowered.split(/\s+/).filter(Boolean);
                const hits = rank(terms, lowered);
                render(hits, terms);
                if (!hits.length) {
                    status.textContent = 'No matches. Try a shorter term.';
                } else {
                    status.textContent = hits.length === 1 ? '1 result' : hits.length + ' results';
                }
            })
            .catch(function () {
                // The nav list is static markup and is untouched, so a reader
                // who lands here still has all 14 pages a click away.
                failed = true;
                clear();
                status.textContent = 'Search is unavailable. The page list below still works.';
            });
    }

    input.addEventListener('input', debounce(run, 150));
    // Warm the fetch on focus so the first keystroke does not wait on it.
    input.addEventListener('focus', function () { if (!failed) loadIndex().catch(function () {}); });

    form.addEventListener('keydown', function (event) {
        const links = Array.prototype.slice.call(results.querySelectorAll('a'));
        if (event.key === 'Escape') {
            input.value = '';
            clear();
            input.focus();
            return;
        }
        if (!links.length) return;
        const at = links.indexOf(document.activeElement);
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            links[at === -1 ? 0 : Math.min(at + 1, links.length - 1)].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (at <= 0) input.focus();
            else links[at - 1].focus();
        } else if (event.key === 'Enter' && document.activeElement === input) {
            event.preventDefault();
            links[0].click();
        }
    });
}


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
 * Adds a copy control to every command block.
 *
 * The block it exists for is the two-chart install on the homepage: a reader
 * who was forwarded the link is there to run those commands, and on a phone the
 * `<pre>` scrolls horizontally, so the chart coordinates are the part they
 * cannot reach. Selecting wrapped text by hand on a touch screen is the worst
 * case this fixes.
 *
 * Nothing is injected when the Clipboard API is unavailable: a visible button
 * that silently fails is worse than no button. `writeText` needs a secure
 * context, so this is a no-op over plain http other than localhost.
 */
function initializeCopyButtons() {
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        return;
    }

    const blocks = document.querySelectorAll('.content-wrapper pre, .docs-content pre');

    blocks.forEach(function(pre) {
        const code = pre.querySelector('code');
        if (!code || pre.parentElement.classList.contains('code-block-wrapper')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-button';
        button.textContent = 'Copy';
        // The block has no accessible name of its own, so say what is copied.
        button.setAttribute('aria-label', 'Copy command to clipboard');
        wrapper.appendChild(button);

        let revert = null;

        button.addEventListener('click', function() {
            navigator.clipboard.writeText(code.textContent).then(function() {
                setState('Copied', 'Command copied to clipboard', true);
            }).catch(function() {
                // Permission denied or a non-secure context that slipped past
                // the guard above. Say so rather than showing a false success.
                setState('Press Ctrl+C', 'Copying failed, select the text and copy manually', false);
            });
        });

        function setState(label, description, copied) {
            button.textContent = label;
            button.setAttribute('aria-label', description);
            button.classList.toggle('copied', copied);
            window.clearTimeout(revert);
            revert = window.setTimeout(function() {
                button.textContent = 'Copy';
                button.setAttribute('aria-label', 'Copy command to clipboard');
                button.classList.remove('copied');
            }, 2000);
        }
    });
}


/**
 * Reveal the fixed mobile "Start free" bar once the hero buttons scroll out of
 * view, and hide it again when they return.
 *
 * Only index.html carries the bar, so this is a no-op everywhere else. The bar
 * is hidden above 1024px by CSS alone; the observer still runs there, which is
 * harmless, because toggling a class on an element with `display: none` paints
 * nothing. Bailing out without IntersectionObserver leaves the bar in its
 * CSS resting state, translated off-screen, rather than stuck open.
 */
function initializeMobileCtaBar() {
    const bar = document.getElementById('mobile-cta-bar');

    if (!bar || typeof IntersectionObserver !== 'function') {
        return;
    }

    // Every in-page call to action. While any one of them is on screen the bar
    // is a duplicate of a button the reader can already press, which is most
    // visible at the very bottom where the pilot CTA and the bar would show
    // two identical "Start free" buttons at once. .pricing-cta is in the list
    // because /pricing's Free card carries its own "Start free".
    const inPageCtas = document.querySelectorAll('.hero-buttons, .cta-actions, .pricing-cta');

    if (!inPageCtas.length) {
        return;
    }

    const onScreen = new Set();

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                onScreen.add(entry.target);
            } else {
                onScreen.delete(entry.target);
            }
        });
        bar.classList.toggle('is-visible', onScreen.size === 0);
    });

    inPageCtas.forEach(function(el) {
        observer.observe(el);
    });
}
