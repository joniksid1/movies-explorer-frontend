import React, { useEffect, useState } from 'react';
import './saved-movies.css';
import SearchForm from '../movies/search-form/search-form';
import MoviesCardList from '../movies/movies-card-list/movies-card-list';
import Preloader from '../movies/preloader/preloader';

function SavedMovies({ isLoading, savedMovies, searchedSavedMovies, deleteMovie, searchSavedMovies, isSearchPerformed, error }) {
  const [displayedMovies, setDisplayedMovies] = useState([]);

  const displayMovies = (moviesType) => {
    setDisplayedMovies(moviesType);
  };

  useEffect(() => {
    if (isSearchPerformed) {
      displayMovies(searchedSavedMovies)
    } else {
      displayMovies(savedMovies);
    }
  }, [searchedSavedMovies, savedMovies]);

  return (
    <main className='movies saved-movies'>
      <SearchForm
        loadSearchStateFromLocalStorage={() => { }}
        searchSavedMovies={searchSavedMovies}
        isLoading={isLoading}
      />
      {isLoading && <Preloader />}
      {error && <div className='movies__error-wrapper'>
        <p className='movies__error-message'>
          {error}
        </p>
      </div>}
      {!isLoading && !error && displayedMovies.length > 0 && (
        <MoviesCardList
          movies={displayedMovies}
          deleteMovie={deleteMovie}
        />
      )}
    </main>
  );
}
export default SavedMovies;
