require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes/orderRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpecFactory = require("../swagger");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE"],
  }),
);
app.use(express.json());
app.use("/orders", routes);

const swaggerSpec = swaggerSpecFactory();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
