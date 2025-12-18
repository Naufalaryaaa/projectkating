import React from 'react';
import { motion } from 'framer-motion';
import { Menu, ArrowRight, ArrowUpRight } from 'lucide-react';
import './App.css';

// --- DATA ---
const servicesData = [
  { title: "Media", desc: "Connecting brands with audiences through precision targeting.", features: ["Planning", "Buying", "Programmatic"] },
  { title: "Creative", desc: "Storytelling that builds culture and drives commerce.", features: ["Brand Identity", "Content", "Experience Design"] },
  { title: "CXM", desc: "Data-driven customer experience management.", features: ["Analytics", "CRM", "Personalization"] }
];

const workData = [
  { id: 1, title: "Future of Mobility", category: "Automotive", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "Sustainable Living", category: "Lifestyle", img: "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "Digital Banking", category: "Fintech", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, title: "Global Rebrand", category: "Corporate", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" }
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">DIGIMAX.</div>
    <ul className="nav-links">
      <li><a href="#work">Work</a></li>
      <li><a href="#services">Capabilities</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <Menu className="mobile-menu-icon" size={24} style={{ cursor: 'pointer' }} />
  </nav>
);

const Hero = () => (
  <>
    <section className="hero-intro">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1>We are Digimax</h1>
        <p>The integrated growth and transformation partner. We push the boundaries of business transformation for brands, people, and society.</p>
      </motion.div>
    </section>

    <section className="split-section">
      <div className="split-visual">
        <motion.img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
          alt="Visual" 
          initial={{ scale: 1.1 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 1.5 }}
        />
        <div className="visual-overlay">
          <h2>Innovating to Impact</h2>
        </div>
      </div>
      <div className="split-content">
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3>Our Promise:<br/>Innovation for Good</h3>
          <p>We combine deep consumer insight with cutting-edge technology to create meaningful experiences.</p>
          <a href="#about" className="btn-white">Find out more <ArrowRight size={16} /></a>
        </motion.div>
      </div>
    </section>
  </>
);

const Services = () => (
  <section id="services" className="section-padding bg-gray">
    <div className="container">
      <h2 className="text-center">Our Capabilities</h2>
      <div className="services-grid">
        {servicesData.map((s, i) => (
          <div key={i} className="service-card">
            <h3>{s.title}</h3>
            <p style={{marginBottom: '20px'}}>{s.desc}</p>
            <ul className="service-features">
              {s.features.map((f, idx) => <li key={idx}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = () => (
  <section id="work" className="section-padding">
    <div className="container">
      <div className="portfolio-header">
        <h2>Selected Work</h2>
        <a href="#" className="btn-link">View All Projects <ArrowRight size={16} /></a>
      </div>
      <div className="work-grid">
        {workData.map((item) => (
          <div key={item.id} className="work-card">
            <div className="work-image">
              <img src={item.img} alt={item.title} />
            </div>
            <span className="work-cat">{item.category}</span>
            <h3 className="work-title">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutStats = () => (
  <section id="about" className="about-strip">
    <div className="container about-grid">
      <div>
        <h2 style={{color: '#fff', marginBottom: '20px'}}>Global Scale,<br/>Local Soul.</h2>
        <p style={{color: '#aaa', fontSize: '18px'}}>
          With offices in 25 countries, we bring a global perspective to local challenges.
          Our team of experts is dedicated to driving growth.
        </p>
      </div>
      <div style={{display:'flex', gap: '60px'}}>
        <div>
          <span className="stat-number">50+</span>
          <span className="stat-label">Offices</span>
        </div>
        <div>
          <span className="stat-number">12k</span>
          <span className="stat-label">Experts</span>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="footer">
    <div className="footer-top">
      <div>
        <h2>DIGIMAX.</h2>
        <p style={{color: '#666', maxWidth: '300px'}}>
          Part of Digimax Group Inc.<br/>
          Innovating for a better future.
        </p>
      </div>
      
      <div style={{display:'flex', gap:'80px', flexWrap:'wrap'}}>
        <div>
          <h4 style={{color:'#fff', marginBottom:'20px'}}>Company</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Leadership</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{color:'#fff', marginBottom:'20px'}}>Connect</h4>
          <ul className="footer-links">
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <span>&copy; 2024 Digimax Group. All Rights Reserved.</span>
      <span>Privacy Policy &nbsp; | &nbsp; Terms of Use</span>
    </div>
  </footer>
);

// --- MAIN APP ---
function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <AboutStats />
      <Footer />
    </div>
  );
}

export default App;