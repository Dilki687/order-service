const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order Service API",
      version: "1.0.0",
      description: "Order Microservice API",
    },
    servers: [
      {
        url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  // Use relative path from current working directory, not __dirname
  apis: [path.join(process.cwd(), "src/routes/*.js")],
};

module.exports = swaggerJsdoc(options);