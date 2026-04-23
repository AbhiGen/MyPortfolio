'use client';

import Image from 'next/image';

/**
 * About section component.
 * @param {Object} props - Component props.
 * @param {Object} props.data - About data from portfolioData.
 */
export default function About({ data }) {
  return (
    <section id="about" className="fade-up" aria-labelledby="about-heading">
      <div className="section-head">
        <p className="section-subtitle">Discover</p>
        <h2 id="about-heading" className="section-title">About Me</h2>
      </div>
      
      <div className="about-grid">
        <div className="about-img-wrapper" data-tilt data-tilt-max="10" data-tilt-speed="400" style={{ position: 'relative', minHeight: '500px' }}>
          <Image 
            src={data.profileImg} 
            alt="Abhiram Bikkina Portrait" 
            fill
            className="about-img"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        
        <div className="about-content">
          <div className="about-stats">
            {data.stats.map((stat) => (
              <div key={stat.title} className="stat-box">
                <Image src={stat.icon} alt={`${stat.title} Icon`} className="stat-icon" width={28} height={28} />
                <h3>{stat.title}</h3>
                <p>{stat.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="about-text">
            {data.paragraphs.map((p, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: p }}></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
