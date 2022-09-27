'use strict';

const { sequelizeDatabase, start } = require('./src/auth/server');

sequelizeDatabase.sync()
  .then(() => console.log('successfully connected'))
  .catch(error => console.error(error));

start();
