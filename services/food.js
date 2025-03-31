const axios = require('axios');

const isExistingFood = async (foodName) => {
  try {
    // Construimos la URL con el foodName (asegúrate de reemplazar el dominio con el correcto)
    const url = ` http://localhost:5000/api/food/${encodeURIComponent(foodName)}`;
    const response = await axios.get(url);

    // Si la respuesta es 200 y tiene datos, asumimos que el alimento existe
    return response.status === 200 && response.data ? true : false;
  } catch (error) {
    // Si el servidor responde con 404, asumimos que no existe el alimento
    if (error.response && error.response.status === 404) {
      return false;
    }
    console.error("❌ Error al verificar la existencia de la comida:", error);
    throw error;
  }
};

module.exports = { isExistingFood };
