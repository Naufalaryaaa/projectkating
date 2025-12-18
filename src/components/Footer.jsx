import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div>
        <h2>DIGIMAX.</h2>
        <p style={{color: '#666', maxWidth: '300px'}}>
          Part of Digimax Group Inc.<br/>Innovating for a better future.
        </p>
      </div>
      <div style={{display:'flex', gap:'80px', flexWrap:'wrap'}}>
        <div>
          <h4 style={{color:'#fff', marginBottom:'20px'}}>Company</h4>
          <ul className="footer-links">
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>&copy; 2024 Digimax Group. All Rights Reserved.</span>
    </div>
  </footer>
);

export default Footer;