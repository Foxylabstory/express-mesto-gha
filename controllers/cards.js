const Card = require("../models/card");

const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id); // _id станет доступен
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const findCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((respond) => res.send(respond))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((respond) => res.send(respond))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((respond) => res.send(respond))
    .catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = { createCard, findCards, deleteCard, likeCard, dislikeCard };
