import React, { useState, useEffect } from 'react';
import './saved-movies.css';
import SearchForm from '../movies/search-form/search-form';
import MoviesCardList from '../movies/movies-card-list/movies-card-list';
import Preloader from '../movies/preloader/preloader';

function SavedMovies({ isLoading, savedMovies, deleteMovie, error }) {

  return (
    <main className='movies saved-movies'>
      <SearchForm
        loadSearchStateFromLocalStorage={() => { }}
      />
      {isLoading && <Preloader />}
      {error && <div className='movies__error-wrapper'>
        <p className='movies__error-message'>
          {error}
        </p>
      </div>}
      {!isLoading && !error && savedMovies.length > 0 && (
        <MoviesCardList
          movies={savedMovies}
          deleteMovie={deleteMovie}
        />
      )}
    </main>
  );
}
export default SavedMovies;
