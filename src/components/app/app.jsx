import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getId, removeId, setId } from '../../utils/userId';
import './app.css';
import Header from '../header/header';
import Main from '../main/main';
import ProtectedRoute from '../protected-route/protected-route';
import Movies from '../movies/movies';
import SavedMovies from '../saved-movies/saved-movies';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Profile from '../profile/profile';
import Login from '../login/login';
import Register from '../register/register';
import Footer from '../footer/footer';
import NotFound from '../not-found/not-found';
import * as authApi from '../../utils/authApi';
import api from '../../utils/Api';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState({});
  const [isSucsessed, setIsSucsessed] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const isHeaderVisible = ['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname);
  const isFooterVisible = ['/', '/movies', '/saved-movies'].includes(location.pathname);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  const auth = useCallback(async () => {
    try {
      const res = await authApi.getContent();
      if (res) {
        setisLoggedIn(true);
        setUserEmail(res.email);
        navigate('/movies');
      }
    } catch (err) {
      console.log(err);
    }
  }, [setisLoggedIn, setUserEmail, navigate]);

  useEffect(() => {
    const id = getId();

    if (id) {
      auth();
    }
  }, [auth]);

  const onRegister = (name, password, email) => {
    return authApi.register(name, password, email).then((res) => {
      setIsSucsessed(true);
      navigate('/sign-in');
      return res;
    }).catch((error) => {
      setIsSucsessed(false);
      setError(error);
    })
  }

  const onLogin = (password, email) => {
    return authApi.authorize(password, email)
      .then((data) => {
        if (data._id) {
          setId(data._id);
          setisLoggedIn(true);
          navigate('/');
          return data;
        } else {
          return;
        }
      }).catch((error) => {
        setIsSucsessed(false);
        setError(error);
      })
  }

  const onSignOut = () => {
    removeId();
    setUserEmail('');
    setisLoggedIn(false);
    navigate('/login');
  };

  function handleUpdateUser(data) {
    showLoader();

    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        removeLoader()
      });
  }

  function showLoader() {
    setIsLoading(true);
  }

  function removeLoader() {
    setIsLoading(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path='/movies' element={<ProtectedRoute
            loggedIn={isLoggedIn}
            element={Movies}
          />} />
          <Route path='/saved-movies' element={<ProtectedRoute
            loggedIn={isLoggedIn}
            element={SavedMovies}
          />} />
          <Route path='/profile' element={<ProtectedRoute
            loggedIn={isLoggedIn}
            element={Profile}
          />} />
          <Route path={'/sign-in'} element={<Login
            onLogin={onLogin}
            isLoggedIn={isLoggedIn}
          />} />
          <Route path={'/sign-up'} element={<Register
            onRegister={onRegister}
            isSucsessed={isSucsessed}
          />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
        {isFooterVisible && <Footer />}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App
