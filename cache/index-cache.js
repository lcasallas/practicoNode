const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = require('../config');
const router = require('./network');

//RUTAS
app.use('/', router);

app.listen(config.cacheService.port, () => {
  console.log(
    'Servicio de cache escuchando en el puerto',
    config.cacheService.port
  );
});
