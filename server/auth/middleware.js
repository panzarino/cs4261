const jwt = require('express-jwt')

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }

  return null
}

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeader,
    algorithms: ['sha512'],
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    algorithms: ['sha512'],
  }),
}

module.exports = auth
