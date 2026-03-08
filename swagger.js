const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

// Factory function to generate spec dynamically
module.exports = () => {
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
    // Use __dirname for reliable path resolution (works on Railway too)
    apis: [path.join(__dirname, "src/routes/*.js")],
  };
  
  return swaggerJsdoc(options);
};