import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export type Language = "en" | "fr" | "ar";

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Define translations
const translations: Record<string, Record<Language, string>> = {
  "greeting": {
    "en": "Hello, I'm",
    "fr": "Bonjour, je suis",
    "ar": "مرحباً، أنا"
  },
  "about.title": {
    "en": "About Me",
    "fr": "À propos de moi",
    "ar": "عني"
  },
  "about.who": {
    "en": "Who am I?",
    "fr": "Qui suis-je?",
    "ar": "من أنا؟"
  },
  "about.skills": {
    "en": "My Technical Arsenal",
    "fr": "Mon arsenal technique",
    "ar": "مهاراتي التقنية"
  },
  "about.description1": {
    "en": "I'm a passionate full-stack developer with a focus on creating intuitive and performant web applications. With over 5 years of experience in the field, I've worked on a diverse range of projects from small business websites to complex enterprise applications.",
    "fr": "Je suis un développeur full-stack passionné par la création d'applications web intuitives et performantes. Avec plus de 5 ans d'expérience dans le domaine, j'ai travaillé sur une gamme diversifiée de projets, des sites web de petites entreprises aux applications d'entreprise complexes.",
    "ar": "أنا مطور ويب شامل متحمس لإنشاء تطبيقات ويب بديهية وعالية الأداء. مع أكثر من 5 سنوات من الخبرة في هذا المجال، عملت على مجموعة متنوعة من المشاريع من مواقع الويب للشركات الصغيرة إلى تطبيقات المؤسسات المعقدة."
  },
  "about.description2": {
    "en": "My approach to development combines technical expertise with a strong design sensibility. I believe that great code should not only function flawlessly but also provide an exceptional user experience.",
    "fr": "Mon approche du développement combine expertise technique et sensibilité au design. Je crois que le bon code ne doit pas seulement fonctionner parfaitement, mais aussi offrir une expérience utilisateur exceptionnelle.",
    "ar": "ينهجي في التطوير يجمع بين الخبرة التقنية وحساسية التصميم القوية. أعتقد أن الكود الرائع يجب ألا يعمل فقط بشكل مثالي ولكن يوفر أيضًا تجربة مستخدم استثنائية."
  },
  "projects.title": {
    "en": "My Projects",
    "fr": "Mes projets",
    "ar": "مشاريعي"
  },
  "projects.subtitle": {
    "en": "Here are some of my recent projects that showcase my skills and expertise.",
    "fr": "Voici quelques-uns de mes projets récents qui mettent en valeur mes compétences et mon expertise.",
    "ar": "إليك بعض مشاريعي الأخيرة التي تعرض مهاراتي وخبرتي."
  },
  "projects.viewMore": {
    "en": "View More on GitHub",
    "fr": "Voir plus sur GitHub",
    "ar": "عرض المزيد على GitHub"
  },
  "experience.title": {
    "en": "Work Experience",
    "fr": "Expérience professionnelle",
    "ar": "الخبرة المهنية"
  },
  "experience.subtitle": {
    "en": "My professional journey in the tech industry.",
    "fr": "Mon parcours professionnel dans l'industrie technologique.",
    "ar": "رحلتي المهنية في صناعة التكنولوجيا."
  },
  "education.title": {
    "en": "Education",
    "fr": "Éducation",
    "ar": "التعليم"
  },
  "contact.title": {
    "en": "Get In Touch",
    "fr": "Entrer en contact",
    "ar": "تواصل معي"
  },
  "contact.subtitle": {
    "en": "Have a project in mind or want to collaborate? Feel free to reach out!",
    "fr": "Vous avez un projet en tête ou souhaitez collaborer? N'hésitez pas à me contacter!",
    "ar": "هل لديك مشروع في ذهنك أو ترغب في التعاون؟ لا تتردد في التواصل!"
  },
  "contact.form.name": {
    "en": "Name",
    "fr": "Nom",
    "ar": "الاسم"
  },
  "contact.form.email": {
    "en": "Email",
    "fr": "Email",
    "ar": "البريد الإلكتروني"
  },
  "contact.form.subject": {
    "en": "Subject",
    "fr": "Sujet",
    "ar": "الموضوع"
  },
  "contact.form.message": {
    "en": "Message",
    "fr": "Message",
    "ar": "الرسالة"
  },
  "contact.form.submit": {
    "en": "Send Message",
    "fr": "Envoyer le message",
    "ar": "إرسال الرسالة"
  },
  "contact.info.title": {
    "en": "Contact Information",
    "fr": "Informations de contact",
    "ar": "معلومات الاتصال"
  },
  "contact.info.email": {
    "en": "Email",
    "fr": "Email",
    "ar": "البريد الإلكتروني"
  },
  "contact.info.phone": {
    "en": "Phone",
    "fr": "Téléphone",
    "ar": "الهاتف"
  },
  "contact.info.location": {
    "en": "Location",
    "fr": "Emplacement",
    "ar": "الموقع"
  },
  "contact.info.connect": {
    "en": "Connect With Me",
    "fr": "Connectez-vous avec moi",
    "ar": "تواصل معي"
  },
  "resume.download": {
    "en": "Download Resume",
    "fr": "Télécharger le CV",
    "ar": "تحميل السيرة الذاتية"
  },
  "viewWork": {
    "en": "View My Work",
    "fr": "Voir mon travail",
    "ar": "عرض أعمالي"
  },
  "getInTouch": {
    "en": "Get In Touch",
    "fr": "Entrer en contact",
    "ar": "تواصل معي"
  },
  "footer.copyright": {
    "en": "All rights reserved.",
    "fr": "Tous droits réservés.",
    "ar": "جميع الحقوق محفوظة."
  },
  "footer.description": {
    "en": "Creating meaningful digital experiences through clean code and thoughtful design.",
    "fr": "Créer des expériences numériques significatives grâce à un code propre et une conception réfléchie.",
    "ar": "إنشاء تجارب رقمية هادفة من خلال كود نظيف وتصميم مدروس."
  },
  "footer.navigation": {
    "en": "Navigation",
    "fr": "Navigation",
    "ar": "التنقل"
  },
  "footer.social": {
    "en": "Social",
    "fr": "Social",
    "ar": "التواصل الاجتماعي"
  },
  "footer.privacy": {
    "en": "Privacy Policy",
    "fr": "Politique de confidentialité",
    "ar": "سياسة الخصوصية"
  },
  "footer.terms": {
    "en": "Terms of Service",
    "fr": "Conditions d'utilisation",
    "ar": "شروط الخدمة"
  },
  "welcomeGenerator": {
    "en": "Welcome Message Generator",
    "fr": "Générateur de message de bienvenue",
    "ar": "مولد رسائل الترحيب"
  },
  "welcomeGeneratorDesc": {
    "en": "Get a personalized welcome message based on your name and interests.",
    "fr": "Obtenez un message de bienvenue personnalisé basé sur votre nom et vos intérêts.",
    "ar": "احصل على رسالة ترحيب مخصصة بناءً على اسمك واهتماماتك."
  },
  "yourName": {
    "en": "Your Name",
    "fr": "Votre Nom",
    "ar": "اسمك"
  },
  "enterName": {
    "en": "Enter your name",
    "fr": "Entrez votre nom",
    "ar": "أدخل اسمك"
  },
  "yourInterest": {
    "en": "Your Interest",
    "fr": "Votre Centre d'Intérêt",
    "ar": "اهتمامك"
  },
  "enterInterest": {
    "en": "E.g. Web Development, AI, Design...",
    "fr": "Ex: Développement Web, IA, Design...",
    "ar": "مثال: تطوير الويب، الذكاء الاصطناعي، التصميم..."
  },
  "generateMessage": {
    "en": "Generate Message",
    "fr": "Générer le Message",
    "ar": "إنشاء الرسالة"
  },
  "tryAgain": {
    "en": "Try Again",
    "fr": "Réessayer",
    "ar": "حاول مرة أخرى"
  },
  "copyMessage": {
    "en": "Copy Message",
    "fr": "Copier le Message",
    "ar": "نسخ الرسالة"
  }
};

// Create Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try-catch to handle any potential localStorage errors
  const getSavedLanguage = (): Language => {
    try {
      const savedLanguage = localStorage.getItem("language") as Language;
      return savedLanguage === "en" || savedLanguage === "fr" || savedLanguage === "ar" 
        ? savedLanguage 
        : "en";
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return "en";
    }
  };

  const [language, setLanguage] = useState<Language>(getSavedLanguage());

  // Apply language settings immediately on mount
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, []);

  useEffect(() => {
    try {
      // Save language preference
      localStorage.setItem("language", language);
      
      // Set document direction for RTL support
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      
      // Set the document language attribute
      document.documentElement.lang = language;
      
      console.log(`Language switched to: ${language}`);
    } catch (error) {
      console.error("Error setting language preferences:", error);
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    console.log("Changing language to:", lang);
    setLanguage(lang);
  };

  const contextValue = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
