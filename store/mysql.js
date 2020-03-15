const mysql = require('mysql');

const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

//Connect!

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);
  connection.connect(err => {
    if (err) {
      console.error('[db error]', err);
      setTimeout(handleCon, 200);
    } else {
      console.log('DB Connected!');
    }
  });

  connection.on('error', err => {
    console.error('[db error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla}`, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
}

function get(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${tabla} WHERE id='${id}'`,
      (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      }
    );
  });
}

function insert(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

function update(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${tabla} SET ? WHERE id=?`,
      [data, data.id],
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
}

async function upsert(tabla, data) {
  const row = await get(tabla, data.id);
  if (row.length === 0) {
    return insert(tabla, data);
  } else {
    return update(tabla, data);
  }
}

function query(tabla, qry) {
  console.log(qry);
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE ?`, qry, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0] || null);
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
