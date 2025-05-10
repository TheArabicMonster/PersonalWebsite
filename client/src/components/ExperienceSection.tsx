import { experiences } from "../lib/constants";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ExperienceSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  // Parallax effect for scrolling
  const sectionRefForParallax = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRefForParallax,
    offset: ["start end", "end start"],
  });

  // Transform values for parallax effects
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.2, 0.8, 0.8, 0.2]
  );
  const timelineDotScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1.2, 0.8]
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative overflow-visible bg-transparent dark:bg-transparent"
    >
      <div
        className="absolute inset-0"
        ref={sectionRefForParallax}
        aria-hidden="true"
      ></div>

      {/* Decorative elements with consistent appearance in dark mode */}
      <motion.div
        className="absolute top-1/4 left-0 w-1/2 h-96 rounded-full bg-gradient-to-r from-primary/5 via-primary/0 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent blur-3xl pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0]),
          x: useTransform(scrollYProgress, [0, 1], ["-50%", "25%"]),
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0.05]),
          y: useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]),
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

        <div className="max-w-3xl mx-auto relative">
          {/* Nouvelle timeline verticale adaptée au projet */}
          <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center z-0 w-0.5">
            <div className="h-full w-full bg-gradient-to-b from-primary via-secondary/60 to-primary/30 rounded-full shadow-md" />
          </div>
          <div className="flex flex-col gap-14">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="relative flex group"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.7, delay: index * 0.13 }}
              >
                {/* Dot animé sur la timeline */}
                <div className="z-10 flex flex-col items-center mr-8 min-w-[2.5rem]">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-white dark:border-background shadow-lg transition-transform duration-200 group-hover:scale-125"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.13 }}
                  />
                </div>
                {/* Carte expérience */}
                <div className="flex-1 bg-white/90 dark:bg-background/70 rounded-2xl shadow-lg border border-white/30 dark:border-gray-800/50 p-6 group-hover:shadow-2xl transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <div className="font-bold text-lg text-primary">
                      {experience.title}
                    </div>
                    <span className="hidden sm:block px-2 text-gray-400">
                      •
                    </span>
                    <div className="text-base text-gray-700 dark:text-gray-300 font-medium">
                      {experience.company}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {experience.period}
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-base opacity-90">
                    {experience.responsibilities.map(
                      (responsibility, respIndex) => (
                        <li key={respIndex}>{responsibility}</li>
                      )
                    )}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
