'use strict';

const { questions, answers } = require('APP/utils/questionWriter')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Answers', null, {});
    // console.log(`Adding ${questions.length} questions to the DB`);
    // console.log(`Adding ${answers.length} answers to the DB`);
    await queryInterface.bulkInsert('Questions', questions)
    return await queryInterface.bulkInsert('Answers', answers)

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
