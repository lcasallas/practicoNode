const db = {
  user: [
    {
      id: '1',
      name: 'leonardo',
    },
  ],
};

async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let col = await list(tabla);
  return col.filter(item => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }

  db[tabla].push(data);
  // return get(tabla, data.id);
}

async function remove(tabla, id) {
  return true;
}

async function query(tabla, qry) {
  let col = await list(tabla);
  let keys = Object.keys(qry);
  let key = keys[0];
  return col.filter(item => item[key] === qry[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
