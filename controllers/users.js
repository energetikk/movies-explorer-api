const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ValidationError = require('../errors/validationError');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');

const statusOK = 201;

const login = (req, res, next) => {
  const { password, email } = req.body;
  return User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Неправильный логин или пароль'))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
            // res.cookie('jwt', jwt, {
            //   maxAge: 604800000,
            //   httpOnly: true,
            //   sameSite: true,
            // });
            // res.send({ user });
            res.status(200).send({ token: jwt });
          } else {
            throw new UnauthorizedError('Неправильный логин или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ползователь с указанным id не найден');
      } else {
        next(res.send(user));
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(String(req.body.password), 10)
    .then((hashedpassword) => User.create({ ...req.body, password: hashedpassword }))
    .then((user) => res.status(statusOK).send({ data: user.toJSON() }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким E-mail уже существует'));
      } else {
        next(err);
      }
    });
};

const updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданные данные некорректны'));
      } else next(err);
    });
};

module.exports = {
  login,
  createUser,
  getUserInfo,
  updateProfileUser,
};
