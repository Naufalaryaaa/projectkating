# HTML Backup - index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Marketing & Content Agency</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Loading Overlay -->
    <div id="loading-overlay">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    </div>

    <!-- Website Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2>DigiMax</h2>
            </div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="nav-actions">
                <button class="cta-btn">Get Started</button>
            </div>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <main>
        <section id="home" class="hero">
            <div class="hero-video">
                <video autoplay muted loop playsinline>
                    <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4">
                    <!-- Fallback for browsers that don't support video -->
                    <div class="video-fallback"></div>
                </video>
                <div class="hero-overlay"></div>
            </div>
            
            <div class="hero-content">
                <h1 class="reveal-left">Grow Your Business with<br><span class="highlight">Professional Digital Marketing</span></h1>
                <p class="reveal-left stagger-1">We help brands achieve remarkable growth through proven digital marketing strategies, quality content creation, and data-driven campaigns that deliver exceptional ROI.</p>
                
                <div class="social-proof reveal-left stagger-1">
                    <div class="proof-item">
                        <span class="proof-number">200%</span>
                        <span class="proof-text">Sales Increase</span>
                    </div>
                    <div class="proof-item">
                        <span class="proof-number">500K+</span>
                        <span class="proof-text">Followers Generated</span>
                    </div>
                    <div class="proof-item">
                        <span class="proof-number">24/7</span>
                        <span class="proof-text">Support</span>
                    </div>
                </div>

                <div class="hero-buttons reveal-left stagger-2">
                    <a href="#contact" class="btn-primary">
                        <span>Get Free Consultation</span>
                    </a>
                    <a href="#portfolio" class="btn-secondary">
                        <span>View Our Work</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Section Separator -->
        <div class="section-separator"></div>

        <section id="services" class="services">
            <div class="container">
                <div class="section-header reveal">
                    <h2>Our Services</h2>
                    <p>Comprehensive digital marketing solutions to accelerate your business growth</p>
                </div>

                <div class="services-grid">
                    <div class="service-card reveal stagger-1">
                        <div class="service-header">
                            <h3>Digital Marketing</h3>
                            <span class="service-badge">Most Popular</span>
                        </div>
                        <p>Complete digital marketing strategies including SEO, SEM, social media marketing, and performance advertising that drive high conversions.</p>
                        <ul class="service-features">
                            <li>SEO Optimization</li>
                            <li>Google Ads Management</li>
                            <li>Social Media Advertising</li>
                            <li>Performance Analytics</li>
                        </ul>
                        <div class="service-cta">
                            <span class="price">Starting at $2,500/month</span>
                            <button class="btn-outline">Learn More</button>
                        </div>
                    </div>

                    <div class="service-card reveal stagger-2">
                        <div class="service-header">
                            <h3>Content Creation</h3>
                        </div>
                        <p>Creative and engaging content for all platforms - from social media posts to viral videos that boost brand awareness and engagement.</p>
                        <ul class="service-features">
                            <li>Video Production</li>
                            <li>Graphic Design</li>
                            <li>Copywriting</li>
                            <li>Brand Storytelling</li>
                        </ul>
                        <div class="service-cta">
                            <span class="price">Starting at $1,500/month</span>
                            <button class="btn-outline">Learn More</button>
                        </div>
                    </div>

                    <div class="service-card reveal stagger-3">
                        <div class="service-header">
                            <h3>Brand Strategy</h3>
                        </div>
                        <p>Strategic brand positioning and messaging that differentiates your business in the competitive marketplace.</p>
                        <ul class="service-features">
                            <li>Brand Identity Development</li>
                            <li>Market Research</li>
                            <li>Competitor Analysis</li>
                            <li>Brand Guidelines</li>
                        </ul>
                        <div class="service-cta">
                            <span class="price">Starting at $5,000/project</span>
                            <button class="btn-outline">Learn More</button>
                        </div>
                    </div>

                    <div class="service-card reveal stagger-4">
                        <div class="service-header">
                            <h3>Analytics & Insights</h3>
                        </div>
                        <p>Deep data analysis and performance tracking to optimize your marketing efforts and maximize business ROI.</p>
                        <ul class="service-features">
                            <li>Performance Reporting</li>
                            <li>ROI Tracking</li>
                            <li>Data Analysis</li>
                            <li>Growth Recommendations</li>
                        </ul>
                        <div class="service-cta">
                            <span class="price">Starting at $1,000/month</span>
                            <button class="btn-outline">Learn More</button>
                        </div>
                    </div>
                </div>

                <div class="services-cta reveal">
                    <h3>Need a custom package?</h3>
                    <p>Discuss your digital marketing needs with our expert team</p>
                    <button class="btn-primary">Schedule Consultation</button>
                </div>
            </div>
        </section>

        <!-- Section Separator -->
        <div class="section-separator"></div>

        <section id="portfolio" class="portfolio">
            <div class="container">
                <div class="section-header reveal">
                    <h2>Portfolio Kami</h2>
                    <p>Lihat hasil kerja kami yang telah membantu klien mencapai target bisnis</p>
                </div>

                <div class="portfolio-filter reveal">
                    <button class="filter-btn active" data-filter="all">Semua</button>
                    <button class="filter-btn" data-filter="social-media">Social Media</button>
                    <button class="filter-btn" data-filter="website">Website</button>
                    <button class="filter-btn" data-filter="ads">Advertising</button>
                    <button class="filter-btn" data-filter="branding">Branding</button>
                </div>

                <div class="portfolio-grid">
                    <div class="portfolio-card instagram-style reveal stagger-1" data-category="social-media">
                        <div class="portfolio-image">
                            <div class="image-placeholder">📱</div>
                            <div class="portfolio-overlay">
                                <button class="view-btn">👁️ Lihat Detail</button>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h3>Social Media Campaign - F&B Brand</h3>
                            <p>Meningkatkan engagement rate hingga 350% dan follower growth 45%</p>
                            <div class="portfolio-stats">
                                <span class="stat">350% Engagement ↗️</span>
                                <span class="stat">45% Follower Growth 📈</span>
                            </div>
                            <div class="portfolio-tags">
                                <span class="tag">Instagram</span>
                                <span class="tag">TikTok</span>
                                <span class="tag">Content Strategy</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-card instagram-style reveal stagger-2" data-category="website">
                        <div class="portfolio-image">
                            <div class="image-placeholder">💻</div>
                            <div class="portfolio-overlay">
                                <button class="view-btn">👁️ Lihat Detail</button>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h3>E-commerce Website - Fashion Brand</h3>
                            <p>Redesign website yang meningkatkan conversion rate hingga 280%</p>
                            <div class="portfolio-stats">
                                <span class="stat">280% Conversion ↗️</span>
                                <span class="stat">65% Page Speed 🚀</span>
                            </div>
                            <div class="portfolio-tags">
                                <span class="tag">Web Design</span>
                                <span class="tag">UX/UI</span>
                                <span class="tag">E-commerce</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-card instagram-style reveal stagger-3" data-category="ads">
                        <div class="portfolio-image">
                            <div class="image-placeholder">🎯</div>
                            <div class="portfolio-overlay">
                                <button class="view-btn">👁️ Lihat Detail</button>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h3>Google Ads Campaign - Tech Startup</h3>
                            <p>Kampanye Google Ads yang menghasilkan ROAS 400% dalam 3 bulan</p>
                            <div class="portfolio-stats">
                                <span class="stat">400% ROAS 💰</span>
                                <span class="stat">120% Lead Generation 📊</span>
                            </div>
                            <div class="portfolio-tags">
                                <span class="tag">Google Ads</span>
                                <span class="tag">PPC</span>
                                <span class="tag">Lead Generation</span>
                            </div>
                        </div>
                    </div>

                    <div class="portfolio-card instagram-style reveal stagger-4" data-category="branding">
                        <div class="portfolio-image">
                            <div class="image-placeholder">🎨</div>
                            <div class="portfolio-overlay">
                                <button class="view-btn">👁️ Lihat Detail</button>
                            </div>
                        </div>
                        <div class="portfolio-info">
                            <h3>Complete Rebranding - Local Restaurant</h3>
                            <p>Rebranding lengkap yang meningkatkan brand awareness 200%</p>
                            <div class="portfolio-stats">
                                <span class="stat">200% Brand Awareness ↗️</span>
                                <span class="stat">150% Customer Retention 💯</span>
                            </div>
                            <div class="portfolio-tags">
                                <span class="tag">Logo Design</span>
                                <span class="tag">Brand Identity</span>
                                <span class="tag">Marketing Collateral</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="portfolio-cta reveal">
                    <h3>Tertarik dengan hasil seperti ini? 🤩</h3>
                    <p>Diskusikan project Anda dengan tim expert kami sekarang!</p>
                    <button class="btn-primary">📞 Hubungi Kami Sekarang</button>
                </div>
            </div>
        </section>

        <!-- Section Separator -->
        <div class="section-separator"></div>

        <section id="about" class="about">
            <div class="container">
                <div class="about-content">
                    <div class="about-text reveal-left">
                        <h2>About Us</h2>
                        <p>We are a dynamic digital marketing agency focused on helping businesses thrive in the digital landscape. With years of experience in content creation, strategic marketing, and brand development, we deliver results that matter.</p>
                        <p>Our team combines creativity with data-driven approaches to create campaigns that not only look great but perform exceptionally well.</p>
                        <div class="stats">
                            <div class="stat reveal stagger-1">
                                <h3>50+</h3>
                                <p>Successful Projects</p>
                            </div>
                            <div class="stat reveal stagger-2">
                                <h3>25+</h3>
                                <p>Happy Clients</p>
                            </div>
                            <div class="stat reveal stagger-3">
                                <h3>3+</h3>
                                <p>Years Experience</p>
                            </div>
                        </div>
                    </div>
                    <div class="about-image reveal-right">
                        <div class="placeholder-image"></div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2>Let's Work Together</h2>
                <p>Ready to take your digital presence to the next level? Get in touch with us today.</p>
                <div class="contact-content">
                    <div class="contact-info">
                        <div class="contact-item">
                            <h3>Email</h3>
                            <p>hello@agency.com</p>
                        </div>
                        <div class="contact-item">
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div class="contact-item">
                            <h3>Location</h3>
                            <p>New York, NY</p>
                        </div>
                    </div>
                    <form class="contact-form">
                        <div class="form-group">
                            <input type="text" id="name" name="name" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Digital Marketing Agency. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```