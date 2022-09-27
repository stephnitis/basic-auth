'use strict';

const express = require('express');
const { Sequelize } = require('sequelize');
const router = require('./router');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(router);


const DATABASE_URL = process.env.NODE_ENV ==='test'
  ? 'sqlite::memory'
  : 'sqlite:memory';

let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectuUnauthorized: false,
  },
} : {};

const sequelizeDatabase = new Sequelize(DATABASE_URL, options);

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
  sequelizeDatabase,
};




