import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useLanguage } from "../contexts/LanguageContext";
import { Rocket, Code, Lightbulb, Repeat, MousePointer } from "lucide-react";

export default function InteractivePlaygroundSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  const { language } = useLanguage();
  const [init, setInit] = useState(false);
  
  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  // Parallax effect
  const sectionRefForParallax = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRefForParallax,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Interactive magnetic effect for buttons
  const [magneticElems, setMagneticElems] = useState<HTMLElement[]>([]);
  
  useEffect(() => {
    const elements = document.querySelectorAll('.magnetic');
    setMagneticElems(Array.from(elements) as HTMLElement[]);
  }, [isInView]);
  
  // Interactive code blocks that respond to mouse movement
  const codeBlocks = [
    { 
      title: language === "fr" ? "Animation Fluide" : "Smooth Animation", 
      code: "animation: transform 0.6s ease;",
      icon: <Repeat className="h-6 w-6" /> 
    },
    { 
      title: language === "fr" ? "Design Réactif" : "Responsive Design", 
      code: "@media (max-width: 768px) { ... }",
      icon: <Code className="h-6 w-6" /> 
    },
    { 
      title: language === "fr" ? "Performance Optimisée" : "Optimized Performance", 
      code: "React.memo(() => { ... })",
      icon: <Rocket className="h-6 w-6" /> 
    },
    { 
      title: language === "fr" ? "Innovation Créative" : "Creative Innovation", 
      code: "transform: perspective(1000px)",
      icon: <Lightbulb className="h-6 w-6" /> 
    }
  ];
  
  // Sphere vertices for wave effect
  const [spherePoints, setSpherePoints] = useState<{x: number, y: number, z: number, scale: number, opacity: number}[]>([]);
  
  useEffect(() => {
    // Generate sphere points with pre-calculated animation values
    const points = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);
      // Pre-calculate randomized values for animation
      const scale = 0.8 + (Math.sin(i * 0.1) * 0.5);
      const opacity = 0.2 + (Math.sin(i * 0.1) * 0.4);
      points.push({ x, y, z, scale, opacity });
    }
    setSpherePoints(points);
  }, []);
  
  // Create base transforms for all particles
  const particleBaseScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.2, 0.8]
  );
  
  const particleBaseOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.6, 0.2]
  );

  // Interactive cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as normalized values (-0.5 to 0.5)
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mouseXNorm = (e.clientX / windowWidth) - 0.5;
      const mouseYNorm = (e.clientY / windowHeight) - 0.5;
      
      mouseX.set(mouseXNorm);
      mouseY.set(mouseYNorm);
      
      // Magnetic effect for buttons
      magneticElems.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        const elemX = rect.left + rect.width / 2;
        const elemY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const distX = e.clientX - elemX;
        const distY = e.clientY - elemY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Magnetic effect radius
        const radius = window.innerWidth * 0.15;
        
        if (distance < radius) {
          // Calculate magnetic pull strength based on distance
          const pull = 1 - (distance / radius);
          const moveX = distX * pull * 0.4;
          const moveY = distY * pull * 0.4;
          elem.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          elem.style.transform = 'translate(0px, 0px)';
        }
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY, magneticElems]);
  
  return (
    <section
      id="interactive-playground"
      ref={sectionRef}
      className="py-24 relative overflow-visible bg-transparent dark:bg-transparent min-h-[90vh] flex items-center"
    >
      <div className="absolute inset-0" ref={sectionRefForParallax} aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Playground Interactif
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 text-lg opacity-80 max-w-2xl mx-auto">
            Explorez cette démo interactive qui met en valeur les effets et animations possibles en développement web moderne.
          </p>
        </motion.div>
        
        {/* Interactive 3D Wave Sphere */}
        <motion.div
          className="mb-20 h-[400px] flex justify-center items-center perspective-1000"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-[300px] h-[300px]"
            style={{
              rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]),
              rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]),
            }}
          >
            {spherePoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: "50%",
                  top: "50%",
                  x: `calc(${point.x * 120}px - 50%)`,
                  y: `calc(${point.y * 120}px - 50%)`,
                  z: point.z * 120,
                  scale: particleBaseScale,
                  opacity: particleBaseOpacity,
                  backgroundColor: i % 4 === 0 ? "var(--primary)" : 
                               i % 4 === 1 ? "var(--secondary)" : 
                               i % 4 === 2 ? "var(--accent)" : 
                               "var(--foreground)",
                }}
                animate={{
                  x: `calc(${point.x * (120 + Math.sin(i * 0.05) * 30)}px - 50%)`,
                  y: `calc(${point.y * (120 + Math.cos(i * 0.05) * 30)}px - 50%)`,
                  scale: [
                    point.scale * 0.8, // Start
                    point.scale * 1.2, // Middle
                    point.scale * 0.8  // End
                  ],
                  opacity: [
                    point.opacity * 0.8, // Start
                    point.opacity * 1.2, // Middle
                    point.opacity * 0.8  // End
                  ],
                  transition: {
                    duration: 3 + Math.sin(i) * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }
                }}
                whileHover={{
                  scale: 2,
                  backgroundColor: "var(--primary)",
                  transition: { duration: 0.2 }
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Tilt Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {codeBlocks.map((block, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-md bg-white/20 dark:bg-background/20 rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-800/40"
              variants={itemVariants}
              style={{
                y: index % 2 === 0 ? y1 : y2,
                rotate: index % 2 === 0 ? rotate1 : rotate2,
                transformPerspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                scale: 1.05,
                rotateX: useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]).get(),
                rotateY: useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]).get(),
                boxShadow: "0 20px 30px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative p-8 h-full">
                {/* Gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className="bg-gradient-to-br from-primary to-secondary text-white p-3 rounded-xl w-12 h-12 mb-6 flex items-center justify-center shadow-lg">
                  {block.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-4">{block.title}</h3>
                
                {/* Code display */}
                <div className="bg-gray-900/90 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  {block.code}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Interactive Magnetic Buttons */}
        <motion.div 
          className="mt-16 flex justify-center flex-wrap gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="magnetic relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-70 blur-lg transform scale-110"></div>
            <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white font-bold shadow-lg">
              Effet Magnétique
            </button>
          </div>
          
          <div className="magnetic relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-70 blur-lg transform scale-110"></div>
            <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white font-bold shadow-lg">
              Déplacez-moi
            </button>
          </div>
          
          <div className="magnetic relative overflow-hidden rounded-xl flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-70 blur-lg transform scale-110"></div>
            <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl text-white font-bold shadow-lg flex items-center">
              <MousePointer className="mr-2 h-4 w-4" /> 
              Interactive
            </button>
          </div>
        </motion.div>
        
        {/* CSS for 3D effects using regular style */}
        <style>{`
          .perspective-1000 {
            perspective: 1000px;
          }
        `}</style>
      </div>
    </section>
  );
}
