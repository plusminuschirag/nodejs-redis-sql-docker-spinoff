var mysql = require('mysql2');
const { param } = require('../app');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Apple@2023#$#$',
});

// simple query
conn.query(
  'CREATE DATABASE IF NOT EXISTS dictionaryDB',
  function (err, results, fields) {
    // console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  }
);

conn.query('USE dictionaryDB', function (err, results, fields) {
  //   console.log(results);
  //   console.log(fields);
});

// console.log('-------');

const create_table_query =
  'CREATE TABLE IF NOT EXISTS wordMeaningTable(\
    WORD VARCHAR(255) PRIMARY KEY,\
    PARTOFSPEECH_1 VARCHAR(255),\
    DEFINITION_1 VARCHAR(999),\
    SYNONYMS_1 VARCHAR(255),\
    ANTONYMS_1 VARCHAR(255),\
    PARTOFSPEECH_2 VARCHAR(255),\
    DEFINITION_2 VARCHAR(999),\
    SYNONYMS_2 VARCHAR(255),\
    ANTONYMS_2 VARCHAR(255)\
)';

conn.query(create_table_query, function (err, results, fields) {
  //   console.log(err);
  //   console.log(results);
  //   console.log(fields);
});

function insertDB(parameters) {
  word = parameters.word;
  partOfSpeech1 = parameters.partOfSpeech1;
  definition1 = parameters.definition1;
  synonyms1 = parameters.synonyms1;
  antonyms1 = parameters.antonyms1;
  partOfSpeech2 = parameters.partOfSpeech2;
  definition2 = parameters.definition2;
  synonyms2 = parameters.synonyms2;
  antonyms2 = parameters.antonyms2;
  conn.query(
    'INSERT INTO wordMeaningTable VALUES(?,?,?,?,?,?,?,?,?)',
    [
      word,
      partOfSpeech1,
      definition1,
      synonyms1,
      antonyms1,
      definition2,
      partOfSpeech2,
      synonyms2,
      antonyms2,
    ],
    function (err, results, fields) {
      console.log(err);
      //   console.log(results);
      console.log('Insertion SQL Successful!!!');
    }
  );
}

function showDB() {
  conn
    .promise()
    .query('SELECT * FROM wordMeaningTable')
    .then(([rows, fields]) => {
      console.log(rows);
    });
}

module.exports = { insertDB, showDB };
