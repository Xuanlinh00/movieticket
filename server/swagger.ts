import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NaCinema API Documentation',
      version: '1.0.0',
      description: 'API documentation for NaCinema - Movie Ticket Booking System',
      contact: {
        name: 'NaCinema Support',
        email: 'support@nacinema.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.nacinema.com',
        description: 'Production server',
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
          },
        },
        Movie: {
          type: 'object',
          properties: {
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
          },
        },
        Cinema: {
          type: 'object',
          properties: {
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
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
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
  apis: [
    './server/routes.ts',
    './server/swagger-docs.ts',
  ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  // Swagger UI setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'NaCinema API Documentation',
  }));

  // JSON endpoint for API specification
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}

export { specs };
