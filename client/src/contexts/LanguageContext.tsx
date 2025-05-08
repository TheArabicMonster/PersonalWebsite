import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define available languages
export type Language = "en" | "fr" | "ar";

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
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
  // Navigation items
  "home": {
    "en": "Home",
    "fr": "Accueil",
    "ar": "الرئيسية"
  },
  "about": {
    "en": "About",
    "fr": "À propos",
    "ar": "حول"
  },
  "projects": {
    "en": "Projects",
    "fr": "Projets",
    "ar": "مشاريع"
  },
  "experience": {
    "en": "Experience",
    "fr": "Expérience",
    "ar": "خبرة"
  },
  "welcome-generator": {
    "en": "Welcome Generator",
    "fr": "Générateur de Message",
    "ar": "مولد الترحيب"
  },
  "contact": {
    "en": "Contact",
    "fr": "Contact",
    "ar": "اتصل بنا"
  },
  
  // Navigation items with structured ids
  "navItems.home": {
    "en": "Home",
    "fr": "Accueil",
    "ar": "الرئيسية"
  },
  "navItems.about": {
    "en": "About",
    "fr": "À propos",
    "ar": "حول"
  },
  "navItems.projects": {
    "en": "Projects",
    "fr": "Projets",
    "ar": "مشاريع"
  },
  "navItems.experience": {
    "en": "Experience",
    "fr": "Expérience",
    "ar": "خبرة"
  },
  "navItems.welcome-generator": {
    "en": "Welcome Generator",
    "fr": "Générateur de Message",
    "ar": "مولد الترحيب"
  },
  "navItems.contact": {
    "en": "Contact",
    "fr": "Contact",
    "ar": "اتصل بنا"
  },
  
  // Hero section
  "greeting": {
    "en": "Hello, I'm",
    "fr": "Bonjour, je suis",
    "ar": "مرحباً، أنا"
  },
  "hero.description": {
    "en": "I craft engaging digital experiences using modern technologies. Turning complex problems into elegant solutions is what drives my passion for development.",
    "fr": "Je conçois des expériences numériques attrayantes en utilisant des technologies modernes. Transformer des problèmes complexes en solutions élégantes est ce qui anime ma passion pour le développement.",
    "ar": "أصمم تجارب رقمية جذابة باستخدام التقنيات الحديثة. تحويل المشكلات المعقدة إلى حلول أنيقة هو ما يدفع شغفي بالتطوير."
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
  
  // About section
  "about.title.first": {
    "en": "About",
    "fr": "À",
    "ar": "عن"
  },
  "about.title.second": {
    "en": "Me",
    "fr": "propos",
    "ar": "نفسي"
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
    "ar": "نهجي في التطوير يجمع بين الخبرة التقنية وحساسية التصميم القوية. أعتقد أن الكود الرائع يجب ألا يعمل فقط بشكل مثالي ولكن يوفر أيضًا تجربة مستخدم استثنائية."
  },
  
  // Projects section
  "projects.title.first": {
    "en": "My",
    "fr": "Mes",
    "ar": "مشاريعي"
  },
  "projects.title.second": {
    "en": "Projects",
    "fr": "Projets",
    "ar": ""
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
  
  // Experience section
  "experience.title.first": {
    "en": "Work",
    "fr": "Expérience",
    "ar": "الخبرة"
  },
  "experience.title.second": {
    "en": "Experience",
    "fr": "professionnelle",
    "ar": "المهنية"
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
  
  // Contact section
  "contact.title.first": {
    "en": "Get In",
    "fr": "Entrer en",
    "ar": "تواصل"
  },
  "contact.title.second": {
    "en": "Touch",
    "fr": "Contact",
    "ar": "معي"
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
  
  // Footer
  "resume.download": {
    "en": "Download Resume",
    "fr": "Télécharger le CV",
    "ar": "تحميل السيرة الذاتية"
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
  
  // Welcome Generator
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
  "welcomeGenerator.message1": {
    "en": "Welcome, [name]! We're thrilled to have someone passionate about [interest] join our community. Looking forward to your contributions!",
    "fr": "Bienvenue, [name] ! Nous sommes ravis d'accueillir quelqu'un de passionné par [interest] dans notre communauté. Nous attendons vos contributions avec impatience !",
    "ar": "مرحبًا، [name]! نحن متحمسون لانضمام شخص شغوف بـ [interest] إلى مجتمعنا. نتطلع إلى مساهماتك!"
  },
  "welcomeGenerator.message2": {
    "en": "Hello [name]! Your interest in [interest] makes you a perfect addition to our team. We can't wait to collaborate with you!",
    "fr": "Bonjour [name] ! Votre intérêt pour [interest] fait de vous une addition parfaite à notre équipe. Nous avons hâte de collaborer avec vous !",
    "ar": "مرحبًا [name]! اهتمامك بـ [interest] يجعلك إضافة مثالية لفريقنا. لا يمكننا الانتظار للتعاون معك!"
  },
  "welcomeGenerator.message3": {
    "en": "A warm welcome to [name]! Your expertise in [interest] is exactly what we've been looking for. Great to have you on board!",
    "fr": "Un chaleureux accueil à [name] ! Votre expertise en [interest] est exactement ce que nous cherchions. Ravi de vous avoir parmi nous !",
    "ar": "ترحيب حار بـ [name]! خبرتك في [interest] هي بالضبط ما كنا نبحث عنه. رائع أن تكون معنا!"
  },
  "welcomeGenerator.message4": {
    "en": "Welcome aboard, [name]! We're excited to see how your passion for [interest] will inspire our projects. Let's create amazing things together!",
    "fr": "Bienvenue à bord, [name] ! Nous sommes impatients de voir comment votre passion pour [interest] inspirera nos projets. Créons des choses incroyables ensemble !",
    "ar": "مرحبًا بك على متن السفينة، [name]! نحن متحمسون لرؤية كيف سيلهم شغفك بـ [interest] مشاريعنا. دعنا نبدع أشياء مذهلة معًا!"
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
  },
  
  // Messages de copie
  "copySuccess": {
    "en": "Message copied to clipboard successfully!",
    "fr": "Message copié dans le presse-papiers avec succès !",
    "ar": "تم نسخ الرسالة إلى الحافظة بنجاح!"
  },
  "copyError": {
    "en": "Failed to copy the message. Please try again.",
    "fr": "Échec de la copie du message. Veuillez réessayer.",
    "ar": "فشل نسخ الرسالة. يرجى المحاولة مرة أخرى."
  },
  
  // Messages de changement de langue
  "language.changed.en": {
    "en": "Language changed to English",
    "fr": "Langue changée en Anglais",
    "ar": "تم تغيير اللغة إلى الإنجليزية"
  },
  "language.changed.fr": {
    "en": "Language changed to French",
    "fr": "Langue changée en Français",
    "ar": "تم تغيير اللغة إلى الفرنسية"
  },
  "language.changed.ar": {
    "en": "Language changed to Arabic",
    "fr": "Langue changée en Arabe",
    "ar": "تم تغيير اللغة إلى العربية"
  },

  // Animation de typing
  "typing.fullstack": {
    "en": "Full Stack Developer",
    "fr": "Développeur Full Stack",
    "ar": "مطور الويب الشامل"
  },
  "typing.vue": {
    "en": "Vue.js Enthusiast",
    "fr": "Passionné de Vue.js",
    "ar": "متحمس لـ Vue.js"
  },
  "typing.problem": {
    "en": "Problem Solver",
    "fr": "Résolveur de Problèmes",
    "ar": "حلال المشكلات"
  },
  "typing.explorer": {
    "en": "Tech Explorer",
    "fr": "Explorateur Technologique",
    "ar": "مستكشف التكنولوجيا"
  },

  // Thèmes
  "theme.dark": {
    "en": "Dark mode activated",
    "fr": "Mode sombre activé",
    "ar": "تم تفعيل الوضع الداكن"
  },
  "theme.light": {
    "en": "Light mode activated",
    "fr": "Mode clair activé",
    "ar": "تم تفعيل الوضع الفاتح"
  },
};

// Create Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      if (saved === "en" || saved === "fr" || saved === "ar") return saved;
      const browser = navigator.language.split('-')[0].toLowerCase();
      if (browser === "fr") return "fr";
      if (browser === "ar") return "ar";
    }
    return "en";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: string, params?: Record<string, string>) => {
    if (!translations[key]) return key;
    let txt = translations[key][language] || key;
    if (params) Object.entries(params).forEach(([k, v]) => {
      txt = txt.replace(new RegExp(`\\[${k}\\]`, "g"), v);
    });
    return txt;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
