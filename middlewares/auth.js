// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorizedError');
// const { JWT_SECRET, NODE_ENV } = require('../utils/config');

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization) {
//     next(new UnauthorizedError('Необходима авторизация'));
//     return;
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;
//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret_local_dev');
//   } catch (err) {
//     next(new UnauthorizedError('Необходима авторизация'));
//     return;
//   }
//   req.user = payload;
//   next();
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');
const UnauthorizedError = require('../errors/unauthorizedError');

const auth = (req, res, next) => {
  let token;
  try {
    token = req.cookies.jwt;
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
    // console.log(payload);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
