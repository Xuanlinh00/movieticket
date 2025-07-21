import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Movie Ticket Booking API',
      version: '1.0.0',
      description: 'API documentation for Movie Ticket Booking System',
      contact: {
        name: 'API Support',
        email: 'support@cinemabook.vn',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
      {
        url: 'http://localhost',
        description: 'Production server (via Nginx)',
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
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'john_doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            fullName: { type: 'string', example: 'John Doe' },
            phone: { type: 'string', example: '0123456789' },
            role: { type: 'string', enum: ['user', 'admin', 'staff'], example: 'user' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Movie: {
          type: 'object',
          properties: {
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
          },
        },
        Cinema: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Beta Cinema' },
            address: { type: 'string', example: 'Tầng 3, TTTM Vincom' },
            phone: { type: 'string', example: '0123456789' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
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
  apis: ['./server/routes.ts', './server/swagger-docs.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Movie Ticket Booking API Docs',
  }));

  // JSON endpoint
  app.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}

export { specs };
