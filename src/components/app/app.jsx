import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import MenuModal from '../menu-modal/menu-modal';
import NotFound from '../not-found/not-found';
import api from '../../utils/MainApi';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isSucsessed, setIsSucsessed] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHeaderVisible = ['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname);
  const isHeaderWhite = ['/profile', '/movies','/saved-movies'].includes(location.pathname);
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
      const res = await api.getContent();
      if (res) {
        setisLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setisLoggedIn]);

  useEffect(() => {
    const id = getId();

    if (id) {
      auth();
    }
  }, [auth]);

  const onRegister = (name, password, email) => {
    return api.register(name, password, email).then((res) => {
      setIsSucsessed(true);
      navigate('/sign-in');
      return res;
    }).catch((error) => {
      setIsSucsessed(false);
      setError(error);
    })
  }

  const onLogin = (password, email) => {
    return api.authorize(password, email)
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
    setisLoggedIn(false);
    navigate('/sign-in');
  };

  function handleUpdateUser(data) {
    showLoader();

    return api.setUserInfo(data)
      .then((data) => {
        removeLoader();
        return data;
      })
      .catch((error) => {
        removeLoader();
        throw error;
      });
  }

  function showLoader() {
    setIsLoading(true);
  }

  function removeLoader() {
    setIsLoading(false);
  }

  // Для бокового меню

  const hadndleMenuClose = () => {
    setIsMenuOpen(false);
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      hadndleMenuClose();
    }
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        {isHeaderVisible && <Header
          isLoggedIn={isLoggedIn}
          setIsMenuOpen={setIsMenuOpen}
          isHeaderWhite={isHeaderWhite}
        />}
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
            onSignOut={onSignOut}
            handleUpdateUser={handleUpdateUser}
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
        <MenuModal
          isMenuOpen={isMenuOpen}
          onClose={hadndleMenuClose}
          onOverlayClick={handleOverlayClick}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App
