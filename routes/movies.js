const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegular } = require('../utils/consts');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    nameRu: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    image: Joi.string().regex(linkRegular).required(),
    trailerLink: Joi.string().regex(linkRegular).required(),
    thumbnail: Joi.string().regex(linkRegular).required(),
  }),
}), createMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = router;
