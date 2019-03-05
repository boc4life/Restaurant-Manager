'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    stock_quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Pizza, {through: "PizzaToppings"})
  };
  return Ingredient;
};