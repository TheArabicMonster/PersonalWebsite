import { experiences, education } from "../lib/constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
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
              
              <time className="block mb-4 text-sm font-mono text-gray-500 dark:text-gray-400">
                {experience.period}
              </time>
              
              <div className="flex flex-col gap-y-2 text-base opacity-80">
                {experience.responsibilities.map((responsibility, respIndex) => (
                  <p key={respIndex}>{responsibility}</p>
                ))}
              </div>
              
              <div className="absolute left-0 sm:left-20 top-7 flex justify-center">
                <div className="w-6 h-6 bg-primary rounded-full shadow flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                {index < experiences.length - 1 && (
                  <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 absolute top-6 -bottom-6 left-3"></div>
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
                className="bg-gray-50 dark:bg-background/60 p-6 rounded-lg mb-6 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="font-bold text-xl">{edu.degree}</h4>
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{edu.period}</span>
                </div>
                <p className="text-lg opacity-80">{edu.institution}</p>
                <p className="mt-2 opacity-80">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
