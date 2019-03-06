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
    price: 2
  },
  {
    name: 'Sausage',
    stock_quantity: 120,
    price: 2
  },
  {
    name: 'Chicken',
    stock_quantity: 150,
    price: 2
  },
  {
    name: 'Bacon',
    stock_quantity: 50,
    price: 2
  },
  {
    name: 'Onion',
    stock_quantity: 100,
    price: 1
  },
  {
    name: 'Pepper',
    stock_quantity: 75,
    price: 1
  },
  {
    name: 'Mushroom',
    stock_quantity: 50,
    price: 1
  },
  {
    name: 'Pineapple',
    stock_quantity: 30,
    price: 1
  },
  {
    name: 'Cheese',
    stock_quantity: 300,
    price: 0
  },
  {
    name: 'Dough',
    stock_quantity: 500,
    price: 0
  },
  {
    name: 'Sauce',
    stock_quantity: 1000,
    price: 0
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
