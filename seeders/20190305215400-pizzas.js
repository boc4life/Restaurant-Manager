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
   return queryInterface.bulkInsert('Pizzas', [{
    order_id: 1,
    price: 10
  },
  {
    order_id: 1,
    price: 10
  },
  {
    order_id: 2,
    price: 12
  },
  {
    order_id: 2,
    price: 15
  },
  {
    order_id: 2,
    price: 13
  },
  {
    order_id: 3,
    price: 10
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pizzas', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
