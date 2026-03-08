const express = require("express");
const cors = require("cors");
const routes = require("./routes/orderRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
console.log("BASE_URL:", process.env.BASE_URL);

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});