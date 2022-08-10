/* eslint-disable no-debugger */
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../environment/env');
const AuthorizationError = require('../errors/authorizationError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  // const { cookie } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  // if (!cookie || !cookie.startsWith('jwt=')) {
  //   return res
  //     .status(UNAUTHORIZED)
  //     .send({ message: 'Необходима авторизация' });
  // }
  // const token = cookie.replace('jwt=', '');
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (e) {
    const err = new AuthorizationError('Необходима авторизация!');
    next(err);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next();
};
