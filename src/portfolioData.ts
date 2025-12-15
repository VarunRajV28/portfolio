// src/portfolioData.ts
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons"; // FIXED: Added 'type' keyword

export interface SocialLink {
  name: string;
  url: string;
  icon: IconType;
}

export interface Profile {
  name: string;
  role: string;
  email: string;
  location: string;
  about: string;
  social: SocialLink[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  title: string;
  tech: string;
  date: string;
  desc: string;
}

export const profile: Profile = {
  name: "Varun Raj V",
  role: "Computer Science Undergraduate | Full Stack Developer",
  email: "varunrajvijayakumar2005@gmail.com",
  location: "Madurai, India",
  about: "I am a Computer Science student at Amrita Vishwa Vidyapeetham (2023-2027) with a CGPA of 7.02. I have experience as a Research Assistant at EvOLve and specialized skills in Full Stack Development, Genetic Algorithms, and Computer Vision.",
  social: [
    { name: "LinkedIn", url: "https://linkedin.com/in/varunraj2005", icon: FaLinkedin },
    { name: "GitHub", url: "https://github.com/VarunRajV28", icon: FaGithub },
    { name: "Email", url: "mailto:varunrajvijayakumar2005@gmail.com", icon: FaEnvelope },
  ],
};

export const skills: string[] = [
  "Python", "Java", "C++", "JavaScript", "TypeScript", 
  "React.js", "Next.js", "Node.js", "Tailwind CSS", 
  "SQL", "Docker", "Git", "OpenCV"
];

export const experience: Experience[] = [
  {
    role: "Undergraduate Research Assistant",
    company: "EvOLve (Evolutionary Optimization, Learning and Adaptive Systems)",
    duration: "Dec. 2025 - Present",
    description: "Developing a Parallel Genetic Algorithm for Large-Scale TSP using an island-model approach. Optimizing concurrency using Java (Fork Join Pool, Streams, Akka)."
  }
];

export const projects: Project[] = [
  {
    title: "Parent Hostel Pass System",
    tech: "Next.js 14, TypeScript, Prisma, Tailwind",
    date: "Oct. 2025",
    desc: "Full-stack visitor management platform with secure QR-code entry/exit and role-based access for Wardens and Security."
  },
  {
    title: "LinkUs Social Network",
    tech: "Python, Graphs, Tries, Heaps",
    date: "Nov. 2024",
    desc: "Social network using custom Graph data structures. Implemented Trie-based autocomplete and Max Heap friend recommendations."
  },
  {
    title: "Lightweight ANPR System",
    tech: "Python, OpenCV, Scikit-Learn",
    date: "Jan. 2025",
    desc: "CPU-optimized Number Plate Recognition pipeline with a CLI tool for batch-processing and custom validation layers."
  }
];