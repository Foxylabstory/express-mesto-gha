const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: false,
    // minlength: [2, 'Must be at least 2, you got {VALUE}'],
    // maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    // required: false,
    // minlength: [2, 'Must be at least 2, you got {VALUE}'],
    // maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    // required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true, // [true, 'email is not unique'], должно ли так рабботать?
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
    // match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
});

module.exports = mongoose.model('user', userSchema);
