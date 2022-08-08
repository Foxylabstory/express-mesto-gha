/* eslint-disable no-debugger */
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../environment/env');
const { UNAUTHORIZED } = require('../utils/statuses');

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
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация!' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  // console.log(req.user);
  return next();
};
