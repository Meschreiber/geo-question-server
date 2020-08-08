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
      // this.hasMany(models.Answer)
    }
  };
  Question.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    text: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    topic: DataTypes.ARRAY(DataTypes.STRING),
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};