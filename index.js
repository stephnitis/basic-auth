'use strict';

require('dotenv').config();
const app = require('./src/auth/server');
const { sequelizeDatabase } = require('./src/auth/models');

sequelizeDatabase.sync()
  .then(() => {
    app.start(process.env.PORT || 3002);
    console.log('successfully connected');
  });
