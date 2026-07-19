export const portfolioData = {
  hero: {
    name: "Abhiram Bikkina",
    title: "Aspiring Software Engineer",
    typedStrings: [
      'AI & LLM Enthusiast <span style="color:var(--accent-blue)">.</span>',
      'Full Stack Developer <span style="color:var(--accent-purple)">.</span>',
      'Problem Solver <span style="color:var(--accent-teal)">.</span>'
    ],
    socials: [
      { name: "GitHub", url: "https://github.com/AbhiGen", icon: "/assests/github.png" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/abhiram-bikkina-96a342282", icon: "/assests/linkedin.png" },
      { name: "LeetCode", url: "https://leetcode.com/u/abhiram_333/", icon: "/assests/education.png", isRound: true }
    ]
  },
  about: {
    stats: [
      { title: "AI & ML", desc: "LLMs, RAG", icon: "/assests/experience.png" },
      { title: "Full-Stack", desc: "Scalable Systems", icon: "/assests/education.png" }
    ],
    paragraphs: [
      "Aspiring <span class='highlight'>Software Engineer</span> with strong foundations in Data Structures and Algorithms and hands-on experience in building scalable full-stack, AI-driven, and cloud-deployed applications.",
      "Passionate about designing <span class='highlight'>efficient, reliable, and data-centric systems</span> that solve real-world engineering problems. I thrive on turning complex challenges into elegant, impactful solutions.",
      "Currently pursuing a <span class='highlight'>B.Tech in Computer Science Engineering</span> at Amrita Vishwa Vidyapeetham with a CGPA of 8.2, where I focus on mastering core CS fundamentals and advanced AI frameworks."
    ],
    profileImg: "/assests/profilepic3.png"
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "Java", "JavaScript", "SQL"]
    },
    {
      category: "Core Computer Science",
      items: ["Data Structures", "Algorithms", "OOP", "Operating Systems", "Database Systems"]
    },
    {
      category: "AI, ML & Tools",
      items: ["NumPy", "Pandas", "Scikit-learn", "Hugging Face", "AWS (EC2, S3)", "Docker", "GitHub", "Render", "MongoDB", "MySQL"]
    }
  ],
  projects: [
    {
      title: "HireVerse – AI Mock Interview Platform",
      desc: "Built an AI-driven mock interview platform offering role-based dynamic questioning, structured learning tracks, and personalized performance dashboards. Integrated Gemini API for AI-powered feedback.",
      tech: ["Next.js", "Gemini API", "Clerk Auth", "Render"],
      github: "https://github.com/AbhiGen/HireVerse.git",
      live: "https://ai-mock-interview-qsvj.onrender.com/",
      img: "/assests/aimockproject.png"
    },
    {
      title: "NutriKids – AI Pediatric Nutrition Platform",
      desc: "Developed end-to-end AI pipelines for RAG-based nutrition analysis using ICMR/NIN data for child growth tracking, meal logging, and real-time feedback with safety validation.",
      tech: ["RAG Architecture", "LLMs", "Full-Stack", "Safety Validation"],
      github: "https://github.com/AbhiGen",
      live: "https://nutrikids-frontend.vercel.app/",
      img: "/assests/nutrikids.jpg"
    },
    {
      title: "Reliable Distributed Key-Value Store",
      desc: "Designed a fault-tolerant distributed key-value store using replication and quorum-based consistency to ensure strong consistency. Implemented heartbeat-based failure detection, automatic node recovery, and scalable multi-node architecture using concurrency and socket communication.",
      tech: ["Replication", "Quorum Consistency", "Concurrency", "Sockets"],
      github: "https://github.com/AbhiGen",
      live: "#",
      img: "/assests/distributed.png"
    },
    {
      title: "Anti-Theft Bag Security System",
      desc: "Developed an ML-assisted luggage security system using STM32F401, motion sensors, and OLED. Implemented a Decision Tree model to trigger Bluetooth alerts within 150ms.",
      tech: ["STM32F401", "Decision Tree", "Machine Learning", "Bluetooth"],
      github: "https://github.com/AbhiGen",
      live: "#",
      img: "/assests/antitheft.png"
    }
  ],
  experience: [
    {
      year: "Mar 2026 - May 2026",
      title: "Back End Developer Intern",
      subtitle: "Platinum Software",
      desc: "Worked on an AI-enabled Sales CRM with an Intelligent Chatbot System. Developed REST APIs, integrated backend services with an LLM-powered chatbot, and implemented efficient data retrieval."
    },
    {
      year: "Jan 2026 - Jun 2026",
      title: "Full Stack Engineer Intern",
      subtitle: "Overall Health and Nutrition",
      desc: "Worked on NutriBite, an AI-powered pediatric nutrition platform. Developed core features including child profile management, meal logging, and growth tracking."
    },
    {
      year: "2025",
      title: "Research Paper Publication",
      subtitle: "IEEE Xplore | I-SMAC 2025",
      desc: "Published “A Novel LLM-Based Framework for Kids Nutrition Recommendations” exploring LLMs and RAG for personalized nutrition recommendations."
    },
    {
      year: "2025",
      title: "Top 8 / 128 Teams",
      subtitle: "Technova 2025 Hackathon",
      desc: "Developed MediSphere, a Smart Hospital Management System integrating AI for smart patient management, predictive analytics, and chatbot-driven support."
    },
    {
      year: "2025",
      title: "Top 100 / 600+ Teams",
      subtitle: "Scaler Hackathon, Bengaluru",
      desc: "Built HireVerse, an AI-powered interview preparation kit with dynamic question generation and AI-driven mock interviews using Gemini API."
    },
    {
      year: "2025",
      title: "1st Runner-Up",
      subtitle: "IIIT Sri City Agentica Hackathon",
      desc: "Ranked 2nd out of 130 teams in a highly competitive AI-focused hackathon."
    },
    {
      year: "2024",
      title: "1st Prize – Anokha Techfest",
      subtitle: "Maze Mayhem (Rank 1/200)",
      desc: "Won top honors in a large-scale technical competition."
    },
    {
      year: "2023 – 2027",
      title: "B.Tech in Computer Science Engineering",
      subtitle: "Amrita Vishwa Vidyapeetham, Coimbatore",
      desc: "Currently maintaining a CGPA of 8.2. Class Representative (2023–2024)."
    }
  ],
  research: [
    {
      title: "A Novel LLM-Based Framework for Kids Nutrition Recommendations",
      publishedIn: "IEEE Xplore",
      conference: "9th International Conference on I-SMAC 2025 (IEEE)",
      desc: "Explores how Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) can be used to deliver personalized, evidence-based nutrition recommendations for children, bringing together AI and healthcare.",
      guide: "Dr. T. Senthil Kumar",
      coAuthors: "Pavan Vignesh, Dinesh Veera Bhargav, Kuladeep Reddy"
    }
  ],
  internships: [
    {
      role: "Full Stack Engineer Intern",
      company: "Overall health and nutrition",
      duration: "Jan 2026 - Jun 2026 · 6 mos",
      location: "India · Remote",
      desc: "Worked as a Full Stack Engineer on NutriBite, an AI-powered pediatric nutrition platform. Developed core features including child profile management, meal logging, growth tracking, and seamless frontend-backend integration."
    },
    {
      role: "Back End Developer Intern",
      company: "Platinum Software",
      duration: "Mar 2026 - May 2026 · 3 mos",
      location: "India · Remote",
      desc: "Worked as a Backend Developer on an AI-enabled Sales CRM with an Intelligent Chatbot System. Developed REST APIs, integrated backend services with an LLM-powered chatbot, implemented efficient data retrieval, and contributed to a live product successfully deployed for client use."
    }
  ],
  hackathons: [
    {
      title: "Scaler Hackathon",
      location: "Scaler School of Technology, Bengaluru",
      project: "HireVerse",
      achievement: "Top 100 Teams (out of 600+)",
      desc: "Built HireVerse – a complete AI-powered interview preparation kit featuring dynamic question generation, behavioral questions, and AI-driven mock interview simulations using the Gemini API. Qualified for Round 2 and presented the implementation.",
      techStack: ["React", "TailwindCSS", "Node.js", "Express.js", "Gemini API", "MongoDB", "AWS EC2"]
    },
    {
      title: "Technova 2025",
      project: "MediSphere",
      achievement: "Top 8 Teams (out of 128)",
      desc: "Developed an AI-powered Smart Hospital Management System that seamlessly integrates AI to enhance patient care, streamline doctor appointments, and revolutionize EHR management. Featured predictive analytics and chatbot-driven support.",
      team: ["Tharun Kumar", "Pavan Vignesh", "Dinesh", "Veerabhargav", "Kuladeep Reddy"]
    }
  ],
  certifications: [
    { title: "Oracle AI Foundations", issuer: "Oracle" },
    { title: "AWS Cloud Practitioner Digital Badge", issuer: "AWS Academy" },
    { title: "Python", issuer: "Cisco Networking Academy" },
    { title: "Java Core Basic", issuer: "Infosys Springboard" },
    { title: "SQL Certification", issuer: "HackerRank" }
  ],
  contact: {
    email: "abhirambikkina@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhiram-bikkina-96a342282",
    location: "India"
  },
  resume: {
    url: "https://drive.google.com/file/d/1lSdMTc4CUxbBaMtnRA23VC4wixxqBsJW/view?usp=sharing",
    text: "Want to see my full professional background?",
    subtext: "View my resume to see my full technical skills and project details."
  },
  leetcode: {
    username: "abhiram_333",
    profileUrl: "https://leetcode.com/u/abhiram_333/",
    stats: {
      totalSolved: 537,
      easy: 284,
      medium: 235,
      hard: 18,
      rank: "161,502",
      contestRating: "1,332",
      activeDays: 180,
      maxStreak: 38,
      submissions: 630,
      topPercentage: "95.31%",
      badges: 4
    }
  },
  github: {
    username: "AbhiGen"
  }
};
