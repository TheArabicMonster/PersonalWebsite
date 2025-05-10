import React from 'react';
import { education } from "../lib/constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { GraduationCap, Building, BookOpen } from "lucide-react";

export default function EducationSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 relative bg-transparent dark:bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mt-0"> {/* Adjusted from mt-24 as it's a new section */}
          <motion.div 
            className="relative text-center mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
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
                  className="mt-4" 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, y: -2 }}
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
