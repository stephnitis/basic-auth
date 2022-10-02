'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const basicAuth = require('./middleware/basic');
const { UsersModel } = require('./models');


router.post('/signup', async (req, res, next) => {
  console.log('signup exists');
  try {
    let {username, password} = req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = await UsersModel.create({
      username,
      password: encryptedPassword,
    });
    console.log('user', user);
    res.status(201).send(user);
  } catch (err) {
    next('Sign Up Error Occured');
  }
});

router.post('/signin', basicAuth, async (req, res, next) => {


  let basicHeaderParts = req.headers.authorization.split(' ');
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await UsersModel.findOne({where: { username: username}});
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    res.status(403).send('Invalid Login');
  }

});

// router.get('/hello', basicAuth, (req, res, next) => {
//   let { username } = req.query;
//   res.status(200).send(`Hello ${username}, this route is secured with Basic Auth`);
// });

// router.get('/users', basicAuth, async (req, res, next) => {
//   console.log('from the users get route', req.user);
//   let user = await UsersModel.findAll({});

//   let payload = {
//     results: user,
//   };

//   res.status(200).send(payload);

// });

module.exports = router;
