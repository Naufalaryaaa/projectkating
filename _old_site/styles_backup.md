# CSS Backup - styles.css

```css
/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
    overflow-x: hidden;
}

/* Loading Overlay */
#loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.8s ease, visibility 0.8s ease;
}

#loading-overlay.hidden {
    opacity: 0;
    visibility: hidden;
}

.loading-content {
    text-align: center;
    animation: fadeInUp 0.8s ease;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

.loading-content p {
    font-size: 1rem;
    color: #666;
    font-weight: 300;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Smooth reveal animations */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

.reveal.active {
    opacity: 1;
    transform: translateY(0);
}

.reveal-left {
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease;
}

.reveal-left.active {
    opacity: 1;
    transform: translateX(0);
}

.reveal-right {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease;
}

.reveal-right.active {
    opacity: 1;
    transform: translateX(0);
}

.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Black & White Website Aesthetic */
:root {
    --primary-black: #000000;
    --secondary-black: #1a1a1a;
    --dark-gray: #333333;
    --medium-gray: #666666;
    --light-gray: #999999;
    --lighter-gray: #cccccc;
    --very-light-gray: #f5f5f5;
    --white: #ffffff;
    --text-dark: #1a1a1a;
    --text-gray: #666666;
    --text-light: #999999;
    --background-light: #f9f9f9;
    --border-color: #e0e0e0;
    --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.12);
    --shadow-strong: 0 8px 32px rgba(0, 0, 0, 0.16);
}

/* Website Navigation */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
    border-bottom: 1px solid var(--border-color);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo h2 {
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--primary-black);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: var(--text-dark);
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 6px;
}

.nav-menu a:hover {
    color: var(--primary-black);
    background: var(--very-light-gray);
}

.nav-actions {
    display: flex;
    align-items: center;
}

.cta-btn {
    background: var(--primary-black);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cta-btn:hover {
    background: var(--secondary-black);
    transform: translateY(-1px);
    box-shadow: var(--shadow-medium);
}

/* Mobile Hamburger Menu */
.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 0.5rem;
}

.hamburger span {
    width: 25px;
    height: 2px;
    background-color: var(--primary-black);
    margin: 3px 0;
    transition: 0.3s;
    border-radius: 1px;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

/* Hero Section with Video Background */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.hero-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
}

.hero-video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.video-fallback {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--dark-gray) 0%, var(--primary-black) 100%);
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
}

.hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
}

.hero-content h1 {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.highlight {
    color: white;
    position: relative;
}

.highlight::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 1px;
}

.hero-content p {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    max-width: 600px;
    line-height: 1.6;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.social-proof {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: center;
}

.proof-item {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.proof-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: white;
    line-height: 1;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.proof-text {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 0;
    flex-wrap: wrap;
    justify-content: center;
}

/* Website-style Buttons */
.btn-primary, .btn-secondary {
    padding: 14px 28px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transform: translateY(0);
    min-height: 44px;
    min-width: 140px;
    text-align: center;
    cursor: pointer;
    font-size: 1rem;
    border: 2px solid transparent;
}

.btn-primary {
    background: var(--primary-black);
    color: white;
    border-color: var(--primary-black);
}

.btn-primary:hover {
    background: var(--secondary-black);
    border-color: var(--secondary-black);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

.btn-primary:active {
    transform: translateY(0);
    box-shadow: var(--shadow-light);
}

.btn-secondary {
    background: white;
    color: var(--primary-black);
    border-color: var(--primary-black);
}

.btn-secondary:hover {
    background: var(--primary-black);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

.btn-secondary:active {
    transform: translateY(0);
    box-shadow: var(--shadow-light);
}

.btn-outline {
    background: transparent;
    color: var(--primary-black);
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.btn-outline:hover {
    background: var(--primary-black);
    color: white;
    border-color: var(--primary-black);
}

/* Section Separators */
.section-separator {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-color), transparent);
    margin: 0 auto;
    max-width: 1200px;
}

.section-separator:nth-of-type(even) {
    background: linear-gradient(90deg, transparent, var(--lighter-gray), transparent);
}

/* Alternative separator styles */
.section-separator.dots {
    height: 20px;
    background: radial-gradient(circle, var(--border-color) 2px, transparent 2px);
    background-size: 20px 20px;
    background-position: center;
    opacity: 0.5;
}

.section-separator.wave {
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23e0e0e0'/%3E%3C/svg%3E") center/cover no-repeat;
}

/* Section Headers */
.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 1rem;
}

.section-header p {
    font-size: 1.1rem;
    color: var(--text-gray);
    max-width: 600px;
    margin: 0 auto;
}

/* Services Section */
.services {
    padding: 100px 20px;
    background-color: white;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

/* Website-style Service Cards */
.service-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    position: relative;
}

.service-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-medium);
    border-color: var(--primary-black);
}

.service-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.service-header h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-dark);
}

.service-badge {
    background: var(--primary-black);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
}

.service-card p {
    color: var(--text-gray);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.service-features {
    list-style: none;
    margin-bottom: 2rem;
}

.service-features li {
    padding: 0.5rem 0;
    color: var(--text-dark);
    position: relative;
    padding-left: 1.5rem;
}

.service-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--primary-black);
    font-weight: bold;
}

.service-cta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
}

.price {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-dark);
}

.services-cta {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--very-light-gray);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.services-cta h3 {
    font-size: 1.5rem;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.services-cta p {
    color: var(--text-gray);
    margin-bottom: 2rem;
}

/* Portfolio Section */
.portfolio {
    padding: 100px 20px;
    background: white;
}

.portfolio-filter {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
}

.filter-btn {
    background: white;
    border: 2px solid var(--primary-green);
    color: var(--primary-green);
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    min-height: 44px;
}

.filter-btn.active,
.filter-btn:hover {
    background: var(--primary-green);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

/* Instagram-style Portfolio Cards */
.portfolio-card.instagram-style {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-light);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    border: 1px solid #e5e7eb;
}

.portfolio-card.instagram-style:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-strong);
}

.portfolio-image {
    position: relative;
    height: 250px;
    overflow: hidden;
}

.image-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--light-green), rgba(0, 168, 89, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: var(--primary-green);
}

.portfolio-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-card:hover .portfolio-overlay {
    opacity: 1;
}

.view-btn {
    background: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.view-btn:hover {
    background: var(--primary-green);
    color: white;
    transform: scale(1.05);
}

.portfolio-info {
    padding: 1.5rem;
}

.portfolio-info h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 0.75rem;
}

.portfolio-info p {
    color: var(--text-gray);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.portfolio-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.stat {
    background: var(--light-green);
    color: var(--primary-green);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
}

.portfolio-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.tag {
    background: var(--background-light);
    color: var(--text-gray);
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    border: 1px solid #e5e7eb;
}

.portfolio-cta {
    text-align: center;
    padding: 2rem;
    background: var(--light-green);
    border-radius: 16px;
    border: 2px solid var(--primary-green);
}

.portfolio-cta h3 {
    font-size: 1.5rem;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
}

.portfolio-cta p {
    color: var(--text-gray);
    margin-bottom: 1.5rem;
}

/* About Section */
.about {
    padding: 100px 20px;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text h2 {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
    color: #000;
}

.about-text p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.7;
}

.stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
}

.stat {
    text-align: center;
}

.stat h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 0.5rem;
}

.stat p {
    color: #666;
    font-size: 0.9rem;
}

.about-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Contact Section */
.contact {
    padding: 100px 20px;
    background-color: #f8f9fa;
}

.contact h2 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
    color: #000;
}

.contact > p {
    text-align: center;
    color: #666;
    margin-bottom: 3rem;
    font-size: 1.1rem;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1000px;
    margin: 0 auto;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.contact-item h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #000;
}

.contact-item p {
    color: #666;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #000;
}

.form-group textarea {
    resize: vertical;
}

/* Footer */
.footer {
    background-color: #000;
    color: #fff;
    text-align: center;
    padding: 2rem 0;
}

/* Website Responsive Design */

@media (max-width: 768px) {
    /* Show hamburger menu on mobile */
    .hamburger {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 80px;
        flex-direction: column;
        background-color: white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: var(--shadow-medium);
        padding: 2rem 0;
        border-top: 1px solid var(--border-color);
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 0.5rem 0;
    }
    
    .nav-actions {
        display: none;
    }
    
    /* Hero section mobile adjustments */
    .hero {
        min-height: 100vh;
        padding: 0;
    }
    
    .hero-content {
        padding: 120px 20px 60px;
    }
    
    .hero-content h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        line-height: 1.3;
    }
    
    .hero-content p {
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .social-proof {
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1.5rem;
        align-items: center;
    }
    
    .proof-item {
        width: 100%;
        max-width: 200px;
    }
    
    .proof-number {
        font-size: 1.5rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: 100%;
    }
    
    .btn-primary, .btn-secondary {
        width: 100%;
        max-width: 280px;
    }
    
    /* Services grid mobile */
    .services-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    /* Portfolio grid mobile */
    .portfolio-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .portfolio-filter {
        gap: 0.5rem;
    }
    
    .filter-btn {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }
    
    /* About section mobile */
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .stats {
        justify-content: center;
        gap: 1rem;
    }
    
    /* Contact section mobile */
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    /* Section padding adjustments */
    .services, .portfolio, .about, .contact {
        padding: 60px 20px;
    }
    
    .section-header h2 {
        font-size: 2rem;
    }
    
    .section-header p {
        font-size: 1rem;
    }
}

/* Extra small screens (phones in portrait) */
@media (max-width: 480px) {
    .hero-content h1 {
        font-size: 2rem;
        line-height: 1.3;
    }
    
    .hero-content p {
        font-size: 0.95rem;
    }
    
    .social-proof {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
    
    .proof-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-align: left;
    }
    
    .proof-number {
        font-size: 1.3rem;
    }
    
    .proof-text {
        font-size: 0.8rem;
    }
    
    .btn-primary, .btn-secondary {
        width: 100%;
        padding: 16px 24px;
        font-size: 0.95rem;
    }
    
    /* Service cards mobile optimization */
    .service-card {
        padding: 1.5rem;
    }
    
    .service-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
    
    .service-cta {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    /* Portfolio cards mobile */
    .portfolio-image {
        height: 200px;
    }
    
    .image-placeholder {
        font-size: 3rem;
    }
    
    .portfolio-stats {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .stat {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
    
    /* Section headers mobile */
    .section-header h2 {
        font-size: 1.8rem;
    }
    
    .section-header p {
        font-size: 0.95rem;
    }
    
    /* CTA sections mobile */
    .services-cta, .portfolio-cta {
        padding: 2rem 1.5rem;
    }
    
    .services-cta h3, .portfolio-cta h3 {
        font-size: 1.3rem;
    }
    
    .services-cta p, .portfolio-cta p {
        font-size: 0.9rem;
    }
}

/* Large screens optimization */
@media (min-width: 1200px) {
    .hero-content h1 {
        font-size: 4rem;
    }
    
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .portfolio-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
    .services-grid {
        grid-template-columns: repeat(4, 1fr);
    }
    
    .portfolio-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

## Notes
This CSS file contains the complete styling for the DigiMax portfolio website, including:
- Black and white color scheme
- Video background hero section
- Professional navigation
- Responsive design for all devices
- Section separators
- Modern animations and transitions