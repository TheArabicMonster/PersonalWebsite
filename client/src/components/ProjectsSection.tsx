import { useState, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

// Projets avec des données statiques en français
const projects = [
  {
    id: 1,
    title: "Portfolio Personnel",
    description: "Mon site web portfolio personnel construit avec React et Tailwind CSS.",
    image: "https://picsum.photos/800/600?random=1",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/user/portfolio",
    demo: "https://portfolio-demo.com"
  },
  {
    id: 2,
    title: "Application de Gestion de Tâches",
    description: "Application de gestion de tâches avec authentification et fonctionnalités temps réel.",
    image: "https://picsum.photos/800/600?random=2",
    tags: ["Vue.js", "Firebase", "Pinia"],
    github: "https://github.com/user/task-app",
    demo: "https://task-app-demo.com"
  },
  {
    id: 3,
    title: "API Météo",
    description: "API REST pour récupérer des données météo en temps réel pour n'importe quelle ville.",
    image: "https://picsum.photos/800/600?random=3",
    tags: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/user/weather-api",
    demo: "https://weather-api-demo.com"
  },
  {
    id: 4,
    title: "Extension Chrome",
    description: "Extension Chrome pour améliorer la productivité et bloquer les distractions.",
    image: "https://picsum.photos/800/600?random=4",
    tags: ["JavaScript", "Chrome API", "CSS"],
    github: "https://github.com/user/chrome-extension",
    demo: "https://chrome-extension-demo.com"
  },
];

export default function ProjectsSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  // Référence pour les effets de parallaxe
  const sectionRefForParallax = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRefForParallax,
    offset: ["start end", "end start"]
  });
  
  // Effets de parallaxe
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-visible bg-transparent"
    >
      <div className="absolute inset-0" ref={sectionRefForParallax} aria-hidden="true"></div>
      
      {/* Éléments décoratifs */}
      <motion.div 
        className="absolute top-0 -left-64 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
        style={{ y: y1, opacity }}
      />
      <motion.div 
        className="absolute bottom-0 -right-64 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl"
        style={{ y: y2, opacity }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-primary">Projets</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 text-lg opacity-80 max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents qui illustrent mon expertise et ma passion pour le développement web.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="backdrop-blur-md bg-white/60 dark:bg-background/40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-white/30 dark:border-gray-800/50"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <div className="flex space-x-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm opacity-80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-medium rounded-lg transition-all backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -3, boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.1)" }}
          >
            <Github className="h-5 w-5 mr-2" />
            Voir plus sur GitHub
          </motion.a>
        </div>
      </div>
    </section>
  );
}
