import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Rocket, Code, Repeat, MousePointer } from "lucide-react";

export default function InteractivePlaygroundSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });

  const [magneticElems, setMagneticElems] = useState<HTMLElement[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Pour les effets de parallaxe
  const sectionRefForParallax = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRefForParallax,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const elements = document.querySelectorAll('.magnetic');
    setMagneticElems(Array.from(elements) as HTMLElement[]);
  }, [isInView]);

  // Blocs de code interactifs qui répondent au mouvement de la souris
  const codeBlocks = [
    { 
      title: "Animation Fluide", 
      code: "animation: transform 0.6s ease;",
      icon: <Repeat className="h-6 w-6" /> 
    },
    { 
      title: "Design Réactif", 
      code: "@media (max-width: 768px) { ... }",
      icon: <Code className="h-6 w-6" /> 
    },
    { 
      title: "Performance Optimisée", 
      code: "React.memo(() => { ... })",
      icon: <Rocket className="h-6 w-6" /> 
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      id="interactive-playground"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 dark:to-primary/10"
    >
      <div className="absolute inset-0" ref={sectionRefForParallax} aria-hidden="true"></div>
      
      {/* Éléments décoratifs animés */}
      <motion.div 
        className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl"
        style={{ y: y2 }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4" 
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Playground Interactif
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg opacity-80 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explorez mes compétences techniques à travers des démonstrations interactives
          </motion.p>
        </motion.div>

        {/* Grille de blocs de code interactifs */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {codeBlocks.map((block, index) => (
            <motion.div
              key={index}
              className="bg-white/60 dark:bg-background/40 backdrop-blur-md rounded-xl p-6 border border-white/30 dark:border-gray-800/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)" 
              }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3 text-primary group-hover:text-secondary transition-colors">
                  {block.icon}
                </div>
                <h3 className="text-lg font-bold">{block.title}</h3>
              </div>
              <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm text-green-400">
                <code>{block.code}</code>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Zone d'effets magnétiques */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8" 
            variants={itemVariants}
          >
            Effet Magnétique
          </motion.h3>
          
          <div className="magnetic relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-70 blur-lg transform scale-110"></div>
            <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white font-bold shadow-lg">
              Déplacez-moi
            </button>
          </div>
          
          <div className="magnetic relative overflow-hidden rounded-xl flex items-center justify-center mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-70 blur-lg transform scale-110"></div>
            <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white font-bold shadow-lg flex items-center">
              <MousePointer className="mr-2 h-4 w-4" /> 
              Interactive
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
