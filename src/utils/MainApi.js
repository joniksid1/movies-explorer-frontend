import apiOptions from './constants.js';

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

  getInitialCards() {
    return this._getRequest(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
  }

  createCard(data) {
    return this._getRequest(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  setlike(id, isLiked) {
    return isLiked
      ? this._getRequest(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      : this._getRequest(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      });
  }

}

const api = new Api(apiOptions);

export default api;
