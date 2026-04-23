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

    const handleMouseEnter = () => ring?.classList.add('hover');
    const handleMouseLeave = () => ring?.classList.remove('hover');

    const interactiveElements = document.querySelectorAll('a, button, .social-icon, .hamburger-icon');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" id="custom-cursor" aria-hidden="true"></div>
      <div className="cursor-dot" id="cursor-dot" aria-hidden="true"></div>
    </>
  );
}
