require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/orderRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpecFactory = require("../swagger");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/orders", routes);

// Generate Swagger spec dynamically after env loads
console.log("[App] process.env.BASE_URL:", process.env.BASE_URL);
console.log("[App] process.env.PORT:", process.env.PORT);

let swaggerSpec;
try {
  swaggerSpec = swaggerSpecFactory();
  console.log("[App] Swagger spec generated successfully");
} catch (error) {
  console.error("[App] Error generating Swagger spec:", error.message);
  swaggerSpec = {}; // fallback empty spec
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
  console.log("[App] App started, Swagger UI available at /api-docs");
});