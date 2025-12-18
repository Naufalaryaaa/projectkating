// Website Interactions
document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loading-overlay');

    // Hide loading overlay after page loads
    window.addEventListener('load', function() {
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');

                // Trigger initial animations
                setTimeout(() => {
                    triggerInitialAnimations();
                    animateCounters();
                }, 200);
            }, 800);
        }
    });

    // Mobile Navigation
    initializeMobileNavigation();

    // Portfolio Filter (aman walaupun filter-btn sudah tidak dipakai)
    initializePortfolioFilter();

    // Smooth interactions
    initializeSmoothInteractions();

    // Animated Counter
    animateCounters();
});

// =============================
// MOBILE NAVIGATION
// =============================
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    if (!hamburger || !mobileSidebar || !mobileOverlay) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileSidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : '';
    });

    // Close on any sidebar link click
    document.querySelectorAll('.sidebar-link, .sidebar-cta a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    mobileOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileSidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// =============================
// PORTFOLIO FILTER (SAFE MODE)
// =============================
function initializePortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Jika tidak ada filter button, fungsi ini dilewati
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// =============================
// HOVER INTERACTIONS
// =============================
function initializeSmoothInteractions() {
    const interactiveElements = document.querySelectorAll(
        'button, .btn-primary, .btn-secondary, .service-card, .portfolio-card'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// =============================
// HERO INITIAL ANIMATIONS
// =============================
function triggerInitialAnimations() {
    const heroElements = document.querySelectorAll('#home .reveal, #home .reveal-left, #home .reveal-right');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('active');
        }, index * 250 + 400);
    });
}

// =============================
// NAVBAR SCROLL EFFECT
// =============================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// =============================
// SCROLL REVEAL ANIMATIONS
// =============================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const staggerDelay = 
                el.classList.contains('stagger-1') ? 150 :
                el.classList.contains('stagger-2') ? 300 :
                el.classList.contains('stagger-3') ? 450 :
                el.classList.contains('stagger-4') ? 600 : 0;

            setTimeout(() => { el.classList.add('active'); }, staggerDelay);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

// =============================
// STAT COUNTERS
// =============================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const duration = 2000;

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.dataset.suffix || '');
            }
        }

        setTimeout(updateCounter, 800);
    });
}

// =============================
// PARALLAX (AMAN)
// =============================
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background');

    if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    if (heroBackground) heroBackground.style.transform = `translateY(${scrolled * 0.25}px)`;

    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// =============================
// SMOOTH SCROLLING
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const offsetTop = target.offsetTop - 80;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});
