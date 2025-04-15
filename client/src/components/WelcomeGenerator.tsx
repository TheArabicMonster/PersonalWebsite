import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { Loader2, Copy, Check } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function WelcomeGenerator() {
  const [name, setName] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // Simulated predefined messages in different languages
  const predefinedMessages = {
    en: [
      "Welcome, [name]! I see you're interested in [interest]. Let's explore how my projects and skills align with your interests.",
      "Hello [name]! Thanks for visiting my portfolio. I notice you're passionate about [interest]. I have some related projects you might like.",
      "Great to meet you, [name]! Your interest in [interest] shows good taste. Feel free to check out my work in this area.",
      "Welcome aboard, [name]! As a fellow [interest] enthusiast, I think you'll find my portfolio showcases relevant skills and projects."
    ],
    fr: [
      "Bienvenue, [name] ! Je vois que vous êtes intéressé(e) par [interest]. Explorons comment mes projets et compétences correspondent à vos intérêts.",
      "Bonjour [name] ! Merci de visiter mon portfolio. Je remarque que vous êtes passionné(e) par [interest]. J'ai quelques projets connexes qui pourraient vous plaire.",
      "Ravi de vous rencontrer, [name] ! Votre intérêt pour [interest] montre votre bon goût. N'hésitez pas à consulter mon travail dans ce domaine.",
      "Bienvenue à bord, [name] ! En tant que passionné(e) de [interest], je pense que vous trouverez que mon portfolio met en valeur des compétences et des projets pertinents."
    ],
    ar: [
      "مرحبًا، [name]! أرى أنك مهتم بـ [interest]. دعنا نستكشف كيف تتوافق مشاريعي ومهاراتي مع اهتماماتك.",
      "مرحبًا [name]! شكرًا لزيارة محفظتي. ألاحظ أنك شغوف بـ [interest]. لدي بعض المشاريع ذات الصلة التي قد تعجبك.",
      "سعيد بلقائك، [name]! اهتمامك بـ [interest] يدل على ذوقك الجيد. لا تتردد في الاطلاع على عملي في هذا المجال.",
      "أهلاً بك، [name]! بصفتك متحمسًا لـ [interest]، أعتقد أنك ستجد أن محفظتي تعرض المهارات والمشاريع ذات الصلة."
    ]
  };

  const generateWelcomeMessage = () => {
    if (!name || !interest) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Select a random message from the predefined list based on current language
      const messages = predefinedMessages[language as keyof typeof predefinedMessages] || predefinedMessages.en;
      const randomIndex = Math.floor(Math.random() * messages.length);
      let selectedMessage = messages[randomIndex];
      
      // Replace placeholders with actual values
      selectedMessage = selectedMessage
        .replace('[name]', name)
        .replace('[interest]', interest);
      
      setMessage(selectedMessage);
      setShowMessage(true);
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setName("");
    setInterest("");
    setShowMessage(false);
    setMessage("");
    setCopied(false);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      
      // Show toast notification
      toast({
        title: t('welcomeGenerator'),
        description: language === 'fr' 
          ? "Message copié dans le presse-papiers!" 
          : language === 'ar' 
            ? "تم نسخ الرسالة إلى الحافظة!" 
            : "Message copied to clipboard!",
      });
      
      // Reset copy icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy message: ", err);
      toast({
        title: t('welcomeGenerator'),
        description: language === 'fr' 
          ? "Échec de la copie du message" 
          : language === 'ar' 
            ? "فشل نسخ الرسالة" 
            : "Failed to copy message",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary text-2xl">{t('welcomeGenerator')}</CardTitle>
        <CardDescription>{t('welcomeGeneratorDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        {!showMessage ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t('yourName')}
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enterName')}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium mb-1">
                {t('yourInterest')}
              </label>
              <Input
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder={t('enterInterest')}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          <div className="bg-primary/5 p-5 rounded-lg border border-primary/20 my-4">
            <p className="text-lg font-medium italic">{message}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showMessage ? (
          <Button
            onClick={generateWelcomeMessage}
            disabled={!name || !interest || loading}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('generateMessage')}
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={resetForm} className="flex-1">
              {t('tryAgain')}
            </Button>
            <Button 
              className="flex-1" 
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {t('copyMessage')}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}