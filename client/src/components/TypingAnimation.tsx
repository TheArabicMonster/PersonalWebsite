import { useState, useEffect, useRef } from "react";
import { typingPhrases } from "../lib/constants";
import { useLanguage } from "../contexts/LanguageContext";

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState("");
  const { language } = useLanguage();
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const typingSpeed = useRef(100);

  useEffect(() => {
    // Reset animation when language changes
    phraseIndex.current = 0;
    charIndex.current = 0;
    isDeleting.current = false;
    typingSpeed.current = 100;
    setDisplayText("");
  }, [language]);

  useEffect(() => {
    const getLocalizedPhrases = () => {
      return typingPhrases.map(phrase => {
        switch (language) {
          case "fr":
            return phrase.fr;
          case "ar":
            return phrase.ar;
          default:
            return phrase.en;
        }
      });
    };
    
    const phrases = getLocalizedPhrases();
    const currentPhrase = phrases[phraseIndex.current];
    
    const typeText = () => {
      if (isDeleting.current) {
        // Deleting text
        setDisplayText(prevText => prevText.substring(0, prevText.length - 1));
        charIndex.current--;
        typingSpeed.current = 50;
      } else {
        // Typing text
        setDisplayText(currentPhrase.substring(0, charIndex.current + 1));
        charIndex.current++;
        typingSpeed.current = 150;
      }
      
      // If phrase is complete, start deleting after delay
      if (!isDeleting.current && charIndex.current === currentPhrase.length) {
        isDeleting.current = true;
        typingSpeed.current = 1500; // Pause at the end of phrase
      }
      
      // If deletion is complete, move to next phrase
      if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false;
        phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        typingSpeed.current = 500; // Pause before new phrase
      }
    };
    
    const typingTimeout = setTimeout(typeText, typingSpeed.current);
    
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [displayText, language]);

  return (
    <div className="text-2xl sm:text-3xl font-bold animate-typing">
      {displayText}
    </div>
  );
}
