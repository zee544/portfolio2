import carestream from "./assets/caresync.png";
import swapnest from "./assets/swapnest.png";
import url from "./assets/url.png";
import fixitnow from "./assets/fixitnow.png";
import dailypulse from "./assets/dailypulse.png";



export const personalInfo = {
  name: "Thanuja Sewmini",
  title: "Full Stack Developer",
  email: "sewmini234@gmail.com",
  location: "Panadura, Sri Lanka",
  github: "https://github.com/zee544",
  linkedin: "https://www.linkedin.com/in/thanuja-sewmini-005901374/",

  resumeUrl: "#",
  bio: "A highly motivated and passionate Full Stack Developer specializing in modern MERN (MongoDB, Express, React, Node.js) web applications. I love building high-performance, responsive, and secure web solutions that solve real-world problems. With experience in both frontend styling and microservices orchestration (Docker & Kubernetes), I focus on delivering seamless, scalable, and premium end-to-end user experiences."
};

export const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Context API", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML & CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js & Express.js", level: 88 },
      { name: "RESTful APIs", level: 92 },
      
      
    ]
  },
  {
    title: "Databases & Storage",
    skills: [
      { name: "MongoDB", level: 88 },
    
      { name: "MySQL", level: 82 },
    
    
    ]
  },
  {
    title: "Tools, DevOps & Others",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker & Kubernetes", level: 80 },
      { name: "Postman & API Testing", level: 88 },
      { name: "Jest / React Testing Library", level: 75 }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "CareSync - Telemedicine Platform",
    description: "Developed a full-stack healthcare appointment system using microservices, with features like appointment booking, doctor approvals, AI services, and video consultation setup.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Docker", "Kubernetes"],
    category: "Full Stack",
    githubLink: "https://github.com/Waruna-dev/healthcare-microservices.git",
    liveLink: "#",
    image: carestream
  },
  {
    id: 2,
    title: "SwapNest - Item Exchange Platform",
    description: "Developed a second-hand item exchange platform with listings, item swapping, donations, notifications, authentication, and scheduling features to improve user interaction and communication.",
    tech: ["React", "Node.js", "Express", "MongoDB","Tailwind CSS"],
    category: "Full Stack",
    githubLink: "https://github.com/Waruna-dev/SwapNest.git",
    liveLink: "https://swapnest-client.onrender.com/",
    image: swapnest
  },
  {
    id: 3,
    title: "Zee Link - URL Shortener & QR Generator ",
    description: "Developed a full-stack URL shortener that generates custom or automatic short links and includes QR code generation for easy sharing.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    githubLink: "https://github.com/zee544/FixItNow1.git",
    liveLink: "#",
    image: url
  },
  {
    id: 3,
    title: "FixItNow - Maintenance Request Web Application ",
    description: "Built a maintenance request management system for submitting, assigning, and tracking service tasks, enabling efficient workflow management and real-time progress monitoring.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    githubLink: "https://github.com/zee544/ShortenURL1.git",
    liveLink: "#",
    image: fixitnow
  },
  {
    id: 3,
    title: "DailyPulse - Habit Tracker Mobile Application ",
    description: "Designed and developed a wellness tracking mobile app with habit tracking, mood journaling, and hydration reminders, including widgets and notifications to improve daily engagement.",
    tech: ["Android Studio"],
    category: "Mobile App",
    githubLink: "https://github.com/zee544/HabitTracker.git",
    liveLink: "#",
    image: dailypulse
  },
 
];

export const experienceTimeline = [
  
  {
    id: 3,
    type: "education",
    title: "BSc (Hons) in Information Technology Specializing in Software Engineering (Undergraduate)",
    organization: "Sri Lanka Institute of Information Technology",
    duration: "2023 - 2027(expected)",
    
  },
  {
    id: 4,
    type: "education",
    title: "Part-Time Training Programme(Certificate Course - Electronics)",
    organization: "Ceylon Germen Technical Training Institute",
    duration: "2024 - 2025",
    description: "Successfully completed with Good Pass result."
  },
  
  {
    id: 5,
    type: "education",
    title: "GCE Advanced Level (Physical Science Stream)",
    organization: "Bandaragama Central College",
    duration: "2020 - 2022",
    description: "Successfully completed High School with grades in Physics, Combined Mathematics, and Chemistry."
  }
];
