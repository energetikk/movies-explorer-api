require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
const router = require('./routes');
// const errorHandler = require('./middlewares/errorHandler');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./utils/config');
// const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB);

// app.use(requestLogger);
// app.use(cookieParser());
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'https://mestogram.nomoreparties.sbs', 'http://mestogram.nomoreparties.sbs', 'https://mestogramback.nomoreparties.sbs', 'http://mestogramback.nomoreparties.sbs'],
//   credentials: true,
// }));
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(router);
// app.use(errorLogger);
// app.use(errors());
// app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт ${PORT}`);
});
