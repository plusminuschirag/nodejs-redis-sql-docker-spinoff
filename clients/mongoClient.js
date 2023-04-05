// mongodb://localhost:27017
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function mongoInsertOne(doc) {
  const database = client.db('wordMeaning');
  const dictionary = database.collection('dictionary');

  const result = await dictionary.insertOne(doc);
  console.log('Pushing results....');
  return result;
}

module.exports = mongoInsertOne;
