import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
<<<<<<< HEAD
import { Express } from 'express';
=======
import type { Express } from 'express';
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
<<<<<<< HEAD
      title: 'Movie Ticket Booking API',
      version: '1.0.0',
      description: 'API documentation for Movie Ticket Booking System',
      contact: {
        name: 'API Support',
=======
      title: 'NaCinema API Documentation',
      version: '1.0.0',
      description: 'API documentation for NaCinema - Movie Ticket Booking System',
      contact: {
        name: 'NaCinema Support',
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
        email: 'support@nacinema.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
<<<<<<< HEAD
        url: 'http://localhost',
        description: 'Production server (via Nginx)',
=======
        url: 'https://api.nacinema.com',
        description: 'Production server',
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
<<<<<<< HEAD
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'john_doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            fullName: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '0123456789' },
            role: { type: 'string', enum: ['user', 'admin', 'staff'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
=======
            id: {
              type: 'integer',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            fullName: {
              type: 'string',
              description: 'Full name',
            },
            role: {
              type: 'string',
              enum: ['user', 'staff', 'admin'],
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
          },
        },
        Movie: {
          type: 'object',
          properties: {
<<<<<<< HEAD
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Fast & Furious X' },
            description: { type: 'string', example: 'Action movie description' },
            genre: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['Hành động', 'Phiêu lưu']
            },
            duration: { type: 'integer', example: 142 },
            ageRating: { type: 'string', example: '16+' },
            posterUrl: { type: 'string', format: 'uri', example: 'https://example.com/poster.jpg' },
            trailerUrl: { type: 'string', format: 'uri', example: 'https://youtube.com/watch?v=example' },
            actors: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['Vin Diesel', 'Michelle Rodriguez']
            },
            director: { type: 'string', example: 'Louis Leterrier' },
            releaseDate: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['active', 'inactive'], example: 'active' },
            createdAt: { type: 'string', format: 'date-time' },
=======
            id: {
              type: 'integer',
              description: 'Movie ID',
            },
            title: {
              type: 'string',
              description: 'Movie title',
            },
            description: {
              type: 'string',
              description: 'Movie description',
            },
            genre: {
              type: 'string',
              description: 'Movie genre',
            },
            duration: {
              type: 'integer',
              description: 'Duration in minutes',
            },
            ageRating: {
              type: 'string',
              description: 'Age rating (e.g., PG, PG-13, R)',
            },
            posterUrl: {
              type: 'string',
              format: 'uri',
              description: 'Poster image URL',
            },
            trailerUrl: {
              type: 'string',
              format: 'uri',
              description: 'Trailer video URL',
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'coming-soon'],
              description: 'Movie status',
            },
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
          },
        },
        Cinema: {
          type: 'object',
          properties: {
<<<<<<< HEAD
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Beta Cinema' },
            address: { type: 'string', example: 'Tầng 3, TTTM Vincom' },
            phone: { type: 'string', example: '0123456789' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Showtime: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            movieId: { type: 'integer', example: 1 },
            roomId: { type: 'integer', example: 1 },
            startTime: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
            price: { type: 'string', example: '150000' },
            availableSeats: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['A1', 'A2', 'B1', 'B2']
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            showtimeId: { type: 'integer', example: 1 },
            seats: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['A1', 'A2']
            },
            totalPrice: { type: 'string', example: '300000' },
            paymentMethod: { 
              type: 'string', 
              enum: ['cash', 'card', 'momo', 'banking'],
              example: 'card'
            },
            status: { 
              type: 'string', 
              enum: ['pending', 'confirmed', 'cancelled'],
              example: 'confirmed'
            },
            bookingCode: { type: 'string', example: 'BK123456' },
            customerInfo: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'John Doe' },
                phone: { type: 'string', example: '0123456789' },
                email: { type: 'string', example: 'john@example.com' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
=======
            id: {
              type: 'integer',
              description: 'Cinema ID',
            },
            name: {
              type: 'string',
              description: 'Cinema name',
            },
            address: {
              type: 'string',
              description: 'Cinema address',
            },
            phone: {
              type: 'string',
              description: 'Cinema phone number',
            },
          },
        },
        Ticket: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Ticket ID',
            },
            userId: {
              type: 'integer',
              description: 'User ID',
            },
            showtimeId: {
              type: 'integer',
              description: 'Showtime ID',
            },
            seats: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Selected seats',
            },
            totalPrice: {
              type: 'string',
              description: 'Total price',
            },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'cancelled'],
              description: 'Ticket status',
            },
            bookingCode: {
              type: 'string',
              description: 'Unique booking code',
            },
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
          },
        },
        Error: {
          type: 'object',
          properties: {
<<<<<<< HEAD
            message: { type: 'string', example: 'Error message' },
            error: { type: 'string', example: 'Detailed error information' },
          },
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'healthy' },
            timestamp: { type: 'string', format: 'date-time' },
            service: { type: 'string', example: 'NaCinema API' },
            version: { type: 'string', example: '1.0.0' },
=======
            message: {
              type: 'string',
              description: 'Error message',
            },
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
<<<<<<< HEAD
  apis: ['./server/routes.ts', './server/index.ts'], // Đường dẫn đến files chứa JSDoc comments
=======
  apis: [
    './server/routes.ts',
    './server/swagger-docs.ts',
  ],
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
<<<<<<< HEAD
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Movie Ticket Booking API Docs',
  }));

  // JSON endpoint
  app.get('/api/swagger.json', (req, res) => {
=======
  // Swagger UI setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'NaCinema API Documentation',
  }));

  // JSON endpoint for API specification
  app.get('/api-docs.json', (req, res) => {
>>>>>>> bd97d2dcd87743cb25cac9522dd215e630b37313
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}

export { specs };
