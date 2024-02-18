import React from 'react';
import './saved-movies.css';
import SearchForm from '../movies/search-form/search-form';
import MoviesCardList from '../movies/movies-card-list/movies-card-list';

function SavedMovies() {

  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default SavedMovies;
