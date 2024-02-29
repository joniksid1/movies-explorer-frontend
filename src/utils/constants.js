const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co/'

const ERROR_TEXT = `
  Во время запроса произошла ошибка.
  Возможно, проблема с соединением или сервер недоступен.
  Подождите немного и попробуйте ещё раз.
`

const apiOptions = {
  // url: 'http://localhost:3001',
  url: 'https://api.joniksid.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json',
  },
};

const moviesApiOptions = {
  url: `${MOVIES_API_BASE_URL}beatfilm-movies`,
  headers: {
    'Content-Type': 'application/json',
  },
};

const SHORTFILM_DURATION = 40;
const LAPTOP_FILMS_AMOUNT = 12;
const TABLET_FILMS_AMOUNT = 8;
const MOBILE_FILMS_AMOUNT =5;
const DESKTOP_WIDTH = 1280;
const TABLET_WIDTH = 786;
const MOBILE_WIDTH = 320;
const MOBILE_TABLET_CARDS_TO_ADD = 2;
const DESKTOP_CARDS_TO_ADD = 3;

export {
  apiOptions,
  moviesApiOptions,
  ERROR_TEXT,
  MOVIES_API_BASE_URL,
  SHORTFILM_DURATION,
  LAPTOP_FILMS_AMOUNT,
  TABLET_FILMS_AMOUNT,
  MOBILE_FILMS_AMOUNT,
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  MOBILE_WIDTH,
  MOBILE_TABLET_CARDS_TO_ADD,
  DESKTOP_CARDS_TO_ADD,
};
