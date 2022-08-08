const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../environment/env');
const User = require('../models/user');
const { UNAUTHORIZED } = require('../utils/statuses');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res
        .cookie('jwt', token, { // А как еще можно работать с куками? Теория описывает только как это сделать в теле ответа
          maxAge: 3600000 * 24 * 7,
          httpOnly: true, // выключили доступ к куке из ЖС
          sameSite: true, // принимает/отправляет куки только с того же домена
        }).send(user + token); // только для того что бы посмотреть ответ
    })
    .catch((err) => {
      res
        .status(UNAUTHORIZED)
        .send({ message: err.message });
    });
};

/* User.findOne({ email })
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password);
  })
  .then((matched) => {
    if (!matched) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    return res.send({ token: 'Всё верно!' });
  })
  .catch((err) => {
    res
      .status(UNAUTHORIZED)
      .send({ message: err.message });
  }); */
