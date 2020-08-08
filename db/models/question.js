'use strict'

const {STRING, INTEGER} = require('sequelize')

module.exports = db => db.define('questions', {
  text: STRING,
})