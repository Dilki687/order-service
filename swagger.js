const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const fs = require("fs");

// Factory function to generate spec dynamically
module.exports = () => {
  const apisPath = path.join(process.cwd(), "src/routes/*.js");
  const routesDir = path.join(process.cwd(), "src/routes");
  
  // Debug logging
  console.log("[Swagger] process.cwd():", process.cwd());
  console.log("[Swagger] __dirname:", __dirname);
  console.log("[Swagger] Scanning for routes in:", routesDir);
  console.log("[Swagger] apis path:", apisPath);
  
  if (fs.existsSync(routesDir)) {
    const files = fs.readdirSync(routesDir);
    console.log("[Swagger] Files found in routes dir:", files);
  } else {
    console.log("[Swagger] ⚠️ Routes directory does NOT exist!");
  }
  
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
    // Use specific file path instead of glob
    apis: [path.join(process.cwd(), "src/routes/orderRoutes.js")],
  };
  
  console.log("[Swagger] Options apis:", options.apis);
  
  // Check if file exists
  const filePath = path.join(process.cwd(), "src/routes/orderRoutes.js");
  if (fs.existsSync(filePath)) {
    console.log("[Swagger] orderRoutes.js exists at:", filePath);
    // Read first 200 chars to verify content
    const content = fs.readFileSync(filePath, 'utf8').substring(0, 200);
    console.log("[Swagger] File starts with:", content.replace(/\n/g, '\\n'));
  } else {
    console.log("[Swagger] ⚠️ orderRoutes.js does NOT exist at:", filePath);
  }
  
  const spec = swaggerJsdoc(options);
  console.log("[Swagger] Spec paths generated:", Object.keys(spec.paths || {}).length, "endpoints");
  if (spec.paths) {
    console.log("[Swagger] Paths:", Object.keys(spec.paths));
  }
  
  return spec;
};