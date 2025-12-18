// App.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, Check } from 'lucide-react';
import './App.css';

// --- DATA ---
const services = [
  {
    title: "Digital Marketing",
    desc: "SEO, SEM, Social Media, Performance Ads.",
    features: ["SEO Optimization", "Google Ads", "Social Media", "Analytics"]
  },
  {
    title: "Content Creation",
    desc: "Visual production and creative storytelling.",
    features: ["Video Production", "Graphic Design", "Copywriting", "Branding"]
  },
  {
    title: "Brand Strategy",
    desc: "Identity, positioning & market analysis.",
    features: ["Brand Identity", "Market Research", "Competitor Analysis", "Guidelines"]
  },
  {
    title: "Analytics & Data",
    desc: "Deep insights for growth optimization.",
    features: ["Reporting", "ROI Tracking", "User Behavior", "Strategy"]
  }
];

const portfolioItems = [
  { id: 1, title: "F&B Growth", category: "social", stat: "+350% Engagement", desc: "Organic growth strategy" },
  { id: 2, title: "Tech Corp", category: "web", stat: "400% ROAS", desc: "Performance Ads Integration" },
  { id: 3, title: "Lifestyle", category: "branding", stat: "Rebrand 2024", desc: "Visual Identity System" },
  { id: 4, title: "E-Commerce", category: "web", stat: "2.8% Conv. Rate", desc: "UX/UI Overhaul" },
  { id: 5, title: "Auto Motif", category: "social", stat: "Viral Campaign", desc: "KOL Management" },
  { id: 6, title: "Fintech", category: "branding", stat: "Market Entry", desc: "Go-to-market Strategy" }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">DIGIMAX.</div>
        
        <ul className="nav-links">
          <li><a href="#home">Work</a></li>
          <li><a href="#services">Expertise</a></li>
          <li><a href="#about">Agency</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
            style={{
              position: 'fixed', top: '80px', left: 0, width: '100%', 
              background: 'white', borderBottom: '1px solid black', padding: '20px'
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li><a href="#home" onClick={() => setIsOpen(false)}>Work</a></li>
              <li><a href="#services" onClick={() => setIsOpen(false)}>Expertise</a></li>
              <li><a href="#about" onClick={() => setIsOpen(false)}>Agency</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
};

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            WE ACCELERATE <br/>
            DIGITAL GROWTH.
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hero-buttons"
            style={{ display: 'flex', gap: '20px' }}
          >
            <a href="#contact" className="btn btn-primary">Start Project</a>
            <a href="#work" className="btn btn-secondary">View Case Studies</a>
          </motion.div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number"><AnimatedCounter target={50} suffix="+" /></span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number"><AnimatedCounter target={98} suffix="%" /></span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container">
        <h2 style={{ marginBottom: '60px', fontSize: '48px' }}>Our Expertise</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>{service.title}</h3>
              <p style={{ marginBottom: '20px', color: '#666' }}>{service.desc}</p>
              <ul className="service-features">
                {service.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="work" className="section-padding" style={{ background: '#fcfcfc' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px' }}>Selected Work</h2>
          <div className="portfolio-filter">
            {['all', 'social', 'web', 'branding'].map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="portfolio-grid">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={item.id}
                className="portfolio-card"
              >
                <div style={{ marginBottom: 'auto' }}>
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: '#888' }}>
                    {item.category}
                  </p>
                  <h3>{item.title}</h3>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{item.stat}</div>
                  <p>{item.desc}</p>
                </div>
                <div style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
                   <ArrowRight />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ background: '#111', color: '#fff' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: '60px', marginBottom: '40px' }}>AGENCY<br/>DNA.</h2>
          </div>
          <div style={{ borderLeft: '1px solid #333', paddingLeft: '40px' }}>
            <p style={{ fontSize: '24px', lineHeight: '1.4', marginBottom: '30px' }}>
              We are a digital marketing agency focused on helping brands grow through 
              strategy, content, and data-driven execution.
            </p>
            <p style={{ color: '#888' }}>
              Combining creativity and data to produce effective and impactful campaigns.
              Based in Indonesia, working globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h2>DIGIMAX.</h2>
            <p style={{ color: '#888', marginTop: '10px' }}>Jakarta, Indonesia</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p>&copy; 2024 Digital Marketing Agency.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', 
        background: '#fff', flexDirection: 'column' 
      }}>
        <div style={{ 
          width: '50px', height: '50px', border: '5px solid #000', 
          borderTopColor: 'transparent', borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Footer />
    </div>
  );
}

export default App;