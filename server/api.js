'use strict'
const { Question, Answer } = require('APP/models')
const api = module.exports = require('express').Router()

api
  .get('/questions', (req, res, next) => {
    console.log('getting questions')
    Question.findAll({})
      .then(questions => res.send(questions))
      .catch(next)
  })
  .get('/questions/:id', (req, res, next) => {
    Question.findById(req.params.id)
      .then(question => res.send(question))
      .catch(next)
  })
  .get('/answers/:questionId', (req, res, next) => {
    Answer.findAll({
      where: {
        questionID: req.params.questionID
      }
    })
      .then(question => res.send(question))
      .catch(next)
  })

// No routes matched? 404.
api.use((req, res) => res.status(404).end())

