import React, { useState, useEffect, useContext } from 'react';
import './movies-card.css';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

function MoviesCard({ movie, saveMovie, deleteMovie, isSavedMoviesPage }) {
  const currentUser = useContext(CurrentUserContext);
  const [activeClassName, setActiveClassName] = useState('');

  useEffect(() => {
    if (movie.owner) {
      setActiveClassName('movies-card__button_active');
    } else {
      setActiveClassName('');
    }
  }, [movie.owner]);

  const movieDuration = () => {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  const handleSaveClick = async () => {
    if (movie.owner) {
      delete movie.owner;
      await deleteMovie(movie);
    } else {
      movie.owner = currentUser._id;
      await saveMovie(movie);
    }
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__wrapper'>
        <h2 className='movies-card__title'>{movie.nameRU}</h2>
        <p className='movies-card__text'>{movieDuration()}</p>
        <button
          type='button'
          className={`movies-card__button ${isSavedMoviesPage ? 'movies-card__delete-button' : activeClassName}`}
          onClick={handleSaveClick}
        />
        <a href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
          <img
            src={movie.image}
            alt='Промо-изображение фильма'
            className='movies-card__image'
          />
        </a>
      </div>
    </li>
  );
}

export default MoviesCard;
