'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      // Define aquí las asociaciones, si las hay
    }
  }

  Food.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'foods',       // Nombre exacto de la tabla en la BD
    freezeTableName: true,     // Evita que Sequelize pluralice o modifique el nombre
    timestamps: false          // Ajusta a true si tienes columnas createdAt y updatedAt en la tabla
  });

  return Food;
};
