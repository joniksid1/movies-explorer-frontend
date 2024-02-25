import React, { useEffect } from 'react';
import './movies.css';
import SearchForm from './search-form/search-form';
import MoviesCardList from './movies-card-list/movies-card-list';
import Preloader from './preloader/preloader';

function Movies({
  fetchMovies,
  isLoading,
  movies,
  saveMovie,
  deleteMovie,
  setMovies,
  loadMoviesFromLocalStorage,
  loadSearchStateFromLocalStorage,
  loadAndSyncMovies,
  error,
  shouldLoadAndSyncMovies,
  setShouldLoadAndSyncMovies,
}) {
  // Загрузка фильмов из локального хранилища и синхронизация с сохраненными фильмами
  useEffect(() => {
    const moviesFromLocalStorage = loadMoviesFromLocalStorage();
    setMovies(moviesFromLocalStorage);
    loadAndSyncMovies();
  }, []);

  useEffect(() => {
    if (shouldLoadAndSyncMovies) {
      loadAndSyncMovies();
      setShouldLoadAndSyncMovies(false);
    }
  }, [shouldLoadAndSyncMovies, setShouldLoadAndSyncMovies, loadAndSyncMovies]);

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={fetchMovies}
        loadSearchStateFromLocalStorage={loadSearchStateFromLocalStorage}
      />
      {isLoading && <Preloader />}
      {error && <div className='movies__error-wrapper'>
        <p className='movies__error-message'>
          {error}
        </p>
      </div>}
      {!isLoading && !error && movies.length > 0 && (
        <MoviesCardList
          movies={movies}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
        />
      )}
    </main>
  );
}
export default Movies;
