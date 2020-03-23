const config = require('../../../config');

let store, cache;

if (!config.remoteDB) {
  store = require('../../../store/mysql');
  cache = require('../../../store/redis');
} else {
  store = require('../../../store/remote-mysql');
  cache = require('../../../store/remote-cache');
}

const controller = require('./controller');

module.exports = controller(store, cache);
