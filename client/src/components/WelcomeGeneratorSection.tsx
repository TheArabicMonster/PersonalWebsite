import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import WelcomeGenerator from "./WelcomeGenerator";

export default function WelcomeGeneratorSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  });
  
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
      id="welcome-generator" 
      ref={sectionRef} 
      className="py-24 relative overflow-visible bg-transparent dark:bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4" 
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Générateur de message de bienvenue
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg opacity-80 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Obtenez un message de bienvenue personnalisé basé sur votre nom et vos intérêts.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <WelcomeGenerator />
        </motion.div>
      </div>
    </section>
  );
}