'use strict'

// type Question {
//     id: ID!
//     topic: [String] # Geography, music, etc.
//     text: String!
//     imageUrl: String
//     answers: [Answer!]!
// }

const {STRING, ARRAY} = require('sequelize')

module.exports = db => db.define('questions', {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true
},
  topic: ARRAY,
  text: STRING,
  imageUrl: STRINGs
})

module.exports.associations = (Question, {Answer}) => {
  Question.hasMany(Answer, { foreignKey: 'uid' })
}