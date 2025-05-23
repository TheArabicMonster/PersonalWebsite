import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import os from "os";
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  
  // Configuration adaptée selon le système d'exploitation
  const isWindows = os.platform() === "win32";
  
  const serverOptions = isWindows ? 
    { port, host: "localhost" } : 
    { port, host: "0.0.0.0", reusePort: true };
  
  server.listen(serverOptions, () => {
    log(`serving on port ${port} on ${isWindows ? "localhost" : "0.0.0.0"}`);
    
    // Afficher les URLs accessibles pour faciliter le partage
    if (!isWindows) {
      const networkInterfaces = os.networkInterfaces();
      log("\nVotre site est accessible aux URLs suivantes:");
      log(`➜ Local:   http://localhost:${port}`);
      
      // Trouver les adresses IP externes
      Object.keys(networkInterfaces).forEach((interfaceName) => {
        const interfaces = networkInterfaces[interfaceName];
        if (interfaces) {
          interfaces.forEach((iface) => {
            // Filtrer les IPv4 et exclure les interfaces de loopback
            if (iface.family === 'IPv4' && !iface.internal) {
              log(`➜ Réseau: http://${iface.address}:${port}`);
            }
          });
        }
      });
    }
  });
})();
