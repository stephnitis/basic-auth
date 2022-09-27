'use strict';

const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');
const express = require('express');
const {usersInterface} = require('./models/users-model');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  console.log('signup exists');
  try {
    let {username, password} = req.body;
    let encryptedPassword = await bcrypt.hash(password, 5);

    let user = await usersInterface.create({
      username,
      password: encryptedPassword,
    });

    res.status(200).send(user);
    console.log(user);
  } catch (err) {
    next('Signup Error');
  }
});

router.post('./signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

router.get('/hello', basicAuth, (req, res, next) => {
  let { username } = req.query;
  res.status(200).send(`Hello ${username}, this route is secured with Basic Auth`);
});

module.exports = router;
