const express = require("express");
const dotenv = require("dotenv");
const scanRoutes = require("./routes/scanRoutes");
const foodRoutes = require("./routes/foodRouter");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

// Rutas
app.use("/api", scanRoutes);
app.use("/api", foodRoutes);

// Middleware global de errores
app.use(errorHandler);

module.exports = app;
