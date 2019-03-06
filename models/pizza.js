'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define('Pizza', {
    order_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
    }, {underscored: true});
  Pizza.associate = function(models) {
    Pizza.belongsToMany(models.Ingredient, {through: "PizzaToppings"});
    Pizza.belongsTo(models.Order)
  };
  return Pizza;
};