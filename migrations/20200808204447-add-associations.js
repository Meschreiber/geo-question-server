'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Answers', // name of Source model
      'questionId', // name of the column we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Questions', // name of Target model
          key: 'id', // column in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Answers', // name of Source model
      'questionId' // column we want to remove
    );
  }
};
