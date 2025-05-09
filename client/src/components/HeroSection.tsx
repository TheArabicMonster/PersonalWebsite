import { useState, useEffect, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { socialLinks } from "../lib/constants";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import TypingAnimation from "./TypingAnimation";
import { Button } from "./ui/button";

export default function HeroSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex items-center py-16 bg-gradient-to-b from-background to-background/90"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1 flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div>
              <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl font-medium mb-2 text-primary">
                Salut 👋, je suis
              </motion.h2>
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Mateen Khalil
              </motion.h1>
              <motion.div variants={itemVariants}>
                <TypingAnimation />
              </motion.div>
              <motion.p variants={itemVariants} className="mt-6 text-lg opacity-80 max-w-lg">
                Développeur full stack passionné avec une expertise en Vue.js, JavaScript et Python. Je crée des expériences web interactives et des solutions digitales innovantes.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <a 
                  href="#projects" 
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg transition-all"
                >
                  Voir mes projets
                </a>
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-medium rounded-lg transition-all"
                >
                  Me contacter
                </a>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-6 pt-4"
                variants={itemVariants}
              >
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={24} />
                </a>
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href={socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href={`mailto:${socialLinks.email}`} 
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Email me"
                >
                  <Mail size={24} />
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary to-secondary opacity-20 blur-2xl"></div>
                <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-primary/20 p-2">
                  <img 
                    src="/images/mateen-profile.jpeg"
                    alt="Mateen Khalil"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.a
            href="#about"
            className="flex flex-col items-center text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="mb-2">Défiler</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
