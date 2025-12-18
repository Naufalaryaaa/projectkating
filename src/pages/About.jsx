import React from 'react';

const About = () => {
  return (
    <div>
      <div className="about-strip" style={{padding: '150px 0'}}>
        <div className="container">
          <h1 style={{color: 'white', fontSize: '60px', marginBottom: '40px'}}>Global Scale,<br/>Local Soul.</h1>
          <p style={{color: '#ccc', fontSize: '20px', maxWidth: '800px'}}>
            Digimax is more than an agency. We are a global network of innovators, 
            creators, and strategists working together to shape the future.
          </p>
        </div>
      </div>
      <div className="container section-padding">
        <div className="split-section" style={{minHeight: 'auto', gridTemplateColumns: '1fr 1fr', gap: '60px'}}>
          <div>
            <h2>Our History</h2>
            <p>Founded in 2024, we started with a simple belief: data and creativity should never be separated.</p>
          </div>
          <div>
            <h2>Our Mission</h2>
            <p>To innovate for impact. We don't just make ads; we create experiences that matter to people.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;