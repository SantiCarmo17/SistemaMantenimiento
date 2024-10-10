import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentación',
        version: '1.0.0',
        description: 'Documentación Swagger',
    },
    servers: [
        {
            url: 'sistemamantenimiento-production.up.railway.app',
            description: 'Servidor de Producción',
        },
    ],
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            BearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerDefinition };
