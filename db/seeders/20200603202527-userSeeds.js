'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {username: 'troybarnes', firstName: 'Troy', lastName: 'Barnes', email: 'troybarnes@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'jeffwinger', firstName: 'Jeff', lastName:' Winger', email: 'jeffwinger@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'annieedison', firstName: 'Annie', lastName: 'Edison', email: 'annieedison@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'brittaperry', firstName: 'Britta', lastName: 'Perry', email: 'brittaperry@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'abednadir', firstName: 'Abed', lastName: 'Nadir', email: 'abednadir@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'shirleybennett', firstName: 'Shirley', lastName: 'Bennett', email: 'shirleybennett@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'piercehawthorne', firstName: 'Pierce', lastName: 'Hawthorne', email: 'piercehawthorne@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'craigpelton', firstName: 'Craig', lastName: 'Pelton', email: 'craigpelton@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
      {username: 'benchang', firstName: 'Ben', lastName: 'Chang', email: 'benchang@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()}]
      , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
