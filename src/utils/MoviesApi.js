import { moviesApiOptions } from './constants.js';

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
      })
  }

  getMovies() {
    return this._getRequest(`${this._url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  };
}

const moviesApi = new Api(moviesApiOptions);

export default moviesApi;
