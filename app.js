const express = require("express");
const dotenv = require("dotenv");
const { loadModel } = require("./services/imageService");
const scanRoutes = require("./routes/scanRoutes");
const errorHandler = require("./middlewares/errorHandler");

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para procesar JSON
app.use(express.json());

// Rutas base
app.use("/api", scanRoutes);

// Middleware global de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

// Cargar el modelo IA y arrancar el servidor
loadModel()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al cargar el modelo MobileNet:", error);
  });
