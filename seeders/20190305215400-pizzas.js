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
    price: 10,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    order_id: 1,
    price: 10,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    order_id: 2,
    price: 12,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    order_id: 2,
    price: 15,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    order_id: 2,
    price: 13,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    order_id: 3,
    price: 10,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
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
