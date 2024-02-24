const apiOptions = {
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
};

const moviesApiOptions = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
};

const ERROR_TEXT = `
  Во время запроса произошла ошибка.
  Возможно, проблема с соединением или сервер недоступен.
  Подождите немного и попробуйте ещё раз.
`

export { apiOptions, moviesApiOptions, ERROR_TEXT };
