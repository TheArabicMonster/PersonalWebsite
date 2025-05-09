import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { skills } from "../lib/constants";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AboutSection() {
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
      id="about"
      ref={sectionRef}
      className="py-24"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            À <span className="text-primary">propos</span>
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
                src="/images/mateen-profile.jpeg" 
                alt="Mateen Khadama"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </motion.div>
          
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-4"
              variants={itemVariants}
            >
              Qui suis-je?
            </motion.h3>
            <motion.p 
              className="text-base sm:text-lg opacity-80 leading-relaxed"
              variants={itemVariants}
            >
              Je suis un développeur Full Stack passionné par la création de solutions web performantes et élégantes. Avec une expertise en Vue.js, JavaScript et Python, je transforme des idées complexes en applications intuitives et conviviales.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg opacity-80 leading-relaxed"
              variants={itemVariants}
            >
              Mon approche combine créativité technique et résolution de problèmes pour développer des solutions sur mesure qui répondent parfaitement aux besoins des utilisateurs et des entreprises.
            </motion.p>
            
            <motion.div 
              className="pt-4"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-4">Mes compétences techniques</h3>
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
                Télécharger mon CV
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
