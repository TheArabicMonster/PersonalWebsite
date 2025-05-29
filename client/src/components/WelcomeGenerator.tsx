import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
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

  // Messages prédéfinis en français
  const predefinedMessages = [
    "Bienvenue, [name] ! Je vois que vous êtes intéressé(e) par [interest]. Explorons comment mes projets et compétences correspondent à vos intérêts.",
    "Bonjour [name] ! Merci de visiter mon portfolio. Je remarque que vous êtes passionné(e) par [interest]. J'ai quelques projets connexes qui pourraient vous plaire.",
    "Ravi de vous rencontrer, [name] ! Votre intérêt pour [interest] montre votre bon goût. N'hésitez pas à consulter mon travail dans ce domaine.",
    "Bienvenue à bord, [name] ! En tant que passionné(e) de [interest], je pense que vous trouverez que mon portfolio met en valeur des compétences et des projets pertinents."
  ];

  const generateWelcomeMessage = async () => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get random predefined message
      const randomMessage = predefinedMessages[Math.floor(Math.random() * predefinedMessages.length)];
      
      // Replace placeholders with actual values
      const personalizedMessage = randomMessage
        .replace(/\[name\]/g, name)
        .replace(/\[interest\]/g, interest);
      
      setMessage(personalizedMessage);
      setShowMessage(true);
      
      toast({
        title: "Message généré avec succès !",
        description: "Votre message de bienvenue personnalisé est prêt.",
      });
      
    } catch (error) {
      toast({
        title: "Erreur de génération",
        description: "Une erreur s'est produite lors de la génération du message.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setInterest("");
    setMessage("");
    setShowMessage(false);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      
      toast({
        title: "Message copié !",
        description: "Le message a été copié dans le presse-papiers.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erreur de copie",
        description: "Impossible de copier le message dans le presse-papiers.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/60 dark:bg-background/40 backdrop-blur-md border border-white/30 dark:border-gray-800/50">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Générateur de Message de Bienvenue
        </CardTitle>
        <CardDescription className="text-center">
          Obtenez un message de bienvenue personnalisé basé sur votre nom et vos intérêts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showMessage ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Votre Nom</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez votre nom"
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Votre Centre d'Intérêt</label>
              <Input
                type="text"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="Ex: Développement Web, IA, Design..."
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
            Générer le Message
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={resetForm} className="flex-1">
              Réessayer
            </Button>
            <Button 
              onClick={copyToClipboard}
              className="flex-1"
              disabled={copied}
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copié !" : "Copier le Message"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}