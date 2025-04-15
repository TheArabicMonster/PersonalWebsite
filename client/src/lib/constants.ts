export const navItems = [
  { id: "home", label: "Home", labelFr: "Accueil", labelAr: "الرئيسية" },
  { id: "about", label: "About", labelFr: "À propos", labelAr: "حول" },
  { id: "projects", label: "Projects", labelFr: "Projets", labelAr: "مشاريع" },
  { id: "experience", label: "Experience", labelFr: "Expérience", labelAr: "خبرة" },
  { id: "welcome-generator", label: "Welcome Generator", labelFr: "Générateur de Message", labelAr: "مولد الترحيب" },
  { id: "contact", label: "Contact", labelFr: "Contact", labelAr: "اتصل بنا" }
];

export const typingPhrases = [
  { en: "Full Stack Developer", fr: "Développeur Full Stack", ar: "مطور ويب شامل" },
  { en: "Vue.js Developer", fr: "Développeur Vue.js", ar: "مطور Vue.js" },
  { en: "Problem Solver", fr: "Solutionneur de problèmes", ar: "حلال المشاكل" },
  { en: "Tech Explorer", fr: "Explorateur technologique", ar: "مستكشف التكنولوجيا" }
];

export const skills = [
  "Vue.js", "JavaScript", "C#", "Python", "HTML5", "CSS3", 
  "TypeScript", "React", "Node.js", "Express", 
  "MongoDB", "Git", "Distributed Programming", "Functional Programming"
];

export const projects = [
  {
    title: "Portfolio Website",
    description: "Site web qui contiendra mon CV et mes projets. Une vitrine personnelle construite avec Vue.js, permettant de présenter mes compétences et expériences professionnelles.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    liveLink: "#",
    repoLink: "https://github.com/TheArabicMonster/portfolio",
    technologies: ["Vue.js", "JavaScript", "HTML", "CSS"]
  },
  {
    title: "InnoWeeks Media 2023",
    description: "Lecteur multimédia en peer-to-peer. Une application innovante permettant de partager et lire des médias directement entre utilisateurs, sans serveur central.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    liveLink: "#",
    repoLink: "https://github.com/TheArabicMonster/InnoWeeks_Media_2023",
    technologies: ["JavaScript", "WebRTC", "Media API", "P2P"]
  },
  {
    title: "Discord Bot NotifLoL",
    description: "Bot Discord qui notifie les 'low random' du serveur quand ils perdent une partie. Un outil automatisé qui surveille les performances des joueurs et envoie des notifications via Discord.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    liveLink: "#",
    repoLink: "https://github.com/TheArabicMonster/dc_bot_NotifLoL",
    technologies: ["Python", "Discord API", "Riot Games API"]
  },
  {
    title: "Space Invaders",
    description: "Jeu classique de Space Invaders implémenté avec des technologies modernes. Un projet démontrant des compétences en développement de jeux et en programmation orientée objet.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    liveLink: "#",
    repoLink: "https://github.com/TheArabicMonster/P-SpaceInvaders",
    technologies: ["C#", "Game Development", "OOP"]
  }
];

export const experiences = [
  {
    title: "Programmation Distribuée",
    company: "ETML",
    period: "2022 - 2023",
    responsibilities: [
      "Développement d'applications distribuées dans le cadre du cours ICT-321.",
      "Conception et implémentation de systèmes de communication entre services.",
      "Utilisation de technologies modernes pour créer des applications scalables et robustes."
    ]
  },
  {
    title: "Programmation Fonctionnelle",
    company: "Cours P_FUN_matkha",
    period: "2022 - 2023",
    responsibilities: [
      "Étude et application des principes de la programmation fonctionnelle.",
      "Développement d'applications utilisant des paradigmes fonctionnels purs.",
      "Résolution de problèmes complexes avec des approches fonctionnelles."
    ]
  },
  {
    title: "Développeur Full Stack",
    company: "Projets Indépendants",
    period: "2022 - Présent",
    responsibilities: [
      "Création d'applications web complètes utilisant Vue.js, HTML, CSS et JavaScript.",
      "Développement de jeux et d'applications en C# avec une architecture orientée objet.",
      "Création de bots et d'outils d'automatisation avec Python et les API tierces."
    ]
  }
];

export const education = [
  {
    degree: "Formation en Informatique",
    institution: "ETML - École Technique - École des Métiers de Lausanne",
    period: "2020 - 2024",
    description: "Formation approfondie en développement web, programmation distribuée, et technologies modernes. Spécialisation en Vue.js et développement full stack."
  },
  {
    degree: "Certificat en Programmation Fonctionnelle",
    institution: "Programme Spécialisé",
    period: "2022 - 2023",
    description: "Cours intensif sur les principes et paradigmes de la programmation fonctionnelle. Application pratique à des projets réels."
  }
];

export const socialLinks = {
  github: "https://github.com/TheArabicMonster",
  linkedin: "https://linkedin.com/in/nomade-dev",
  twitter: "https://twitter.com/nomade_dev",
  dribbble: "https://dribbble.com/nomade_dev",
  email: "mateen@nomade-dev.com"
};

export const contactInfo = {
  email: "mateen@nomade-dev.com",
  phone: "+41 (76) 123-4567",
  location: "Lausanne, Suisse"
};
