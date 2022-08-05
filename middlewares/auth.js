const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/statuses');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { cookie } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!cookie || !cookie.startsWith('jwt=')) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  const token = cookie.replace('jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация!' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  // console.log(req.user);
  return next();
};
