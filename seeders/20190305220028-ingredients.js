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
   return queryInterface.bulkInsert('Ingredients', [{
    name: 'Pepperoni',
    stock_quantity: 100,
    price: 2,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Sausage',
    stock_quantity: 120,
    price: 2,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Chicken',
    stock_quantity: 150,
    price: 2,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Bacon',
    stock_quantity: 50,
    price: 2,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Onion',
    stock_quantity: 100,
    price: 1,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Pepper',
    stock_quantity: 75,
    price: 1,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Mushroom',
    stock_quantity: 50,
    price: 1,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Pineapple',
    stock_quantity: 30,
    price: 1,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Cheese',
    stock_quantity: 300,
    price: 0,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Dough',
    stock_quantity: 500,
    price: 0,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  },
  {
    name: 'Sauce',
    stock_quantity: 1000,
    price: 0,
    created_at: '2019-03-11 00:00:00',
    updated_at: '2019-03-11 00:00:00'
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ingredients', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
