const express = require('express');
const axios = require('axios');
const redisClient = require('../clients/redisClient');

const router = express.Router();

function getWordResponse(word) {
  const axiosPromise = axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const dataPromise = axiosPromise.then((response) => response.data);
  return dataPromise;
}

function getRedisValue(key) {
  const redisPromise = redisClient.get(key, (err, value) => value);
  const getValue = redisPromise.then((value) => {
    console.log(value);
    return value;
  });
  return getValue;
}

function setRedisValue(key, value) {
  const redisPromise = redisClient.set(key, value);
  const setValue = redisPromise.then((value) => value);
  return setValue;
}

router.get('/', (req, res, next) => {
  const word = req.query.word;
  getRedisValue(word).then((value) => {
    if (value) {
      console.log('Redis value found: ' + value);
      res.status(201).json({ message: JSON.parse(value) });
    } else {
      console.log('Redis value NOT found :' + value);
      getWordResponse(word).then((data) =>
        setRedisValue(word, JSON.stringify(data)).then((redisResponse) => {
          console.log('redisResponse :' + redisResponse);
          res.status(201).json({ message: data });
        })
      );
    }
  });
});

module.exports = router;
