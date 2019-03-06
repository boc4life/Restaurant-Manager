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
   return queryInterface.bulkInsert('Orders', [{
    type: "Delivery",
    user_id: 1,
    discount: 0,
    subtotal: 20.00,
    tax: 1.20,
    tip: 4.00,
    total_due: 25.20,
    payment_type: "cash"
  },
  {
    type: "Pickup",
    user_id: 2,
    discount: 0,
    subtotal: 40.00,
    tax: 2.40,
    tip: 0.00,
    total_due: 43.40,
    payment_type: "credit"
  },
  {
    type: "In-Store",
    user_id: 3,
    discount: 0,
    subtotal: 10.00,
    tax: 0.60,
    tip: 1.00,
    total_due: 11.60,
    payment_type: "cash"
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
