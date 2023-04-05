const express = require('express');
const axios = require('axios');
const redisClient = require('./clients/redisClient');
const { insertDB, showDB } = require('./clients/sqlClient');
const prepareDBQuery = require('./utils/dbUtils');
const nosqlRouter = require('./routers/nosqlRouter');

const app = express();

app.get('/', (req, res, next) => {
  const word = req.query.word;
  console.log('Word: ' + word);
  //   Checking if word exists in redis
  redisClient
    .get(word, (err, value) => {
      if (err) {
        console.log(err);
        throw err;
      }
      return value;
    })
    .then((value) => {
      console.log('Searching in Redis!!  ' + value);
      if (value) {
        console.log('Value found in Redis!!');
        res.status(201).json({
          message: JSON.parse(value),
        });
      } else {
        axios
          .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .then((response) => {
            const meanings = response.data[0].meanings;
            console.log(typeof meanings);
            redisClient
              .set(word, JSON.stringify(meanings), (err, reply) => {
                return reply;
              })
              .then((reply) => {
                console.log('Setting value in Redis!!!');
                res.status(201).json({
                  message: meanings,
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    });
});

app.get('/save', (req, res, next) => {
  const word = req.query.word;
  console.log('Word: ' + word);
  //   Checking if word exists in redis
  redisClient
    .get(word, (err, value) => {
      if (err) {
        console.log(err);
        throw err;
      }
      return value;
    })
    .then((value) => {
      console.log('Searching in Redis!!  ' + value);
      let wordResponse;
      if (value) {
        console.log('Value found in Redis!!');
        wordResponse = JSON.parse(value);
        parameters = prepareDBQuery(word, wordResponse);
        insertDB(parameters);
        res.status(201).send({ message: 'Insertion Successful' });
      } else {
        console.log('Calling APIs');
        axios
          .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
          .catch((error) => {
            console.log(error);
          })
          .then((response) => {
            console.log('WordResponseURL1 :' + response.data[0].meanings);
            wordResponse = response.data[0].meanings;
            console.log('WordResponseURL2 :' + wordResponse);
            console.log(typeof wordResponse);
            redisClient
              .set(word, JSON.stringify(wordResponse), (err, reply) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
                return reply;
              })
              .then((reply) => {
                console.log('WordResponseReply :' + wordResponse);
                console.log('Setting value in Redis!!!');
                parameters = prepareDBQuery(word, wordResponse);
                insertDB(parameters);
                res.status(201).json({ message: 'Inserted' });
              });
          });
      }
    });
});

app.get('/show', (req, res, next) => {
  ans = showDB();
  console.log(ans);
  res.status(201).json({
    response: 'save',
  });
});

app.use('/nosql', nosqlRouter);

module.exports = app;
