'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Answers', null, {});

    await queryInterface.bulkInsert('Questions', [{
      id: 1,
      text: 'When was Bikini Kill first active?',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/BikiniKBrixt110619-5_%2848986263782%29.jpg/600px-BikiniKBrixt110619-5_%2848986263782%29.jpg',
      topic: ['Music'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      text: 'What is the capital of Kazakhstan?',
      imageUrl: 'https://en.wikipedia.org/wiki/File:Flag_of_Kazakhstan.svg',
      topic: ['Geography'],
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    return await queryInterface.bulkInsert('Answers', [
      {
        id: 1, text: '1990', valid: true, questionId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 2, text: '1995', valid: false, questionId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 3, text: '2000', valid: false, questionId: 1, createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: 4, text: '1987', valid: false, questionId: 1, createdAt: new Date(), updatedAt: new Date()
      }
    ], {});

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
