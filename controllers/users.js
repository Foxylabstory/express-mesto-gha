const User = require("../models/user");

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const findUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const findUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
}

module.exports = { createUser, findUsers, findUserById, updateUserInfo, updateUserAvatar };
