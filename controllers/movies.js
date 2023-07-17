const Movie = require('../models/movie');

const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const ValidationError = require('../errors/validationError');

const statusOK = 201;

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка фильма с указанным id не найдена'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => res.send({ data: movie }))
          .catch(next);
      } else {
        throw new ForbiddenError('Недостаточно прав для удаления');
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const { nameRU, nameEN, lcountry, director, duration, year, description, image, trailer, thumbnail, movieId } = req.body;
  Movie.create({ owner, nameRU, nameEN, lcountry, director, duration, year, description, image, trailer, thumbnail, movieId })
    .then((movie) => res.status(statusOK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

// const setLikeCard = (req, res, next) => {
//   const owner = req.user._id;
//   Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: owner } }, { new: true })
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Объект не найден');
//       } else {
//         next(res.send(card));
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new ValidationError('Передан невалидный запрос id карточки'));
//       } else {
//         next(err);
//       }
//     });
// };

// const setUnLikeCard = (req, res, next) => {
//   const owner = req.user._id;
//   Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: owner } }, { new: true })
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Объект не найден');
//       } else {
//         next(res.send(card));
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new ValidationError('Передан невалидный запрос id карточки'));
//       } else {
//         next(err);
//       }
//     });
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
