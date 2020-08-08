'use strict';

// type Answer {
//     id: ID!
//     questionID: ID!
//     text: String!
//     imageUrl: String
//     valid: Boolean!
// }

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Question);
    }
  };
  Answer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    text: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    valid: DataTypes.BOOLEAN,
    questionId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};