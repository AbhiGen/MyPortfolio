# Portfolio Implementation Details

This document outlines the technical architecture and component structure of the Abhiram Bikkina Portfolio.

## 🛠 Tech Stack
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS (Global variables, Glassmorphism, Responsive design)
- **Animations**:
  - [Typed.js](https://mattboldt.github.io/typed.js/) (Dynamic typing effect)
  - [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) (3D hover effects)
  - Intersection Observer API (Fade-up animations)
- **Email**: [EmailJS](https://www.emailjs.com/) (Client-side contact form handling)
- **Icons & Images**: Next.js `Image` component for optimization.
- **State Management**: React `useState` and `useEffect` for theme and stats.

## 📁 Project Structure
- `app/page.jsx`: Main entry point and orchestrator.
- `app/data/portfolioData.js`: Centralized data store for all portfolio content.
- `app/components/`: Reusable React components.
- `app/globals.css`: Core design system and global styles.

## 🧩 Components

### 1. Navbar
- **Purpose**: Main navigation and theme toggling.
- **Features**: Glassmorphism on scroll, mobile-responsive hamburger menu, theme persistence via `localStorage`.

### 2. Hero
- **Purpose**: First impression and introduction.
- **Features**: Dynamic typing effect with `Typed.js`, social links, and smooth scroll indicator.

### 3. About
- **Purpose**: Professional summary and key focus areas.
- **Features**: High-resolution optimized portrait, 3D tilt effect on image, and categorical highlight boxes.

### 4. Skills
- **Purpose**: Detailed technical expertise showcase.
- **Features**: Categorized skill pills (Programming, Core CS, AI/ML) with subtle hover animations.

### 5. Projects
- **Purpose**: Portfolio projects gallery.
- **Features**: 3D tilt cards, tech stack tags, GitHub/Live links, and dynamic image placeholders.

### 6. Stats
- **Purpose**: Real-time credibility through live data.
- **Features**:
  - **GitHub**: Fetches public repo count and followers. Displays a live contribution heatmap.
  - **LeetCode**: Displays verified problem-solving metrics (Easy, Medium, Hard), Rank, and Contest Rating in a clean monochrome style.

### 7. Experience
- **Purpose**: Career and education timeline.
- **Features**: Clean vertical timeline with year markers and detailed achievement descriptions.

### 8. Resume
- **Purpose**: Call to action for recruiters.
- **Features**: Prominent glassmorphism card with a direct link to the professional resume on Google Drive.

### 9. Contact
- **Purpose**: Direct communication channel.
- **Features**: Validated contact form, EmailJS integration for direct delivery, and social contact information.

### 10. CustomCursor
- **Purpose**: Premium user interaction.
- **Features**: Zero-latency white dot with a smooth trailing metallic ring that inverts colors on hover.

---
*Built with ❤️ by Abhiram Bikkina*
