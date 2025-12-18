import React from 'react';

const workData = [
  { id: 1, title: "Future of Mobility", category: "Automotive", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1000" },
  { id: 2, title: "Sustainable Living", category: "Lifestyle", img: "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?auto=format&fit=crop&q=80&w=1000" },
  { id: 3, title: "Digital Banking", category: "Fintech", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000" },
  { id: 4, title: "Global Rebrand", category: "Corporate", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" }
];

const Work = () => {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="hero-intro" style={{paddingTop: '40px'}}>
          <h1>Selected Work</h1>
          <p>Explore how we help brands grow through digital innovation.</p>
        </div>
        
        <div className="work-grid" style={{marginTop: '60px'}}>
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
    </div>
  );
};

export default Work;