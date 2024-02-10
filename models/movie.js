const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    // validate: {
    //   validator: (v) => validator.isURL(v),
    //   message: 'Пожалуйста введите корректный адрес ссылки на постер фильма',
    // },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Пожалуйста введите корректный адрес ссылки на трейлер фильма',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    // validate: {
    //   validator: (v) => validator.isURL(v),
    //   message: 'Пожалуйста введите корректный адрес ссылки на превью постера фильма',
    // },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: Number,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
