import { navItems, socialLinks } from "../lib/constants";
import { useLanguage } from "../contexts/LanguageContext";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";

export default function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Get the correct label based on the current language
  const getNavLabel = (item: typeof navItems[0]) => {
    switch (language) {
      case "fr":
        return item.labelFr;
      case "ar":
        return item.labelAr;
      default:
        return item.label;
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <a
              href="#"
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
            >
              <span className="font-mono">Mateen</span>
            </a>
            <p className="mt-2 text-gray-400 max-w-md">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-16">
            <div>
              <h4 className="text-lg font-bold mb-4">{t('footer.navigation')}</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {getNavLabel(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">{t('footer.social')}</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    Dribbble
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-gray-500">
            &copy; {currentYear} Mateen. {t('footer.copyright')}
          </p>
          
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary mr-4 transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href={socialLinks.dribbble}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
            aria-label="Dribbble"
          >
            <Dribbble className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
