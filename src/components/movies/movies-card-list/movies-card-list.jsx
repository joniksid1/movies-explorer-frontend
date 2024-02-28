import React from 'react';
import { useLocation } from 'react-router-dom';
import './movies-card-list.css';
import MoviesCard from '../movies-card/movies-card';
import { useCardsPerPage } from '../../../hooks/useCardsPerPage';
import { useVisibleCards } from '../../../hooks/useVisibleCards';
import { useResize } from '../../../hooks/useResize';

function MoviesCardList({ movies, saveMovie, deleteMovie }) {
  const cardsPerPage = useCardsPerPage();
  const cardsToAdd = useResize(cardsPerPage);
  const { visibleCards, handleShowMoreClick } = useVisibleCards(cardsToAdd, cardsPerPage);
  const location = useLocation();

  const isSavedMoviesPage = location.pathname === '/saved-movies';

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {isSavedMoviesPage
          ? movies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              deleteMovie={deleteMovie}
              isSavedMoviesPage={isSavedMoviesPage}
            />
          ))
          : movies.slice(0, visibleCards).map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
            />
          ))}
      </ul>
      {!isSavedMoviesPage && movies.length > visibleCards && (
        <button className='movies-card-list__more-button' onClick={handleShowMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
