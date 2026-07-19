'use client';

export default function Research({ research }) {
  if (!research || research.length === 0) return null;

  return (
    <section id="research" className="fade-up" aria-labelledby="research-heading">
      <div className="section-head">
        <p className="section-subtitle">Publications</p>
        <h2 id="research-heading" className="section-title">Research Papers</h2>
      </div>
      
      <div className="projects-grid">
        {research.map((item, index) => (
          <div key={index} className="project-card" style={{ padding: '2rem' }}>
            <div className="project-info" style={{ padding: 0 }}>
              <h3 className="project-title">{item.title}</h3>
              <h4 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>{item.publishedIn} | {item.conference}</h4>
              <p className="project-desc">{item.desc}</p>
              <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <p><strong>Guide:</strong> {item.guide}</p>
                <p><strong>Co-authors:</strong> {item.coAuthors}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
