/* eslint-disable max-len */
// eslint-disable-next-line no-useless-escape
// const linkRegular = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,\/;=]{2,256}\.[a-zA-Z0-9.\/?#-]{2,}$/;
// const linkRegularMovies = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const linkRegular = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;
// const linkRegular = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:;/~+#-]*[\w@?^=%&/~+#-])?$/;

const linkRegularMovies = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|rutube\.ru)\/(.+)$/;
// const linkRegularMovies = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|rutube\.ru)\/(.+)$/;
module.exports = { linkRegular, linkRegularMovies };
