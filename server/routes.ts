import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid request", 
          errors: result.error.format(),
          emailStatus: "not_attempted"
        });
      }
      
      let contactMessage;

      // 1. Store the contact message
      try {
        contactMessage = await storage.createContactMessage(result.data);
      } catch (storageError) {
        console.error("Erreur lors de l'enregistrement du message:", storageError);
        return res.status(500).json({ 
          message: "Échec de l'enregistrement du message", 
          emailStatus: "not_attempted"
        });
      }
      
      // 2. Attempt to send email
      try {
        await sendContactEmail({
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject || "Contact via le site web",
          message: result.data.message,
        });
        
        // If email sending is successful
        return res.status(201).json({ 
          message: "Message enregistré et email envoyé avec succès", 
          id: contactMessage.id,
          emailStatus: "sent"
        });
      } catch (error) {
        const emailError = error as { code?: string; message?: string; response?: unknown };
        console.error("Erreur lors de l'envoi de l'email:", emailError);
        
        // If email sending fails, but message was stored
        return res.status(207).json({ 
          message: "Message enregistré mais échec d'envoi de l'email",
          id: contactMessage.id, // Message ID is available as it was stored
          emailStatus: "failed",
          emailError: {
            code: emailError.code,
            message: emailError.message,
            response: emailError.response // Include the actual SMTP response
          }
        });
      }
    } catch (error) {
      // Catch-all for other unexpected errors during the process
      console.error("Erreur inattendue lors de la soumission du formulaire de contact:", error);
      return res.status(500).json({ 
        message: "Échec de soumission du formulaire de contact en raison d'une erreur inattendue",
        emailStatus: "unknown"
      });
    }
  });

  // For testing/admin purposes
  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
