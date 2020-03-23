const redis = require('redis');

const config = require('../config');

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

function list(tabla) {
  return new Promise((resolve, reject) => {
    client.get(tabla, (err, data) => {
      if (err) {
        return reject(err);
      }

      let res = data || null;

      if (data) {
        res = JSON.parse(data);
      }

      resolve(res);
    });
  });
}

function get(tabla, id) {}

async function upsert(tabla, data) {
  let key = tabla;
  if (data && data.id) {
    key = key + '_' + data.id;
  }
  client.setex(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  upsert,
};
