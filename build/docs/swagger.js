"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de mi API",
        version: "1.0.0",
    },
    servers: [
        {
            url: "sistemamantenimiento-production.up.railway.app",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            user: {
                type: "object",
                required: ["correo", "contrasenia"],
                properties: {
                    correo: {
                        type: "string",
                    },
                    contrasenia: {
                        type: "string",
                    },
                },
            },
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["../routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
