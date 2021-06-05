'use strict';

const db = require('../models');
const { User } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   const users = await User.findAll()
   return queryInterface.bulkInsert('Stories', [
    {content: 'Man cannot discover new oceans unless he has the courage to lose sight of the shore.', image: '1.jpeg',location: "California, USA", category: 'others', userId:users[0].id, createdAt: new Date(), updatedAt : new Date()},
    {content: 'Life is either a daring adventure, or nothing at all', image: '2.jpeg', location: "California, USA", category: 'east', userId:users[1].id, createdAt: new Date(), updatedAt : new Date()},
    {content: 'I am not the same, having seen the moon shine on the other side of the world.', image: '3.jpeg', location: "Tennessee, USA", category: 'others', userId:users[1].id, createdAt: new Date(), updatedAt : new Date()},
    {content: 'Don’t tell me how educated you are, tell me how much you have travelled.', image: '4.jpeg', location: "Tennessee, USA", category: 'east', userId:users[1].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Travel is fatal to prejudice, bigotry, and narrow-mindedness.', image: '1.jpeg', location: "Washington, USA", category: 'west', userId:users[1].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Surely, of all the wonders of the world, the horizon is the greatest.' , image: '5.jpeg',location: "Washington, USA", category: 'west', userId:users[2].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'A good traveler has no fixed plans, and is not intent on arriving.' , image: '6.jpeg',location: "Texas, USA", category: 'west', userId:users[2].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'There are no foreign lands. It is the traveler only who is foreign', image: '7.jpeg', location: "Texas, USA", category: 'north', userId:users[2].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'The world is a book, and those who do not travel read only one page.', image: '7.jpeg', location: "Florida, USA", category: 'north', userId:users[3].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Life is meant for good friends and great adventures', image: '6.jpeg', location: "Florida, USA", category: 'north', userId:users[3].id, createdAt: new Date(), updatedAt : new Date()},
    {content:"I haven't been everywhere, but it's on my list.", image: '5.jpeg', location: "New York, USA", category: 'north', userId:users[4].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Two roads diverged in a wood, and I – I took the one less traveled by.', image: '4.jpeg', location: "New York, USA", category: 'south', userId:users[4].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Once a year, go somewhere you have never been before.' , image: '3.jpeg', location: "London, England", category: 'others', userId:users[5].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'A journey is best measured in friends, rather than miles.', image: '2.jpeg', location: "London, England", category: 'south', userId:users[5].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Wherever you go becomes a part of you somehow.', image: '1.jpeg', location: "Paris, France", category: "middle", userId:users[5].id, createdAt: new Date(), updatedAt : new Date()},
    {content:"Don't listen to what they say. Go see.", image: '7.jpeg', location: "Paris, France", category: "middle", userId:users[6].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Take only memories, leave only footprints.', image: '4.jpeg', location: "Tokyo, Japan", category: 'others', userId:users[7].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Collect Moment, Not Things.', image: '2.jpeg', location: "Tokyo, Japan", category: "middle", userId:users[7].id, createdAt: new Date(), updatedAt : new Date()},
    {content:'Blessed are the curious for they shall have adventures.', image: '1.jpeg', location: "Beijing, China", category: "west", userId:users[7].id, createdAt: new Date(), updatedAt: new Date()},
    {content:'We wander for distraction, but we travel for fulfilment.', image: '3.jpeg', location: "Beijing, China", category: "north", userId:users[8].id, createdAt: new Date(), updatedAt: new Date()},
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Stories', null, {});
  }
};
