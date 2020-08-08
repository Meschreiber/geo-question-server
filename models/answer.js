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
      // define association here
    }
  };
  Answer.init({
    text: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    valid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};