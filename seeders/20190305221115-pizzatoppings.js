'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('pizzatoppings', [{
    IngredientId: 1,
    PizzaId: 1
  },
  {
    IngredientId: 2,
    PizzaId: 2
  },
  {
    IngredientId: 3,
    PizzaId: 2
  },
  {
    IngredientId: 7,
    PizzaId: 2
  },
  {
    IngredientId: 1,
    PizzaId: 3
  },
  {
    IngredientId: 8,
    PizzaId: 3
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pizzatoppings', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
