const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const fs = require("fs");

// Factory function to generate spec dynamically
module.exports = () => {
  const apisPath = path.join(__dirname, "src/routes/*.js");
  const routesDir = path.join(__dirname, "src/routes");

  // Debug logging
  console.log("[Swagger] __dirname:", __dirname);
  console.log("[Swagger] Scanning for routes in:", routesDir);

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
        description:
          "Order Microservice API for the Food Ordering System. Handles order creation and integrates with external microservices:\n\n" +
          "• User Identity Service → validates customer accounts\n\n" +
          "• Menu Service → validates menu items and pricing\n\n" +
          "• Payment Service → automatically creates a Stripe payment after order creation\n\n" +
          "This service demonstrates distributed microservice communication.",
      },
      servers: [
        {
          url:
            process.env.BASE_URL ||
            `http://localhost:${process.env.PORT || 5000}`,
        },
      ],
    },
    // Use __dirname for reliable path resolution (works on Railway too)
    apis: [apisPath],
  };

  const spec = swaggerJsdoc(options);
  console.log(
    "[Swagger] Spec paths generated:",
    Object.keys(spec.paths || {}).length,
    "endpoints",
  );

  return spec;
};
