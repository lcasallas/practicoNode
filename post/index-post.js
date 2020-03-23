const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const errors = require('../network/errors');
const post = require('./components/post/network');

const app = express();
app.use(bodyParser.json());

//ROUTER
app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
  console.log('Api escuchando en el puerto', config.post.port);
});
