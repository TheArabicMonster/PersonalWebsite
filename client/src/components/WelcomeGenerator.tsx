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

  // Obtenir les messages prédéfinis à partir de traductions
  const getPredefinedMessages = () => {
    // Clés de traduction pour les messages
    const messageKeys = [
      'welcomeGenerator.message1',
      'welcomeGenerator.message2',
      'welcomeGenerator.message3',
      'welcomeGenerator.message4',
    ];
    
    // Récupérer le message traduit pour la langue actuelle
    return messageKeys.map(key => t(key));
  };

  const generateWelcomeMessage = () => {
    if (!name || !interest) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Obtenir les messages traduits
      const messageKeys = [
        'welcomeGenerator.message1',
        'welcomeGenerator.message2',
        'welcomeGenerator.message3',
        'welcomeGenerator.message4',
      ];
      
      const randomKey = messageKeys[Math.floor(Math.random() * messageKeys.length)];
      
      // Utiliser la fonction t() avec des paramètres
      const selectedMessage = t(randomKey, {
        name: name,
        interest: interest
      });
      
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
      
      // Utiliser t() pour la notification
      toast({
        title: t('welcomeGenerator'),
        description: t('copySuccess'),
      });
      
      // Reset copy icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy message: ", err);
      toast({
        title: t('welcomeGenerator'),
        description: t('copyError'),
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