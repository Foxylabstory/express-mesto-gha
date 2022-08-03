const User = require('../models/user');
const { UNAUTHORIZED } = require('../utils/statuses');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send(user);
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
