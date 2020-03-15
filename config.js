module.exports = {
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
};
