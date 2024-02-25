import React from 'react';
import './movies-card-list.css';
import MoviesCard from '../movies-card/movies-card';
import { useCardsPerPage } from '../../../hooks/useCardsPerPage';
import { useVisibleCards } from '../../../hooks/useVisibleCards';
import { useResize } from '../../../hooks/useResize';

function MoviesCardList({ movies, saveMovie, deleteMovie }) {
  const cardsPerPage = useCardsPerPage();
  const cardsToAdd = useResize(cardsPerPage);
  const { visibleCards, handleShowMoreClick } = useVisibleCards(cardsToAdd, cardsPerPage);

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {movies.slice(0, visibleCards).map((movie, index) => (
          <MoviesCard
            key={index}
            movie={movie}
            saveMovie={saveMovie}
            deleteMovie={deleteMovie}
          />
        ))}
      </ul>
      {movies.length > visibleCards && (
        <div className='movies-card-list__more'>
          <button className='movies-card-list__more-button' onClick={handleShowMoreClick}>
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
