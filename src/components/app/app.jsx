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
import moviesApi from '../../utils/MoviesApi';
import { ERROR_TEXT } from '../../utils/constants';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSucsessed, setIsSucsessed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [shouldLoadAndSyncMovies, setShouldLoadAndSyncMovies] = useState(false);

  const isHeaderVisible = ['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname);
  const isHeaderWhite = ['/profile', '/movies', '/saved-movies'].includes(location.pathname);
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
    localStorage.clear();
    setisLoggedIn(false);
    navigate('/sign-in');
  };

  function handleUpdateUser(data) {
    return api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        return data;
      })
      .catch((error) => {
        throw error;
      });
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

  useEffect(() => {
    // При первом заходе на страницу, загружаем сохраненные фильмы с бэкенда
      api.getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  useEffect(() => {
    // При первом заходе на страницу saved-movies, очищаем ошибку и поиск по сохранённым фильмам, отображение найденных фильмов
    if (location.pathname === '/saved-movies') {
      setError(null);
      setSearchedSavedMovies([]);
      setIsSearchPerformed(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // При первом заходе на страницу movies, очищаем ошибку и синхронизируем фильмы с сохранёнными
    if (location.pathname === '/movies') {
      setError(null);
      setShouldLoadAndSyncMovies(true);
    }
  }, [location.pathname]);

  const filterMovies = (movies, query, isChecked) => {
    const request = query.trim().toLowerCase();
    return movies.filter((movie) => {
      const russianName = movie.nameRU.toLowerCase();
      const englishName = movie.nameEN.toLowerCase();
      const includesQuery = russianName.includes(request) || englishName.includes(request);
      const meetsDuration = isChecked ? movie.duration <= 40 : true;
      return includesQuery && meetsDuration;
    });
  };

  const searchSavedMovies = (query, isChecked) => {
    setIsLoading(true);
    try {
      setError(null);
      const filtered = filterMovies(savedMovies, query, isChecked);
      setSearchedSavedMovies(filtered);
      if (!filtered.length) {
        setError('Ничего не найдено');
      }
    } catch (error) {
      console.log(error);
      setError(ERROR_TEXT);
    } finally {
      setIsLoading(false);
      setIsSearchPerformed(true);
    }
  };

  const fetchMovies = async (query, isChecked) => {
    try {
      setError(null);
      setIsLoading(true);
      const moviesData = await moviesApi.getMovies();
      let filteredMovies = filterMovies(moviesData, query, isChecked);
      setMovies(filteredMovies);
      saveMoviesToLocalStorage(filteredMovies);
      const searchState = { query, isChecked };
      saveSearchStateToLocalStorage(searchState);
      if (!filteredMovies.length) {
        setError('Ничего не найдено');
      }
    } catch (error) {
      console.log(error);
      setError(ERROR_TEXT);
    } finally {
      setShouldLoadAndSyncMovies(true);
      setIsLoading(false);
    }
  };

  const saveSearchStateToLocalStorage = (searchState) => {
    localStorage.setItem('searchState', JSON.stringify(searchState));
  };

  const loadSearchStateFromLocalStorage = () => {
    const storedSearchState = localStorage.getItem('searchState');
    return storedSearchState ? JSON.parse(storedSearchState) : {};
  };

  const saveMoviesToLocalStorage = (moviesData) => {
    localStorage.setItem('movies', JSON.stringify(moviesData));
  };

  const loadMoviesFromLocalStorage = () => {
    const storedMovies = localStorage.getItem('movies');
    return storedMovies ? JSON.parse(storedMovies) : [];
  };

  // Функция для сравнения сохраненных фильмов с фильмами из локального хранилища
  const syncSavedMoviesWithLocalStorage = (savedMovies, localStorageMovies) => {
    const syncedMovies = localStorageMovies.map(localStorageMovie => {
      const savedMovie = savedMovies.find(savedMovie => savedMovie.nameRU === localStorageMovie.nameRU);
      if (savedMovie) {
        localStorageMovie._id = savedMovie._id;
        localStorageMovie.owner = savedMovie.owner;
      }
      return localStorageMovie;
    });
    return syncedMovies;
  };

  // Функция для загрузки фильмов из локального хранилища, сравнения с сохраненными и обновления состояния
  const loadAndSyncMovies = () => {
    const localStorageMovies = loadMoviesFromLocalStorage();
    const syncedMovies = syncSavedMoviesWithLocalStorage(savedMovies, localStorageMovies);
    setMovies(syncedMovies);
  };

  const saveMovie = async (movie) => {
    try {
      const savedMovie = await api.saveMovie(movie);
      const updatedSavedMovies = [...savedMovies, savedMovie];
      setSavedMovies(updatedSavedMovies);
      setShouldLoadAndSyncMovies(true);
    } catch (error) {
      console.log(error);
      setError(ERROR_TEXT);
    }
  }

  const deleteMovie = async (movie) => {
    try {
      await api.deleteMovie(movie._id);
      const updatedSavedMovies = savedMovies.filter((item) => item._id !== movie._id);
      setSavedMovies(updatedSavedMovies);
      if (searchedSavedMovies.length > 0) {
        const updatedSearchedSavedMovies = searchedSavedMovies.filter((item) => item._id !== movie._id);
        setSearchedSavedMovies(updatedSearchedSavedMovies);
      }
      setShouldLoadAndSyncMovies(true);
    } catch (error) {
      console.log(error);
      setError(ERROR_TEXT);
    }
  }

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
            fetchMovies={fetchMovies}
            isLoading={isLoading}
            movies={movies}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
            setMovies={setMovies}
            loadMoviesFromLocalStorage={loadMoviesFromLocalStorage}
            loadSearchStateFromLocalStorage={loadSearchStateFromLocalStorage}
            loadAndSyncMovies={loadAndSyncMovies}
            error={error}
            element={Movies}
            shouldLoadAndSyncMovies={shouldLoadAndSyncMovies}
            setShouldLoadAndSyncMovies={setShouldLoadAndSyncMovies}
          />} />
          <Route path='/saved-movies' element={<ProtectedRoute
            loggedIn={isLoggedIn}
            isLoading={isLoading}
            savedMovies={savedMovies}
            searchedSavedMovies={searchedSavedMovies}
            deleteMovie={deleteMovie}
            searchSavedMovies={searchSavedMovies}
            isSearchPerformed={isSearchPerformed}
            error={error}
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

export default App;
