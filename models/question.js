'use strict';

// type Question {
//     id: ID!
//     topic: [String] # Geography, music, etc.
//     text: String!
//     imageUrl: String
//     answers: [Answer!]!
// }

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Question.init({
    text: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    topic: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};