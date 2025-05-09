import { experiences, education } from "../lib/constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion, useScroll, useTransform } from "framer-motion";
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
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0" ref={sectionRefForParallax} aria-hidden="true"></div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-1/2 h-96 rounded-full bg-gradient-to-r from-primary/5 via-primary/0 to-transparent blur-3xl pointer-events-none"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0]),
          x: useTransform(scrollYProgress, [0, 1], ['-50%', '25%'])
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none"
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-bold text-xl mb-1 group-hover:text-primary transition-colors flex flex-col sm:flex-row sm:items-center">
                <span>{experience.title}</span>
                <span className="hidden sm:block px-2 text-gray-400">•</span>
                <span className="text-lg opacity-80 font-normal">{experience.company}</span>
              </div>
              
              <motion.time 
                className="block mb-4 text-sm font-mono text-gray-500 dark:text-gray-400 backdrop-blur-sm bg-white/30 dark:bg-background/30 px-3 py-1 rounded-full inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {experience.period}
              </motion.time>
              
              <div className="flex flex-col gap-y-2 text-base opacity-80">
                {experience.responsibilities.map((responsibility, respIndex) => (
                  <p 
                    key={respIndex}
                    className="backdrop-blur-sm bg-white/30 dark:bg-background/20 p-3 rounded-lg border border-white/10 dark:border-gray-800/30"
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
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Éducation
          </h3>
          
          <div className="max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/50 dark:bg-background/30 p-6 rounded-lg mb-6 last:mb-0 border border-white/20 dark:border-gray-800/30 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="font-bold text-xl">{edu.degree}</h4>
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400 backdrop-blur-sm bg-white/30 dark:bg-background/40 px-3 py-1 rounded-full inline-block mt-2 md:mt-0">{edu.period}</span>
                </div>
                <p className="text-lg opacity-80">{edu.institution}</p>
                <p className="mt-2 opacity-80 backdrop-blur-sm bg-white/30 dark:bg-background/20 p-3 rounded-lg border border-white/10 dark:border-gray-800/30 mt-3">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
