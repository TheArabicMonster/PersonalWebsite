import { experiences, education } from "../lib/constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, BookOpen, Calendar, Building } from "lucide-react";
import { useRef } from "react";

export default function ExperienceSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  // Parallax effect for scrolling
  const sectionRefForParallax = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRefForParallax,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.8, 0.8, 0.2]);
  const timelineDotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/95 dark:from-background dark:to-background/95"
    >
      <div className="absolute inset-0" ref={sectionRefForParallax} aria-hidden="true"></div>
      
      {/* Decorative elements with consistent appearance in dark mode */}
      <motion.div 
        className="absolute top-1/4 left-0 w-1/2 h-96 rounded-full bg-gradient-to-r from-primary/5 via-primary/0 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent blur-3xl pointer-events-none"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0]),
          x: useTransform(scrollYProgress, [0, 1], ['-50%', '25%'])
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl pointer-events-none"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0.05]),
          y: useTransform(scrollYProgress, [0, 1], ['25%', '-25%'])
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Expérience <span className="text-primary">professionnelle</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 text-lg opacity-80 max-w-2xl mx-auto">
            Mon parcours professionnel dans l'industrie technologique.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="relative pl-8 sm:pl-32 py-6 group"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="font-bold text-xl mb-1 group-hover:text-primary transition-colors flex flex-col sm:flex-row sm:items-center">
                <span>{experience.title}</span>
                <span className="hidden sm:block px-2 text-gray-400">•</span>
                <span className="text-lg opacity-80 font-normal">{experience.company}</span>
              </div>
              
              <motion.time 
                className="block mb-4 text-sm font-mono text-gray-500 dark:text-gray-400 backdrop-blur-sm bg-white/30 dark:bg-background/50 px-3 py-1 rounded-full inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {experience.period}
              </motion.time>
              
              <div className="flex flex-col gap-y-2 text-base opacity-80">
                {experience.responsibilities.map((responsibility, respIndex) => (
                  <p 
                    key={respIndex}
                    className="backdrop-blur-sm bg-white/30 dark:bg-background/40 p-3 rounded-lg border border-white/10 dark:border-gray-800/50"
                  >
                    {responsibility}
                  </p>
                ))}
              </div>
              
              <div className="absolute left-0 sm:left-20 top-7 flex justify-center">
                <motion.div 
                  className="w-6 h-6 bg-primary rounded-full shadow flex items-center justify-center"
                  style={{ scale: timelineDotScale }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </motion.div>
                {index < experiences.length - 1 && (
                  <motion.div 
                    className="h-full w-0.5 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/30 absolute top-6 -bottom-6 left-3"
                    style={{ opacity: lineOpacity }}
                  ></motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24">
          <motion.div 
            className="relative text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          >
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/5 rounded-full blur-2xl opacity-60 dark:opacity-40"
              animate={{ 
                scale: [1, 1.1, 1], 
                rotate: [0, 5, 0] 
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.h3 
              className="text-3xl sm:text-4xl font-bold relative inline-block"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Éducation
              </span>
              <motion.div 
                className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ originX: 0 }}
              />
            </motion.h3>
            <motion.p 
              className="text-lg opacity-70 mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Mon parcours académique et mes formations professionnelles
            </motion.p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-gradient-to-br from-white/60 via-white/50 to-white/40 dark:from-background/60 dark:via-background/50 dark:to-background/30 p-6 rounded-2xl border border-white/30 dark:border-gray-800/50 shadow-lg overflow-hidden relative group"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
              >
                <motion.div 
                  className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full filter blur-xl opacity-70"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <motion.div
                  className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shadow"
                  whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
                >
                  <GraduationCap size={24} />
                </motion.div>
                
                <motion.div 
                  className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white text-sm px-3 py-1 rounded-full inline-block mb-4 font-medium" 
                  whileHover={{ scale: 1.05 }}
                >
                  {edu.period}
                </motion.div>
                
                <motion.h4 
                  className="text-xl font-bold mb-2"
                  whileHover={{ color: "var(--primary)", x: 2 }}
                >
                  {edu.degree}
                </motion.h4>
                
                <motion.div className="flex items-center gap-2 mb-4">
                  <Building className="h-4 w-4 text-secondary opacity-70" />
                  <p className="text-lg opacity-80">{edu.institution}</p>
                </motion.div>
                
                <motion.div 
                  className="mt-4 p-4 rounded-xl bg-white/50 dark:bg-background/50 border border-white/20 dark:border-gray-800/30"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, y: -2, backgroundColor: "rgba(var(--primary-rgb), 0.05)" }}
                >
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 text-primary opacity-80 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed opacity-80">{edu.description}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="w-full h-1 mt-6 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-30"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Decorative bottom element */}
          <motion.div 
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
