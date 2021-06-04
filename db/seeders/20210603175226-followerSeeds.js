'use strict';

const db = require('../models');
const { User } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll()

    return queryInterface.bulkInsert('Followers', [
      { userId: users[0].id, followerId: users[1].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[0].id, followerId: users[2].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[2].id, followerId: users[1].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[2].id, followerId: users[0].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[1].id, followerId: users[0].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[1].id, followerId: users[2].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[3].id, followerId: users[4].id, createdAt: new Date(), updatedAt: new Date() },
      { userId: users[4].id, followerId: users[3].id, createdAt: new Date(), updatedAt: new Date() }
    ], {})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Followers', null, {});
  }
};
