'use client';

/**
 * Experience section component with timeline.
 * @param {Object} props - Component props.
 * @param {Array} props.experience - Array of experience objects.
 */
export default function Experience({ experience }) {
  return (
    <section id="experience" className="fade-up" aria-labelledby="journey-heading">
      <div className="section-head">
        <p className="section-subtitle">Journey</p>
        <h2 id="journey-heading" className="section-title">Experience & Honors</h2>
      </div>
      
      <div className="timeline" role="list">
        {experience.map((item, index) => (
          <div key={index} className="timeline-item" role="listitem">
            <div className="timeline-dot" aria-hidden="true"></div>
            <div className="timeline-content">
              <span className="timeline-date">{item.year}</span>
              <h3>{item.title}</h3>
              <h4>{item.subtitle}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
