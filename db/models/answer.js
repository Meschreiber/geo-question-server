'use strict'

// type Answer {
//     id: ID!
//     questionID: ID!
//     text: String!
//     imageUrl: String
//     valid: Boolean!
// }

const { STRING, TEXT, BOOLEAN } = require('sequelize')

module.exports = db => db.define('answers', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    text: TEXT,
    imageUrl: STRING,
    valid: BOOLEAN
})

module.exports.associations = (Answer, {Question}) => {
    Answer.belongsTo(Question, { foreignKey: 'uid' })
  }