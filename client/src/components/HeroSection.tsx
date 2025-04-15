import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import TypingAnimation from "./TypingAnimation";
import { socialLinks } from "../lib/constants";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function HeroSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  });
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden flex items-center pt-20"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <p className="text-lg sm:text-xl font-mono mb-2 text-secondary">
                  {t('greeting')}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-primary">Youssef</span>
                </h1>
                <div className="mt-4 h-14">
                  <TypingAnimation />
                </div>
              </motion.div>
              
              <motion.p 
                className="text-lg opacity-80 leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                I craft engaging digital experiences using modern technologies. Turning complex problems into elegant solutions 
                is what drives my passion for development.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <a 
                  href="#projects" 
                  className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  {t('viewWork')}
                </a>
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-medium rounded-lg transition-all"
                >
                  {t('getInTouch')}
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
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-xl transform scale-95"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Youssef's profile" 
                  className="rounded-full w-56 h-56 sm:w-72 sm:h-72 object-cover border-4 border-white dark:border-background shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#about" className="text-foreground opacity-60 hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
