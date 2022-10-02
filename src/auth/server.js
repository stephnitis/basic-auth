'use strict';

require('dotenv').config();
const express = require('express');
const router = require('./router');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(router);

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
  res.status(200).send('hello');
});

app.get('/bad', (req, res, next) => {
  next('this route is bad');
});

app.use('*', notFound);

app.use(errorHandler);

module.exports = {
  app,
  start: () => app.listen(PORT, console.log('Server is running on', PORT)),
};




