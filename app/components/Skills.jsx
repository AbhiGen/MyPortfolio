'use client';

/**
 * Skills section component.
 * @param {Object} props - Component props.
 * @param {Array} props.skills - Array of skill categories.
 */
export default function Skills({ skills }) {
  return (
    <section id="skills" className="fade-up" aria-labelledby="skills-heading">
      <div className="section-head">
        <p className="section-subtitle">Expertise</p>
        <h2 id="skills-heading" className="section-title">Technical Arsenal</h2>
      </div>
      
      <div className="skills-grid">
        {skills.map((category) => (
          <div key={category.category} className="skill-category" data-tilt data-tilt-max="5">
            <h3>{category.category}</h3>
            <div className="skill-list" role="list">
              {category.items.map((skill) => (
                <span key={skill} className="skill-pill" role="listitem">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
