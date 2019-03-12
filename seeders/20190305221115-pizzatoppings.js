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
    ingredient_id: 1,
    pizza_id: 3,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    ingredient_id: 2,
    pizza_id: 4,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    ingredient_id: 3,
    pizza_id: 4,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    ingredient_id: 7,
    pizza_id: 4,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    ingredient_id: 1,
    pizza_id: 5,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    ingredient_id: 8,
    pizza_id: 5,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'

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
