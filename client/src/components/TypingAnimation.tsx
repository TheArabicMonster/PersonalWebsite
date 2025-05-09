import { useState, useEffect, useRef } from "react";

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState("");
  
  // Phrases statiques en français
  const phrases = [
    "Développeur Full Stack",
    "Expert Vue.js",
    "Résolveur de problèmes",
    "Explorateur du web"
  ];
  
  // Références pour gérer l'état d'animation
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const typingSpeed = useRef(150);
  
  // Animation d'écriture
  useEffect(() => {
    const typeText = () => {
      const currentPhrase = phrases[phraseIndex.current];
      
      if (isDeleting.current) {
        // Suppression de texte
        setDisplayText(prevText => prevText.substring(0, prevText.length - 1));
        charIndex.current--;
        typingSpeed.current = 50;
      } else {
        // Écriture de texte
        setDisplayText(currentPhrase.substring(0, charIndex.current + 1));
        charIndex.current++;
        typingSpeed.current = 150;
      }
      
      // Si la phrase est complète, commencer à supprimer après un délai
      if (!isDeleting.current && charIndex.current === currentPhrase.length) {
        isDeleting.current = true;
        typingSpeed.current = 1500; // Pause à la fin de la phrase
      }
      
      // Si la suppression est complète, passer à la phrase suivante
      if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false;
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        typingSpeed.current = 500; // Pause avant la nouvelle phrase
      }
    };
    
    const typingTimeout = setTimeout(typeText, typingSpeed.current);
    
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [displayText]);

  return (
    <div className="text-2xl sm:text-3xl font-bold animate-typing">
      {displayText}
    </div>
  );
}
