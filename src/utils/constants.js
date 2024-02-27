const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co/'

const ERROR_TEXT = `
  Во время запроса произошла ошибка.
  Возможно, проблема с соединением или сервер недоступен.
  Подождите немного и попробуйте ещё раз.
`

const apiOptions = {
  url: 'http://localhost:3001',
  // url: 'https://api.joniksid.nomoredomainsmonster.ru',
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

export { apiOptions, moviesApiOptions, ERROR_TEXT, MOVIES_API_BASE_URL };
