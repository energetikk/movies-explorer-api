const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    required: [false, 'Поле name должно быть обязательно заполнено'],
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    required: [true, 'Поле email должно быть обязательно заполнено'],
    unique: true,
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Пожалуйста введите правильный E-mail',
    },
  },
  password: {
    required: [true, 'Поле password должно быть обязательно заполнено'],
    type: String,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
