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
const swaggerSpec = swaggerSpecFactory();
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
console.log("✓ Swagger spec generated");
console.log("  BASE_URL:", BASE_URL);
console.log("  Found routes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});