'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questions', [{
        topic: ['Music'],
        text: 'When was Bikini Kill first active?',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/BikiniKBrixt110619-5_%2848986263782%29.jpg/600px-BikiniKBrixt110619-5_%2848986263782%29.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        topic: ['Geography'],
        text: 'What is the capital of Kazakhstan?',
        imageUrl: 'https://en.wikipedia.org/wiki/File:Flag_of_Kazakhstan.svg',
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
