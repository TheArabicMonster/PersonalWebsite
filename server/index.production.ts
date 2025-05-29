import express, { type Request, Response } from "express";
import { registerRoutes } from "./routes";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir les fichiers statiques en production
app.use(express.static("public"));

// SPA fallback - servir index.html pour toutes les routes non-API
app.get("*", (req: Request, res: Response) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.resolve("public/index.html"));
});

const server = await registerRoutes(app);

const PORT = Number(process.env.PORT) || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Site accessible sur: http://localhost:${PORT}`);
});