import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { skills } from "../lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Code, Layers, Database, Monitor, Palette, X } from "lucide-react";
import { useState, useRef } from "react";

export default function AboutSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  const sectionRefForParallax = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRefForParallax,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect values
  const x1 = useTransform(scrollYProgress, [0, 1], [-10, 20]);
  const x2 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y1 = useTransform(scrollYProgress, [0, 1], [-10, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -10]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [6, -2]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [7, -4]);
  
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCvModal, setShowCvModal] = useState(false); // État pour contrôler la visibilité du modal CV
  
  const skillCategories = {
    "all": "Toutes",
    "frontend": "Frontend",
    "backend": "Backend",
    "tools": "Outils"
  };
  
  const categorizedSkills = {
    frontend: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS", "TailwindCSS", "SASS"],
    backend: ["Python", "Node.js", "Django", "Express", "MongoDB", "PostgreSQL"],
    tools: ["Git", "Docker", "Azure", "CI/CD", "Jest"]
  };

  const getFilteredSkills = () => {
    if (activeCategory === "all") return skills;
    return categorizedSkills[activeCategory as keyof typeof categorizedSkills] || [];
  };
  
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
  
  // Animation améliorée pour les sections/cartes
  const itemVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      scale: 0.7,
      x: [
        -120, // carte 0 (gauche)
        120,  // carte 1 (droite)
        0     // carte 2 (milieu ou en bas)
      ][i] || (i % 2 === 0 ? -100 : 100),
      y: -80 + i * 30 + (Math.random() - 0.5) * 40,
      rotate: (i % 2 === 0 ? -1 : 1) * (18 + i * 6),
      filter: 'blur(4px)'
    }),
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 16,
        delay: i * 0.18
      }
    })
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-24 relative overflow-visible bg-transparent dark:bg-transparent"
    >
      <div className="absolute inset-0" ref={sectionRefForParallax} aria-hidden="true"></div>
      <div className="container mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        <div className="mb-10 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            À <span className="text-primary">propos</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg opacity-80 max-w-2xl mx-auto">
            Développeur passionné avec une vision créative et technique
          </p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-8 sm:gap-12"
        >
          {/* Section principale avec design 3D */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div 
              className="relative"
              custom={0}
              variants={itemVariants}
            >
              <div className="absolute -left-4 -top-4 w-16 h-16 sm:w-24 sm:h-24 bg-primary/10 rounded-full filter blur-xl"></div>
              <div className="absolute -right-6 -bottom-6 w-20 h-20 sm:w-32 sm:h-32 bg-secondary/10 rounded-full filter blur-xl"></div>
              <div className="relative z-10 backdrop-blur-md bg-white/80 dark:bg-background/40 p-4 sm:p-8 rounded-2xl shadow-xl border border-white/30 dark:border-gray-800/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-full transform translate-x-8 -translate-y-8 sm:translate-x-16 sm:-translate-y-16"></div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                  <div className="relative mr-3 sm:mr-4">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                    <div className="relative bg-gradient-to-br from-primary to-secondary text-white p-2 rounded-full">
                      <Code size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  Qui suis-je?
                </h3>
                <motion.div
                  className="prose dark:prose-invert max-w-none"
                  variants={itemVariants}
                >
                  <p className="text-base sm:text-lg opacity-90 leading-relaxed mb-3 sm:mb-4">
                    Je suis un développeur <span className="font-bold text-primary">Full Stack</span> passionné par la création de solutions web performantes et élégantes. Avec une expertise en Vue.js, JavaScript et Python, je transforme des idées complexes en applications intuitives et conviviales.
                  </p>
                  <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                    Mon approche combine <span className="italic">créativité technique</span> et <span className="italic">résolution de problèmes</span> pour développer des solutions sur mesure qui répondent parfaitement aux besoins des utilisateurs et des entreprises.
                  </p>
                </motion.div>
                <motion.div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-4" variants={itemVariants}>
                  <button 
                    onClick={() => setShowCvModal(true)} 
                    className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-primary to-primary text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger mon CV
                  </button>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-5 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-medium rounded-lg transition-all text-base sm:text-lg"
                  >
                    Me contacter
                  </a>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              custom={1}
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-full">
                {/* Carte 1 */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 p-4 sm:p-6 rounded-2xl shadow-md border border-white/60 dark:border-gray-800/50 backdrop-blur-md flex flex-col">
                  <div className="bg-white/70 dark:bg-gray-800/50 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                    <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Frontend</h4>
                  <p className="text-sm opacity-75 mb-2 sm:mb-4 flex-grow">
                    Création d'interfaces modernes, réactives et accessibles avec les technologies les plus récentes.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {categorizedSkills.frontend.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Carte 2 */}
                <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/5 p-4 sm:p-6 rounded-2xl shadow-md border border-white/60 dark:border-gray-800/50 backdrop-blur-md flex flex-col">
                  <div className="bg-white/70 dark:bg-gray-800/50 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                    <Database className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Backend</h4>
                  <p className="text-sm opacity-75 mb-2 sm:mb-4 flex-grow">
                    Construction de systèmes backend robustes, évolutifs et performants pour soutenir vos applications.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {categorizedSkills.backend.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white/50 dark:bg-gray-800/50 text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Carte 3 */}
                <motion.div 
                  className="sm:col-span-2 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10 p-4 sm:p-6 rounded-2xl shadow-md border border-white/60 dark:border-gray-800/50 backdrop-blur-md mt-4 sm:mt-0"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="bg-white/70 dark:bg-gray-800/50 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md mr-3 sm:mr-4">
                      <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold">Approche</h4>
                      <p className="text-sm opacity-75">Méthodologie basée sur la qualité et l'innovation</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-xs sm:text-sm">Architecture scalable</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-xs sm:text-sm">Tests automatisés</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-xs sm:text-sm">Design centré utilisateur</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-xs sm:text-sm">Performance optimisée</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          {/* Section compétences avec filtres */}
          <motion.div 
            className="mt-10 sm:mt-16 bg-white/80 dark:bg-background/40 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-lg border border-white/30 dark:border-gray-800/50"
            custom={2}
            variants={itemVariants}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
              <div className="relative mr-3 sm:mr-4">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                <div className="relative bg-gradient-to-br from-primary to-secondary text-white p-2 rounded-full">
                  <Palette size={18} className="sm:w-5 sm:h-5" />
                </div>
              </div>
              Compétences techniques
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {Object.entries(skillCategories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeCategory === key 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-white/70 dark:bg-background/70 hover:bg-white/90 dark:hover:bg-background/50 backdrop-blur-sm border border-white/30 dark:border-gray-800/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {getFilteredSkills().map((skill, index) => (
                <motion.span 
                  key={index}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-white/50 to-white/70 dark:from-background/50 dark:to-background/30 rounded-full text-xs sm:text-sm font-medium border border-white/30 dark:border-gray-700/30 shadow-sm backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal pour la prévisualisation du CV */}
      {showCvModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-background p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col relative"
          >
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h4 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Mon CV</h4>
              <div className="flex gap-2">
                <a 
                  href="/CV_MatKhalil.pdf" 
                  download="CV_MatKhalil.pdf"
                  className="text-primary hover:text-primary-dark p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                  aria-label="Télécharger le CV"
                >
                  <Download size={20} /> 
                  <span className="text-sm">Télécharger</span>
                </a>
                <button 
                  onClick={() => setShowCvModal(false)} 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Fermer la prévisualisation du CV"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <iframe 
              src="/CV_MatKhalil.pdf" 
              className="w-full h-full border-0 rounded bg-white"
              title="CV de Mat Khalil"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
