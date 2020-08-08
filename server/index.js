'use strict'
const { Question } = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/questions', (req, res, next) => {
    Quesiton.findAll({})
      .then(products => res.send(products))
      .catch(next)
  })
  .get('/questions/:id', (req, res, next) => {
    Question.findById(req.params.id)
      .then(product => res.send(product))
      .catch(next)
  })
  
// No routes matched? 404.
api.use((req, res) => res.status(404).end())
