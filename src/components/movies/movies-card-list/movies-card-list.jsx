import React from 'react';
import './movies-card-list.css';
import MoviesCard from '../movies-card/movies-card';

function MoviesCardList({ movies, cardsPerPage, cardsToAdd }) {
  const [visibleCards, setVisibleCards] = React.useState(cardsPerPage);

  const handleShowMoreClick = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + cardsToAdd);
  };

  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__list'>
        {movies.slice(0, visibleCards).map(movie => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {movies.length > visibleCards && (
        <div className='movies-card-list__more'>
          <button className='movies-card-list__more-button' onClick={handleShowMoreClick}>Ещё</button>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;
