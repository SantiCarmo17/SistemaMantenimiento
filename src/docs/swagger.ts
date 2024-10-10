import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
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

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["../routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);