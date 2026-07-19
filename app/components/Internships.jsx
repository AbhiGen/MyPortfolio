'use client';

export default function Internships({ internships }) {
  if (!internships || internships.length === 0) return null;

  return (
    <section id="internships" className="fade-up" aria-labelledby="internships-heading">
      <div className="section-head">
        <p className="section-subtitle">Work</p>
        <h2 id="internships-heading" className="section-title">Internships</h2>
      </div>
      
      <div className="timeline" role="list">
        {internships.map((item, index) => (
          <div key={index} className="timeline-item" role="listitem">
            <div className="timeline-dot" aria-hidden="true"></div>
            <div className="timeline-content">
              <span className="timeline-date">{item.duration}</span>
              <h3>{item.role}</h3>
              <h4>{item.company} | {item.location}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
