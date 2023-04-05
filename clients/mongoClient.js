// mongodb://localhost:27017
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('flights');
    const movies = database.collection('flightData');

    //Query
    const query = {};
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
