const express = require("express");
const dotenv = require("dotenv");
const scanRoutes = require("./routes/scanRoutes");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());

// Rutas
app.use("/api", scanRoutes);

// Middleware global de errores
app.use(errorHandler);

module.exports = app;
