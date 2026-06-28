'use client';

import { useEffect } from 'react';

/**
 * CustomCursor component for the metallic premium cursor effect.
 */
export default function CustomCursor() {
  useEffect(() => {
    const ring = document.getElementById('custom-cursor');
    const dot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
      }
      requestAnimationFrame(animateRing);
    };
    animateRing();

    document.addEventListener('mousemove', handleMouseMove);

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .social-icon, .hamburger-icon, .chatbot-toggle, .chat-chip');
      if (target) {
        ring?.classList.add('hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, [role="button"], .social-icon, .hamburger-icon, .chatbot-toggle, .chat-chip');
      if (target) {
        ring?.classList.remove('hover');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" id="custom-cursor" aria-hidden="true"></div>
      <div className="cursor-dot" id="cursor-dot" aria-hidden="true"></div>
    </>
  );
}
