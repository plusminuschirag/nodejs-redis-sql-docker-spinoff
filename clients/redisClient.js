const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: '6379',
  },
  password: '',
});

(async () => {
  console.log('Connecting to redis...');
  await redisClient.connect();
})();

redisClient.on('ready', () => {
  console.log('Connected!');
});

redisClient.on('error', (err) => {
  console.error(err);
});

module.exports = redisClient;
