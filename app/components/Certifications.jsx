'use client';

/**
 * Certifications section component.
 * Displays professional certifications in a premium glassmorphic grid layout.
 * @param {Object} props - Component props.
 * @param {Array} props.certifications - List of certifications.
 */
export default function Certifications({ certifications }) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="fade-up" aria-labelledby="certifications-heading">
      <div className="section-head">
        <p className="section-subtitle">Credentials</p>
        <h2 id="certifications-heading" className="section-title">Certifications</h2>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="cert-card" 
            data-tilt 
            data-tilt-max="10" 
            data-tilt-glare="true" 
            data-tilt-max-glare="0.1"
          >
            <div className="cert-badge-wrapper">
              {/* Sleek metallic SVG badge icon */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cert-badge-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <circle cx="12" cy="11" r="3"></circle>
                <path d="m9 14 3-3 3 3"></path>
              </svg>
            </div>
            <div className="cert-info">
              <h3>{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
