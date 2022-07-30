const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2, you got {VALUE}'],
    maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2, you got {VALUE}'],
    maxlength: [30, 'Must be no more than 30, you got {VALUE}'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
