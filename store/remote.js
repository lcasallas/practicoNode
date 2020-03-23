const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`; //Armo la ruta del micro servicio de MySQL-Service. Aqui puede ir la ruta de otro micro-servicio que me retorne data.

  function list(tabla) {
    return req('GET', tabla);
  }

  function get(tabla, id) {
    return req('GET', tabla, id);
  }

  function insert(table, data) {
    return req('POST', table, data);
  }

  function update(table, data) {
    return req('PUT', table, data);
  }

  function upsert(table, data) {
    if (data.id) {
      return update(table, data);
    }

    return insert(table, data);
  }

  function query(table, query, join) {
    return req('POST', table + '/query', { query, join });
  }

  function req(method, table, data) {
    let url = URL + '/' + table;
    body = '';

    if (method === 'GET' && data) {
      url += '/' + data;
    } else if (data) {
      body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            'content-type': 'application/json',
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error('Error con la base de datos remota', err);
            return reject(err.message);
          }

          const resp = JSON.stringify(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
    get,
    upsert,
    query,
  };
}

module.exports = createRemoteDB;
