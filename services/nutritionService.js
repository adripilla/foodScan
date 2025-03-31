const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const axios = require("axios");
require("dotenv").config();

const FATSECRET_CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const FATSECRET_CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;

const oauth = OAuth({
  consumer: {
    key: FATSECRET_CLIENT_ID,
    secret: FATSECRET_CLIENT_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

const FATSECRET_BASE_URL = "https://platform.fatsecret.com/rest/server.api";

/**
 * Obtiene detalles completos de un alimento por su ID.
 * @param {string|number} foodId
 * @returns {Promise<object>}
 */
const getFoodDetailsById = async (foodId) => {
  const params = {
    method: "food.get.v4",
    food_id: foodId,
    format: "json",
  };

  const requestData = {
    url: FATSECRET_BASE_URL,
    method: "GET",
    data: params,
  };

  const oauthParams = oauth.authorize(requestData);
  const allParams = { ...params, ...oauthParams };

  try {
    const response = await axios.get(FATSECRET_BASE_URL, { params: allParams });
    return response.data;
  } catch (error) {
    console.error("❌ Error en getFoodDetailsById:", error.response?.data || error.message);
    return { error: "Error fetching food details" };
  }
};

/**
 * Busca información nutricional de un alimento por nombre.
 * @param {string} foodName
 * @returns {Promise<object>}
 */
const getNutritionInfoFatSecret = async (foodName) => {
  if (foodName === "No match found") {
    return { error: "No valid food name provided" };
  }

  const params = {
    method: "foods.search",
    search_expression: foodName,
    format: "json",
  };

  const requestData = {
    url: FATSECRET_BASE_URL,
    method: "GET",
    data: params,
  };

  const oauthParams = oauth.authorize(requestData);
  const allParams = { ...params, ...oauthParams };

  try {
    const searchResponse = await axios.get(FATSECRET_BASE_URL, { params: allParams });

    const foodList = searchResponse?.data?.foods?.food || [];
    const firstFoodId = Array.isArray(foodList) ? foodList[0]?.food_id : foodList?.food_id;

    console.log("foodList", foodList);
    

    if (!firstFoodId) {
      return { error: "No food found for the given name" };
    }

    // Obtener detalles del primer resultado
    return await getFoodDetailsById(firstFoodId);

  } catch (error) {
    console.error("❌ Error en getNutritionInfoFatSecret:", error.response?.data || error.message);
    return { error: "Error fetching nutrition data" };
  }
};

module.exports = {
  getNutritionInfoFatSecret,
};
