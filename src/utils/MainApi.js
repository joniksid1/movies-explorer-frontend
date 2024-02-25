import { apiOptions } from './constants.js';

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

  register(name, password, email) {
    return this._getRequest(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password, email })
    })
  };

  authorize(password, email) {
    return this._getRequest(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
  };

  getContent(token) {
    return this._getRequest(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  };

  getUserInfo() {
    return this._getRequest(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
  }

  setUserInfo(data) {
    return this._getRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    }
    )
  }

  getSavedMovies() {
    return this._getRequest(`${this._url}/movies`, {
      method: 'get',
      credentials: 'include',
      headers: this._headers,
    })
  }

  saveMovie(data) {
    return this._getRequest(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  deleteMovie(id) {
    return this._getRequest(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
  }

}

const api = new Api(apiOptions);

export default api;
