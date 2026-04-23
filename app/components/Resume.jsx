'use client';

/**
 * Resume section component.
 * @param {Object} props - Component props.
 * @param {Object} props.data - Resume data from portfolioData.
 */
export default function Resume({ data }) {
  return (
    <section id="resume" className="fade-up" style={{ textAlign: 'center', margin: '4rem auto' }} aria-label="Resume Download">
      <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '4rem 2rem', borderRadius: '20px', boxShadow: '0 0 50px rgba(0,240,255,0.05)' }}>
        <h2 className="section-title" style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>{data.text}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>{data.subtext}</p>
        <a 
          href={data.url} 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-primary" 
          style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', display: 'inline-block' }} 
          aria-label="View Full Resume on Google Drive"
        >
          View My Resume
        </a>
      </div>
    </section>
  );
}
