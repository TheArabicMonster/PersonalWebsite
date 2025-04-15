import { skills } from "../lib/constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AboutSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      id="about"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('about.title').split(' ')[0]} <span className="text-primary">{t('about.title').split(' ')[1]}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <div className="relative rounded-lg overflow-hidden aspect-video shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80" 
                alt="Working on code" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
          
          <div className="space-y-6">
            <motion.h3 
              className="text-2xl font-bold"
              variants={itemVariants}
            >
              {t('about.who')}
            </motion.h3>
            <motion.p 
              className="text-base sm:text-lg opacity-80 leading-relaxed"
              variants={itemVariants}
            >
              {t('about.description1')}
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg opacity-80 leading-relaxed"
              variants={itemVariants}
            >
              {t('about.description2')}
            </motion.p>
            
            <motion.div 
              className="pt-4"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-4">{t('about.skills')}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span 
                    key={index}
                    className="px-4 py-2 bg-gray-100 dark:bg-background/20 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="pt-6"
              variants={itemVariants}
            >
              <a 
                href="/resume.pdf" 
                target="_blank" 
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-medium rounded-lg transition-all"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('resume.download')}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
