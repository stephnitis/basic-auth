'use strict';

const bcrypt = require('bcrypt');
const express = require('express');
const {usersInterface} = require('./models/users-model');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    let {username, password} = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);

    let user = await usersInterface.create({
      username,
      password: encryptedPassword,
    });

    res.status(200).send(user);
  } catch (err) {
    next('Signup Error');
  }
});

module.exports = router;
