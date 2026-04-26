'use client';

import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

/**
 * Contact section component with form and contact info.
 * @param {Object} props - Component props.
 * @param {Object} props.data - Contact data from portfolioData.
 */
export default function Contact({ data }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || name.length < 2) {
      toast.error('Please enter a valid name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!message || message.length < 10) {
      toast.error('Message strictly needs at least 10 characters.');
      return;
    }

    const btn = e.currentTarget.querySelector('.btn-submit');
    const originalText = 'Send Message';
    
    btn.innerHTML = 'Sending... ⏳';
    btn.style.background = 'var(--text-muted)';
    
    // Replace these with actual IDs from emailjs.com
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
      setTimeout(() => {
        toast.info('Simulated success! Set up actual EmailJS keys to send real emails.');
        btn.innerHTML = 'Message Sent! 🚀';
        btn.style.background = 'var(--accent-teal)';
        e.target.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = 'var(--gradient-glow)';
        }, 3000);
      }, 1500);
    } else {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
        .then(() => {
          toast.success('Thank you! Your email has been successfully delivered.');
          btn.innerHTML = 'Message Sent! 🚀';
          btn.style.background = 'var(--accent-teal)';
          e.target.reset();
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'var(--gradient-glow)';
          }, 4000);
        }, (error) => {
          toast.error(`Email sending failed: ${error.text}`);
          btn.innerHTML = originalText;
          btn.style.background = 'var(--gradient-glow)';
        });
    }
  };

  return (
    <section id="contact" className="fade-up" aria-labelledby="contact-heading">
      <div className="section-head">
        <p className="section-subtitle">Connect</p>
        <h2 id="contact-heading" className="section-title">Let's Build Together</h2>
      </div>
      
      <div className="contact-container" data-tilt data-tilt-max="2" data-tilt-glare="true" data-tilt-max-glare="0.05">
        <div className="contact-info">
          <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Get in Touch</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
            I'm currently looking for new opportunities in Software Engineering and AI development. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="info-item">
            <div className="info-icon" aria-hidden="true"><Image src="/assests/email.png" alt="Email" width={24} height={24} /></div>
            <div className="info-text">
              <h4>Email</h4>
              <p><a href={`mailto:${data.email}`} aria-label={`Email ${data.email}`}>{data.email}</a></p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon" aria-hidden="true"><Image src="/assests/linkedin.png" alt="LinkedIn" width={24} height={24} /></div>
            <div className="info-text">
              <h4>LinkedIn</h4>
              <p><a href={data.linkedin} target="_blank" rel="noreferrer" aria-label="Visit LinkedIn Profile">Abhiram Bikkina</a></p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon" aria-hidden="true"><Image src="/assests/github.png" alt="Location" width={24} height={24} /></div>
            <div className="info-text">
              <h4>Location</h4>
              <p>{data.location}</p>
            </div>
          </div>
        </div>
        
        <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit} aria-label="Contact Form">
          <div className="form-group">
            <label htmlFor="name" className="sr-only" aria-hidden="true" style={{display:'none'}}>Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required aria-required="true" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="sr-only" aria-hidden="true" style={{display:'none'}}>Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required aria-required="true" />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="sr-only" aria-hidden="true" style={{display:'none'}}>Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Your Message" required aria-required="true"></textarea>
          </div>
          <button type="submit" className="btn-submit" aria-label="Send Message">Send Message ✨</button>
        </form>
      </div>
    </section>
  );
}
