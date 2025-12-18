import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="hero-intro">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1>We are Digimax</h1>
          <p>The integrated growth partner. We push the boundaries of business transformation.</p>
        </motion.div>
      </section>

      <section className="split-section">
        <div className="split-visual">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" alt="Visual" />
          <div className="visual-overlay"><h2>Innovating to Impact</h2></div>
        </div>
        <div className="split-content">
          <h3>Our Promise:<br/>Innovation for Good</h3>
          <p>We combine deep consumer insight with cutting-edge technology.</p>
          {/* Tombol ini sekarang menuju halaman About sungguhan */}
          <Link to="/about" className="btn-white">Find out more <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section-padding bg-gray">
        <div className="container">
          <h2 className="text-center">Our Capabilities</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Media</h3>
              <p>Connecting brands with audiences through precision targeting.</p>
            </div>
            <div className="service-card">
              <h3>Creative</h3>
              <p>Storytelling that builds culture and drives commerce.</p>
            </div>
            <div className="service-card">
              <h3>CXM</h3>
              <p>Data-driven customer experience management.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;