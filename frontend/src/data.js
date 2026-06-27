import carestream from "./assets/caresync.png";
import swapnest from "./assets/swapnest.png";
import url from "./assets/url.png";
import fixitnow from "./assets/fixitnow.png";
import dailypulse from "./assets/dailypulse.png";
import me from "./assets/me.png";
import tours from "./assets/tours.webp";
import petpal from "./assets/petpal.png";
import germentech from "./assets/german.jpg";
import news from "./assets/1.jpg";
import newss from "./assets/2.jpg";

export const personalInfo = {
  name: "Thanuja Sewmini",
  title: "Full Stack Developer",
  email: "sewmini234@gmail.com",
  location: "Panadura, Sri Lanka",
  github: "https://github.com/zee544",
  linkedin: "https://www.linkedin.com/in/thanuja-sewmini-005901374/",
  imageUrl: me,
  resumeUrl: "/cv.pdf",
  bio: "Ambitious Software Engineering undergraduate at Sri Lanka Institute of Information Technology with experience in full-stack web development, Android application development, UI/UX design, and microservices architecture. Skilled in MERN stack technologies, Docker, Kubernetes, and modern development tools, with a passion for building practical and user-friendly software solutions. "
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
    description: "CareSync is an AI-driven healthcare platform integrating smart appointment booking, telemedicine, and automated medical analysis in one secure ecosystem. Patients upload reports for AI insights, book specialists, and attend video consultations. Doctors manage schedules and prescriptions seamlessly. Administrators maintain full platform oversight. The entire system runs on microservices architecture, Dockerized for consistency and Kubernetes-managed for deployment.",
    tech: ["MERN", "Tailwind CSS", "Docker", "Kubernetes"],
    category: "Full Stack",
    githubLink: "https://github.com/Waruna-dev/healthcare-microservices.git",
    liveLink: "#",
    linkedinLink: "https://www.linkedin.com/posts/thanuja-sewmini-005901374_distributedsystems-microservices-healthcaretech-ugcPost-7467647853188812800-oV2E/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
    linkedin: "https://www.linkedin.com/posts/thanuja-sewmini-005901374_distributedsystems-microservices-healthcaretech-ugcPost-7467647853188812800-oV2E/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
    image: carestream
  },
  {
    id: 2,
    title: "SwapNest - Item Exchange Platform",
    description: "Developed a second-hand item exchange platform with listings, item swapping, donations, notifications, authentication, and scheduling features to improve user interaction and communication.",
    tech: ["MERN", "Tailwind CSS"],
    category: "Full Stack",
    githubLink: "https://github.com/Waruna-dev/SwapNest.git",
    liveLink: "https://swapnest-client.onrender.com/",
    image: swapnest
  },
  {
    id: 3,
    title: "Zee Link - URL Shortener & QR Generator ",
    description: "Developed a full-stack URL shortener that generates custom or automatic short links and includes QR code generation for easy sharing.",
    tech: ["MERN"],
    category: "Full Stack",
    githubLink: "https://github.com/zee544/FixItNow1.git",
    liveLink: "#",
    linkedinLink: "https://www.linkedin.com/posts/thanuja-sewmini-005901374_mern-fullstackdevelopment-webapp-activity-7422375080342573056-WqV_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
    linkedin:"https://www.linkedin.com/posts/thanuja-sewmini-005901374_mern-fullstackdevelopment-webapp-activity-7422375080342573056-WqV_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
    image: url
  },
  {
    id: 4,
    title: "FixItNow - Maintenance Request Web Application ",
    description: "Built a maintenance request management system for submitting, assigning, and tracking service tasks, enabling efficient workflow management and real-time progress monitoring.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    category: "Full Stack",
    githubLink: "https://github.com/zee544/ShortenURL1.git",
    liveLink: "#",
    linkedin:"https://www.linkedin.com/posts/thanuja-sewmini-005901374_itproject-mern-webdevelopment-ugcPost-7422660879999057920-BS1a/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
    linkedinLink:"https://www.linkedin.com/posts/thanuja-sewmini-005901374_itproject-mern-webdevelopment-ugcPost-7422660879999057920-BS1a/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
    image: fixitnow
  },
  {
    id: 5,
    title: "DailyPulse - Habit Tracker Mobile Application ",
    description: "Designed and developed a wellness tracking mobile app with habit tracking, mood journaling, and hydration reminders, including widgets and notifications to improve daily engagement.",
    tech: ["Android Studio"],
    category: "Mobile App Development & Design",
    githubLink: "https://github.com/zee544/HabitTracker.git",
    liveLink: "#",
    image: dailypulse
  },
  {
  id: 6,
  title: "PetPal - Pet Care Management UI/UX Design",
  description: "Designed a pet care and wellness mobile app prototype in Figma with features for vaccine tracking, reminders, grooming schedules, and pet growth monitoring.",
  tech: ["Figma"],
  category: "Mobile App Design",
  linkedinLink: "https://www.linkedin.com/posts/thanuja-sewmini-005901374_figma-madproject-appdesign-activity-7422362099839889408--IRI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFyussUB8bGeFVJrNG5EX_fBakdwgTQpz7c",
  liveLink: "#",
  image: petpal
},
  {
  id: 7,
  title: "Tours - Tourism Guide Web Application",
  description: "Developed a tourism guide web application to manage tour information and travel services using PHP, MySQL, XAMPP, and Java.",
  tech: ["PHP", "XAMPP", "MySQL", "Java"],
  category: "Web Application",
  liveLink: "#",
  image: tours,
  
},

 
];


export const certifications = [
  {
    id: 1,
    name: "Electronics (E2) - Certificate Course",
    issuer: "Ceylon German Technical Training Institute",
    date: "2024-2025 (October to March)",
   image: germentech,
  },
   {
    id: 2,
    name: "AI/ML Engineer - Stage 1",
    issuer: "SLIIT - Centre for Open and Distance Education",
    date: "2024",
   image: news,
    verifyLink: "#"
  },
   {
    id: 3,
    name: "AI/ML Engineer - Stage 2",
    issuer: "SLIIT - Centre for Open and Distance Education",
    date: "2024",
   image: newss,
    verifyLink: "#"
  },
];

export const experienceTimeline = [
  {
    id: 4,
    type: "education",
    title: "Part-Time Training Programme (Certificate Course - Electronics)",
    organization: "Ceylon Germen Technical Training Institute",
    duration: "2024 - 2025",
    description: "Successfully completed with Good Pass result."
  },
  {
    id: 3,
    type: "education",
    title: "BSc (Hons) in Information Technology Specializing in Software Engineering (Undergraduate)",
    organization: "Sri Lanka Institute of Information Technology",
    duration: "2023 - Present",
    
  },
  
  
  {
    id: 5,
    type: "education",
    title: "GCE Advanced Level (Physical Science Stream)",
    organization: "Bandaragama Central College",
    duration: "2020 - 2022",
    description: "Successfully completed High School with grades in Physics, Combined Mathematics, and Chemistry."
  },
  
];
