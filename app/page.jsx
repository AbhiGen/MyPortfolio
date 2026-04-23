'use client';

import { useEffect, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Data
import { portfolioData } from './data/portfolioData';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Stats from './components/Stats';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

/**
 * Main Portfolio Page component.
 * Orchestrates the modular sections and manages global state like theme and stats.
 */
export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [githubStats, setGithubStats] = useState({ repos: 0, followers: 0, loading: true });
  const [leetcodeStats, setLeetcodeStats] = useState(portfolioData.leetcode.stats);

  useEffect(() => {
    // 0. Theme Initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // 1. Live API Fetching
    // GitHub Stats
    fetch(`https://api.github.com/users/${portfolioData.github.username}`)
      .then(res => res.json())
      .then(data => setGithubStats({ repos: data.public_repos, followers: data.followers, loading: false }))
      .catch(() => setGithubStats({ loading: false }));

    // LeetCode Stats
    fetch(`https://leetcode-stats-api.herokuapp.com/${portfolioData.leetcode.username}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.totalSolved > 0) {
          setLeetcodeStats(prev => ({ 
            ...prev,
            totalSolved: data.totalSolved, 
            easy: data.easySolved, 
            medium: data.mediumSolved, 
            hard: data.hardSolved, 
            loading: false 
          }));
        }
      })
      .catch(() => console.log("Using LeetCode fallback stats"));

    // 2. Initialize Vanilla Tilt on all elements with data-tilt attribute
    const tiltElements = document.querySelectorAll('[data-tilt]');
    VanillaTilt.init(Array.from(tiltElements));

    // 3. Fade-Up Observer for scroll animations
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    fadeUpElements.forEach(el => fadeObserver.observe(el));

    // 4. Scroll Progress Indicator
    const handleScroll = () => {
      const progressBar = document.getElementById('scroll-progress');
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      if (progressBar) progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      fadeObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <ToastContainer theme={theme === 'dark' ? 'dark' : 'light'} position="bottom-right" />
      <CustomCursor />
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
      
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero data={portfolioData.hero} />
        <About data={portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} githubUrl={`https://github.com/${portfolioData.github.username}`} />
        <Experience experience={portfolioData.experience} />
        <Resume data={portfolioData.resume} />
        <Stats 
          githubStats={githubStats} 
          leetcodeStats={leetcodeStats} 
          githubUser={portfolioData.github.username} 
          leetcodeUser={portfolioData.leetcode.username} 
        />
        <Contact data={portfolioData.contact} />
      </main>

      <footer role="contentinfo">
        <p>© {new Date().getFullYear()} {portfolioData.hero.name}. Designed & Built for the Future.</p>
      </footer>
    </>
  );
}
