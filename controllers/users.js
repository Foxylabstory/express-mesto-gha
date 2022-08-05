const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { errorMessage } = require('../utils/customErrors');
const { CREATED, NOT_FOUND } = require('../utils/statuses');

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const findUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const getUserInfo = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      errorMessage(err, req, res);
    });
};

module.exports = {
  createUser,
  findUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
};
