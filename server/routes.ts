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
          errors: result.error.format() 
        });
      }
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(result.data);
      
      // Envoyer un email avec les données du formulaire
      try {
        await sendContactEmail({
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject || "Contact via le site web",
          message: result.data.message,
        });
        console.log("Email envoyé avec succès");
      } catch (emailError) {
        console.error("Erreur lors de l'envoi de l'email:", emailError);
        // On continue même si l'envoi d'email échoue
      }
      
      return res.status(201).json({ 
        message: "Message sent successfully", 
        id: contactMessage.id 
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ message: "Failed to submit contact form" });
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
