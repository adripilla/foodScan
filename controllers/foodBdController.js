'use strict';
const { Food } = require('../models'); // Ajusta la ruta según la estructura de tu proyecto
const { Op } = require('sequelize');


exports.getFood = async (req, res) => {
    try {
      const { food_name } = req.params;
      
      if (!food_name) {
        return res.status(400).json({ error: 'El parámetro food_name es requerido' });
      }
      console.log("food_name", food_name);
      
      const food = await Food.findOne({
        where: {
          name: { [Op.like]: `%${food_name}%` }
        }
      });
      console.log("food", food);
      res.json(food);
    } catch (error) {
      console.error("Error al obtener alimento:", error);
      res.status(500).json({ error: 'Error al obtener alimento' });
    }
  };
  


exports.getFoods = async (req, res) => {
    try {
      const foods = await Food.findAll();
      res.json(foods);
    } catch (error) {
      console.error("Error al obtener alimentos:", error);
      res.status(500).json({ error: 'Error al obtener alimentos' });
    }
  };

// Aquí podrías agregar más funciones para otros endpoints, por ejemplo:
// exports.createFood = async (req, res) => { ... }
// exports.updateFood = async (req, res) => { ... }
