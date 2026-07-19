'use client';

export default function Hackathons({ hackathons }) {
  if (!hackathons || hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="fade-up" aria-labelledby="hackathons-heading">
      <div className="section-head">
        <p className="section-subtitle">Competitions</p>
        <h2 id="hackathons-heading" className="section-title">Hackathons</h2>
      </div>
      
      <div className="projects-grid">
        {hackathons.map((item, index) => (
          <div key={index} className="project-card" style={{ padding: '2rem' }}>
            <div className="project-info" style={{ padding: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <h3 className="project-title" style={{ marginBottom: '0.5rem' }}>{item.title}</h3>
                <span className="tech-tag" style={{ background: 'var(--accent-teal)', color: 'var(--bg-card)' }}>{item.achievement}</span>
              </div>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>Project: {item.project}</h4>
              <p className="project-desc">{item.desc}</p>
              
              {item.techStack && (
                <div className="project-tech" style={{ marginTop: '1rem' }}>
                  {item.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
              {item.team && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <strong>Team:</strong> {item.team.join(', ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
