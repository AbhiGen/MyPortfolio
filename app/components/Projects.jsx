'use client';

import Image from 'next/image';

/**
 * Projects section component.
 * @param {Object} props - Component props.
 * @param {Array} props.projects - Array of project objects.
 * @param {string} props.githubUrl - URL to view more projects on GitHub.
 */
export default function Projects({ projects, githubUrl }) {
  return (
    <section id="projects" className="fade-up" aria-labelledby="projects-heading">
      <div className="section-head">
        <p className="section-subtitle">Showcase</p>
        <h2 id="projects-heading" className="section-title">Featured Work</h2>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card" data-tilt data-tilt-max="15" data-tilt-glare="true" data-tilt-max-glare="0.2">
            <div className="project-img-wrapper" style={{ position: 'relative' }}>
              {project.img ? (
                <Image 
                  src={project.img} 
                  alt={`${project.title} Interface`} 
                  fill
                  className="project-img" 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='flex'; }} 
                />
              ) : null}
              <div 
                className="project-img-placeholder" 
                style={{ height: '100%', width: '100%', display: project.img ? 'none' : 'flex' }}
              >
                {project.placeholder || project.title}
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer" className="link-github">GitHub</a>
                <a href={project.live} target="_blank" rel="noreferrer" className="link-live">{project.live === '#' ? 'Demo' : 'Live Demo'}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">View More on GitHub</a>
      </div>
    </section>
  );
}
