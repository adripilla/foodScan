'use strict';
const express = require('express');
const router = express.Router();
const foodBdController = require('../controllers/foodBdController'); // Ajusta la ruta si es necesario

// Endpoint para obtener todos los alimentos
router.get('/food', foodBdController.getFoods);
router.get('/food/:food_name', foodBdController.getFood);


module.exports = router;
