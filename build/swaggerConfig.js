"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDefinition = exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
exports.swaggerDefinition = swaggerDefinition;
const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;
