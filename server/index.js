const express = require('express');
const app = express();
const  {Question , Answer }  = require('../models/index.js');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.send(`The following endpoints are available:
   \n/questions 
    \n/questions/:id
    \n/answers
    \n/answers/:questionId
    `)
})
    .get('/questions', (req, res, next) => {
        Question.findAll()
            .then(questions => res.send(questions))
            .catch(next)
    })
    .get('/questions/:id', (req, res, next) => {
        Question.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(question => res.send(question))
        .catch(next)
    })
    .get('/answers', (req, res, next) => {
        Answer.findAll({
            // Unless specififying attributes, the query that is executed is SELECT "id", "text", "imageUrl", "valid", "questionId", "createdAt", "updatedAt", "QuestionId" FROM "Answers" AS "Answer";
            // Even though QuestionId no longer exists on the table
            // Leading to this error:
            // SequelizeDatabaseError: column "QuestionId" does not exist
            // at Query.formatError (/Users/maria/Desktop/geo-question-server/node_modules/sequelize/lib/dialects/postgres/query.js:386:16)
            // at Query.run (/Users/maria/Desktop/geo-question-server/node_modules/sequelize/lib/dialects/postgres/query.js:87:18)
            // at processTicksAndRejections (internal/process/task_queues.js:97:5)
            attributes: ["id", "text", "imageUrl", "valid", "questionId"]
        })
            .then(answers => res.send(answers))
            .catch(next)
    })
    .get('/answers/:questionId', (req, res, next) => {
        Answer.findAll({
            attributes: ["id", "text", "imageUrl", "valid", "questionId"],
            where: {
                questionId: req.params.questionId
            }
        })
            .then(question => res.send(question))
            .catch(next)
    })

const server = app.listen(port, () => {
    console.log(`--- Started HTTP Server for question-server ---`)
    const { address, port } = server.address()
    const host = address === '::' ? 'localhost' : address
    const urlSafeHost = host.includes(':') ? `[${host}]` : host
    console.log(`Listening on http://${urlSafeHost}:${port}`)
});