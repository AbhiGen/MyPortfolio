'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Typed from 'typed.js';

/**
 * Hero section component.
 * @param {Object} props - Component props.
 * @param {Object} props.data - Hero data from portfolioData.
 */
export default function Hero({ data }) {
  const typedContainer = useRef(null);

  useEffect(() => {
    let typedInstance = null;
    if (typedContainer.current) {
      typedInstance = new Typed(typedContainer.current, {
        strings: data.typedStrings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }

    return () => {
      if (typedInstance) typedInstance.destroy();
    };
  }, [data.typedStrings]);

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-content fade-up">
        <p className="hero-p1">{data.title}</p>
        <h1 id="hero-heading" className="hero-title">{data.name}</h1>
        <div className="hero-subtitle" aria-live="polite">
          <span id="typed-text" ref={typedContainer}></span>
        </div>
        
        <div className="hero-btns">
          <a href="#projects" className="btn btn-primary" style={{ display: 'inline-block' }}>View Projects</a>
          <a href="#contact" className="btn btn-secondary" style={{ display: 'inline-block' }}>Contact Me</a>
        </div>
        
        <div className="socials">
          {data.socials.map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon" 
              aria-label={`${social.name} Profile`}
            >
              <Image 
                src={social.icon} 
                alt={`${social.name} icon`} 
                width={24} 
                height={24} 
                style={social.isRound ? { borderRadius: '50%' } : {}} 
              />
            </a>
          ))}
        </div>
      </div>
      
      <div className="scroll-indicator" aria-hidden="true">
        <a href="#about" tabIndex={-1}>
          <Image src="/assests/down-arrow.png" alt="Scroll Down" width={30} height={30} />
        </a>
      </div>
    </section>
  );
}
