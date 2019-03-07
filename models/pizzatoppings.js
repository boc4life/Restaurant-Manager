'use strict';
module.exports = (sequelize, DataTypes) => {
  const PizzaToppings = sequelize.define('PizzaToppings', {}, {underscored: true});
return PizzaToppings;
};