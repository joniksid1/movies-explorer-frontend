import { MOVIES_API_BASE_URL, moviesApiOptions } from "./constants";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            const errorMessage = errorData.message || 'Request failed';
            const errorWithStatus = new Error(errorMessage);
            errorWithStatus.status = response.status;
            throw errorWithStatus;
          });
        }
      });
  }

  getMovies() {
    return this._getRequest(`${this._url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((movies) => {
      return movies.map((item) => {
        return {
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          trailerLink: item.trailerLink,
          nameRU: item.nameRU,
          nameEN: item.nameEN,
          image: `${MOVIES_API_BASE_URL}${item.image.url}`,
          movieId: item.id,
          thumbnail: `${MOVIES_API_BASE_URL}${item.image.formats.thumbnail.url}`
        };
      });
    });
  }
}


const moviesApi = new Api(moviesApiOptions);

export default moviesApi;
