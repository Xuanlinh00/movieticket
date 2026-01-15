import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes/index";
import { storage } from "./storage";
import { setupSwagger } from "./swagger";
import { setupVite } from "./vite";
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

function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

(async () => {
  // Initialize database connection
  try {
    await storage.connect();
    log('Connected to MongoDB successfully');
    
    // Create admin user if not exists
    const adminEmail = 'admin@cinemabook.vn';
    const existingAdmin = await storage.getUserByEmail(adminEmail);
    
    if (!existingAdmin) {
      const bcrypt = await import('bcrypt');
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

  const server = registerRoutes(app);

  // Setup Swagger documentation after routes
  setupSwagger(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup vite for development
  await setupVite(app, server);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    log(`Server running on http://localhost:${PORT}`);
  });
})();
