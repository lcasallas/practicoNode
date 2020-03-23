module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 4000,
  },
  jwt: {
    secret: process.env.SECRET || 'notasecret!',
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || '0VAj2fZsoo',
    password: process.env.MYSQL_PASS || '9t3HClyl6Y',
    database: process.env.MYSQL_DB || '0VAj2fZsoo',
  },
  mysqlService: {
    host: process.env.MYSQLSERVICE_HOST || 'localhost',
    port: process.env.MYSQLSERVICE_PORT || 4002,
  },
  cacheService: {
    host: process.env.CACHE_SERVICE_HOST || 'localhost',
    port: process.env.CACHE_SERVICE_PORT || 4004,
  },
  post: {
    port: process.env.POST_PORT || 4003,
  },
  redis: {
    host:
      process.env.REDIS_HOST ||
      'redis-18442.c80.us-east-1-2.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 18442,
    password: process.env.REDIS_PASS || '3dOExCtZ24p0ttE3OQ7SKUtL3s72QFW5',
  },
};
