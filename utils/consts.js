/* eslint-disable max-len */
// eslint-disable-next-line no-useless-escape
// const linkRegular = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,\/;=]{2,256}\.[a-zA-Z0-9.\/?#-]{2,}$/;
const linkRegular = /^(https?:\/\/)?[^\s]*\.(jpg|jpeg|png|gif|bmp|test)$/;
const linkRegularMovie = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|rutube\.ru)\/(.+)$/;
module.exports = { linkRegular, linkRegularMovie };
