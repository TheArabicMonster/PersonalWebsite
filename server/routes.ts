import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { sendContactEmail, type ContactFormData } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route pour le formulaire de contact (envoi direct par email)
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData: ContactFormData = req.body;
      
      // Validation basique
      if (!contactData.name || !contactData.email || !contactData.message) {
        return res.status(400).json({ 
          message: "Tous les champs sont requis",
          emailStatus: "validation_error"
        });
      }

      // Envoyer l'email directement
      await sendContactEmail(contactData);
      
      return res.status(200).json({ 
        message: "Message envoyé avec succès!",
        emailStatus: "sent"
      });
      
    } catch (error: any) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      
      if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
        return res.status(500).json({ 
          message: "Erreur de configuration email",
          emailStatus: "config_error"
        });
      }
      
      return res.status(500).json({ 
        message: "Échec de l'envoi du message",
        emailStatus: "send_error"
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
