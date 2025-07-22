import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";
import { setupSwagger } from "./swagger";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

(async () => {
  // Initialize database connection
  try {
    await storage.connect();
    log('Connected to MongoDB successfully');
    
    // Create admin user if not exists
    const adminEmail = 'admin@cinemabook.vn';
    const existingAdmin = await storage.getUserByEmail(adminEmail);
    
    if (!existingAdmin) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash('password', 10);
      
      await storage.createUser({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        fullName: 'System Administrator',
        phone: '0123456789',
        role: 'admin'
      });
      
      log('Admin user created successfully');
    }
  } catch (error) {
    log('Failed to connect to MongoDB: ' + (error as Error).message);
    process.exit(1);
  }

  const server = await registerRoutes(app);

  // Setup Swagger documentation after routes
  setupSwagger(app);

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
    await setupVite(app);
  } else {
    serveStatic(app);
  }

  // IMPORTANT: this must come last to not interfere with the other routes
  app.get("*", (_req, res) => {
    res.sendFile("index.html", { root: "dist/public" });
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    log(`Server running on http://localhost:${PORT}`);
  });
})();
