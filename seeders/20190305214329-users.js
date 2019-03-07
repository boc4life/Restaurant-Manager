
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
   return queryInterface.bulkInsert('Users', [{
    phone_number: 5709725111,
    first_name: 'Andrew',
    last_name: 'Finkernagel',
    address: "1007 Bradley Court",
    city: "Mount Laurel",
    state: "NJ",
    zip: "08054",
    premium: false
  },
  {
    phone_number: 1234567890,
    first_name: 'John',
    last_name: 'Doe',
    address: "1313 Mockingbird Lane",
    city: "Somerset",
    state: "NJ",
    zip: "08542",
    premium: false
  },
  {
    phone_number: 1987654321,
    first_name: 'Jane',
    last_name: 'Doe',
    address: "2121 Middle of Nowhere",
    city: "Philadelphia",
    state: "PA",
    zip: "19831",
    premium: false
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
