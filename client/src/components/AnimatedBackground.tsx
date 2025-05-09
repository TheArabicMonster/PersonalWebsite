import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedBackground() {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothed mouse values with spring physics
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Get scroll progress
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    // Set initial window dimensions
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    
    // Update dimensions on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5); // Normalize to -0.5 to 0.5
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  // Transform values based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0.5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, windowHeight * -0.5]);
  const y3 = useTransform(scrollYProgress, [0, 1], [windowHeight * 0.2, windowHeight * -0.3]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.2]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.15, 0.3]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.3, 0.15]);
  
  // Transform values based on mouse position
  const mouseShapeX1 = useTransform(smoothMouseX, [-0.5, 0.5], ["-10%", "10%"]);
  const mouseShapeY1 = useTransform(smoothMouseY, [-0.5, 0.5], ["-10%", "10%"]);
  const mouseShapeX2 = useTransform(smoothMouseX, [-0.5, 0.5], ["10%", "-10%"]);
  const mouseShapeY2 = useTransform(smoothMouseY, [-0.5, 0.5], ["10%", "-10%"]);
  const mouseRotate1 = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const mouseRotate2 = useTransform(smoothMouseY, [-0.5, 0.5], [-5, 5]);
  
  // Hue rotation for subtle color shifts
  const hueRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90 dark:from-background/90 dark:to-background z-0" />
      
      {/* Animated noise texture overlay for subtle texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay z-0">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] bg-repeat bg-center" 
             style={{ filter: `contrast(120%) brightness(120%)` }} />
      </div>
      
      {/* Mouse-reactive gradient highlight */}
      <motion.div 
        className="absolute w-full h-full opacity-[0.07] dark:opacity-[0.12] blur-3xl"
        style={{
          background: `radial-gradient(circle at ${useTransform(smoothMouseX, [-0.5, 0.5], ["30%", "70%"])} ${useTransform(smoothMouseY, [-0.5, 0.5], ["30%", "70%"])}, var(--primary) 0%, transparent 60%)`,
          filter: `hue-rotate(${hueRotate}deg)`,
          transform: "translateZ(0)"
        }}
      />
      
      {/* Main animated shapes */}
      <motion.div 
        className="absolute top-10 -left-32 w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"
        style={{ 
          y: y1, 
          x: mouseShapeX1,
          rotate: useTransform(() => rotate1.get() + mouseRotate1.get()),
          scale: scale1,
          opacity: opacity1
        }} 
      />
      
      <motion.div 
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-secondary/15 dark:bg-secondary/10 blur-3xl"
        style={{ 
          y: y2,
          x: mouseShapeX2,
          rotate: useTransform(() => rotate2.get() + mouseRotate2.get()),
          scale: scale2,
          opacity: opacity2
        }} 
      />
      
      <motion.div 
        className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-full bg-blue-400/10 dark:bg-blue-400/5 blur-3xl"
        style={{ 
          y: y3,
          x: useTransform(smoothMouseX, [-0.5, 0.5], ["-5%", "5%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 30]),
          scale: useTransform(scrollYProgress, [0, 0.7, 1], [1, 1.2, 0.9]),
        }} 
      />
      
      {/* Additional shape for more depth */}
      <motion.div 
        className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 dark:bg-accent/5 blur-3xl hidden md:block"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, windowHeight * -0.4]),
          x: useTransform(smoothMouseX, [-0.5, 0.5], ["5%", "-5%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -20]),
          scale: useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1.3, 1]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 1], [0.2, 0.4, 0.1]),
        }} 
      />
      
      {/* Grid overlay effect - Différent pour chaque thème */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.07] z-10 dark:hidden" />
      
      {/* Grille blanche visible uniquement en mode sombre */}
      <div className="absolute inset-0 bg-[url('/images/dark/grid-white.svg')] bg-center opacity-[0.25] z-10 hidden dark:block" />
      
      {/* Dynamic light beam effect */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent"
        style={{
          clipPath: `polygon(0 0, 100% 0, ${useTransform(smoothMouseX, [-0.5, 0.5], ["60%", "40%"])} 100%, ${useTransform(smoothMouseX, [-0.5, 0.5], ["40%", "60%"])} 100%)`,
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
          y: useTransform(scrollYProgress, [0, 0.5], [0, windowHeight * 0.3])
        }}
      />
      
      {/* Light beams (visible only in dark mode) */}
      <motion.div 
        className="hidden dark:block absolute top-0 left-1/3 w-1/3 h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          y: useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0.3]),
          x: useTransform(smoothMouseX, [-0.5, 0.5], ["-10%", "10%"])
        }}
      />
    </div>
  );
}