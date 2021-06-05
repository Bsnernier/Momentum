'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {username:  'mattmelendez', firstName: 'matt', lastName:' melendez', email:' mattmelendez@gmail.com' , password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()  } ,
    {username: 'natebernier', firstName: 'nate', lastName: 'bernier' , email: 'natebernier@gmail.com' , password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()} ,
    {username: 'jiacui', firstName: 'jia', lastName: 'cui' , email: 'jiacui@gmail.com' , password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()} ,
    {username: 'edherman', firstName: 'ed', lastName: 'herman' , email: 'edherman@gmail.com' ,  password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()},
    {username: 'rihanamartinson', firstName: 'rihana', lastName: 'martinson' , email: 'rihanamartinson@gmail.com', password: bcrypt.hashSync('Ab1!'), createdAt: new Date(), updatedAt: new Date()}
    ], {});
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
