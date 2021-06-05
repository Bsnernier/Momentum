'use strict';

const db = require('../models');
const { User, Story } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      const users = await User.findAll()
      const stories = await Story.findAll()
   return queryInterface.bulkInsert('Comments', [
  {content: "I am not the same, having seen the moon shine on the other side of the world.", userId: users[0].id, storyId: stories[0].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Travel far enough, you meet yourself." ,  userId: users[0].id, storyId: stories[1].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Be fearless in the pursuit of what sets your soul on fire." ,userId: users[0].id, storyId: stories[4].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Never let your memories be greater than your dreams." , userId: users[0].id, storyId: stories[8].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "I travel not to cross countries off a list, but to ignite passionate affairs with destinations." ,  userId: users[0].id, storyId: stories[11].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "To travel is to live." , userId: users[0].id, storyId: stories[13].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Happiness is letting go of what you think your life is supposed to look like and celebrate it for everything that it is." ,userId: users[0].id, storyId: stories[16].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Not all girls are made of sugar and spice and everything nice. Some girls are made of adventure, fine beer, brains, and no fear." , userId: users[0].id, storyId: stories[17].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "And I think to myself, what a wonderful world." , userId: users[0].id, storyId: stories[18].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Quit your job, buy a ticket, get a tan, fall in love, never return." , userId: users[0].id, storyId: stories[19].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "I always wonder why birds choose to stay in the same place when they can fly anywhere on earth, so I ask myself the same question." , userId: users[1].id, storyId: stories[0].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "This wasn’t a strange place; it was a new one." ,  userId: users[1].id, storyId: stories[1].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Perhaps travel cannot prevent bigotry, but by demonstrating that all peoples cry, laugh, eat, worry, and die, it can introduce the idea that if we try and understand each other, we may even become friends." , userId: users[1].id, storyId: stories[4].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "A ship in a harbor is safe, but it is not what ships are built for." ,userId: users[1].id, storyId: stories[7].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "And then there is the most dangerous risk of all — the risk of spending your life not doing what you want on the bet you can buy yourself the freedom to do it later.", userId: users[1].id, storyId: stories[9].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "We wander for distraction, but we travel for fulfillment." ,userId: users[1].id, storyId: stories[10].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Oh, darling, let’s be adventurers." , userId: users[1].id, storyId: stories[11].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Of all the books in the world, the best stories are found between the pages of a passport." , userId: users[1].id, storyId: stories[13].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Don’t call it a dream…call it a plan." ,userId: users[1].id, storyId: stories[17].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "To awaken alone in a strange town is one of the pleasantest sensations in the world." , userId: users[1].id, storyId: stories[18].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Good company in a journey makes the way seem shorter." , userId: users[2].id, storyId: stories[7].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes." , userId: users[2].id, storyId: stories[9].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "I have found out that there ain’t no surer way to find out whether you like people or hate them than to travel with them." , userId: users[2].id, storyId: stories[12].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Traveling tends to magnify all human emotions." , userId: users[2].id, storyId: stories[13].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Wherever you are, whatever you do, be in love." , userId: users[2].id, storyId: stories[18].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Don’t count the days. Make the days count." , userId: users[2].id, storyId: stories[19].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Our happiest moments as tourists always seem to come when we stumble upon one thing while in pursuit of something else." , userId: users[3].id, storyId: stories[0].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "The world is changed by your example, not by your opinion." , userId: users[3].id, storyId: stories[3].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "We travel for romance, we travel for architecture, and we travel to be lost." ,userId: users[3].id, storyId: stories[7].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Veni, Vini, Amavi. We came, we saw, we loved.", userId: users[3].id, storyId: stories[8].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Catch the trade winds in your sails. Explore. Dream. Discover.", userId: users[4].id, storyId: stories[1].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "A camera teaches you how to see without a camera.", userId: users[4].id, storyId: stories[2].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "It feels good to be lost in the right direction.", userId: users[4].id, storyId: stories[7].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "I love the feeling of being anonymous in a city I’ve never been before.", userId: users[4].id, storyId: stories[8].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "People don’t take trips, trips take people.", userId: users[4].id, storyId: stories[9].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Stuff your eyes with wonder, live as if you’d drop dead in ten seconds. See the world. It’s more fantastic than any dream made or paid for in factories.", userId: users[4].id, storyId: stories[12].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Travel isn’t always pretty. It isn’t always comfortable. Sometimes it hurts, it even breaks your heart. But that’s okay.",  userId: users[4].id, storyId: stories[16].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "There’s no way I was born to just pay bills and die.", userId: users[4].id, storyId: stories[19].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Don’t tell me how educated you are, tell me how much you have traveled." , userId: users[5].id, storyId: stories[2].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "Life is a journey. Make the best of it.", userId: users[5].id, storyId: stories[5].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "The pleasure we derive from journeys is perhaps dependent more on the mindset with which we travel than on the destination we travel to." , userId: users[5].id, storyId: stories[6].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "You can’t buy happiness, but you can buy a plane ticket and that’s kind of the same thing.", userId: users[5].id, storyId: stories[9].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Adventure may hurt you but monotony will kill you." , userId: users[5].id, storyId: stories[12].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "Every dreamer knows that it is entirely possible to be homesick for a place you’ve never been to, perhaps more homesick than for familiar ground.", userId: users[5].id, storyId: stories[13].id, createdAt: new Date(), updatedAt: new Date() },
     {content: "Take only memories, leave only footprints." , userId: users[5].id, storyId: stories[14].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Wherever you go becomes a part of you somehow.", userId: users[5].id, storyId: stories[15].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "I need a six month vacation. Twice a year." , userId: users[6].id, storyId: stories[1].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Jobs fill your pocket, but adventures fill your soul." , userId: users[6].id, storyId: stories[2].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "I never travel without my diary. One should always have something sensational to read on the train.", userId: users[6].id, storyId: stories[3].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "The world is a book, and those who do not travel read only one page.", userId: users[6].id, storyId: stories[6].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "We travel, some of us forever, to seek other places, other lives, other souls." , userId: users[6].id, storyId: stories[7].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Life is meant for good friends and great adventures." , userId: users[6].id, storyId: stories[10].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Our battered suitcases were piled on the sidewalk again; we had longer ways to go. But no matter, the road is life." , userId: users[6].id, storyId: stories[12].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Travel is only glamorous in retrospect." , userId: users[6].id, storyId: stories[14].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "Remember that happiness is a way of travel – not a destination.",userId: users[6].id, storyId: stories[15].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "A journey is best measured in friends, rather than miles." , userId: users[7].id, storyId: stories[1].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Wanderlust: a strong desire to wander and explore the world.", userId: users[7].id, storyId: stories[2].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "I travel because it makes me realize how much I haven’t seen, how much I’m not going to see, and how much I still need to see." , userId: users[7].id, storyId: stories[3].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "A mind that is stretched by a new experience can never go back to its old dimensions." , userId: users[7].id, storyId: stories[11].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "I haven’t been everywhere, but it’s on my list." , userId: users[7].id, storyId: stories[14].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Two roads diverged in a wood and I – I took the one less traveled by." , userId: users[7].id, storyId: stories[16].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "I travel a lot; I hate having my life disrupted by routine." , userId: users[7].id, storyId: stories[17].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "If we were meant to stay in one place, we’d have roots instead of feet." , userId: users[7].id, storyId: stories[18].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "If it scares you, it might be a good thing to try." , userId: users[7].id, storyId: stories[19].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "To travel is to discover that everyone is wrong about other countries." , userId: users[8].id, storyId: stories[0].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "The world is big, and I want to have a good look at it before it gets dark." , userId: users[8].id, storyId: stories[2].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "Travel is not a reward for working, it’s education for living." , userId: users[8].id, storyId: stories[5].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Little by little, one travels far." , userId: users[8].id, storyId: stories[6].id, createdAt: new Date(), updatedAt: new Date() },
   {content: "When overseas you learn more about your own country than you do the place you’re visiting." , userId: users[8].id, storyId: stories[7].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Travel makes one modest, you see what a tiny place you occupy in the world." , userId: users[8].id, storyId: stories[8].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "I travel not to go anywhere but to go. I travel for travel’s sake.", userId: users[8].id, storyId: stories[16].id, createdAt: new Date(), updatedAt: new Date() },
  {content: "Live with no excuses and travel with no regrets." , userId: users[8].id, storyId: stories[17].id, createdAt: new Date(), updatedAt: new Date() },
    {content: "It is better to see something once than to hear about it a thousand times." ,  userId: users[8].id, storyId: stories[19].id, createdAt: new Date(), updatedAt: new Date() }]
  , {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Comments', null, {});
  }
};
