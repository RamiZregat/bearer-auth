'use strict';

const { users } = require('../models/index.js')
const base64 = require('base-64');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ')[1];
  let [username, pass] = base64.decode(basic).split(':');

  try {
    console.log(users);
    req.users = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}
