import React, { useState } from 'react';
import './movies-card.css';

function MoviesCard({ movie }) {

  const imageUrl = `https://api.nomoreparties.co${movie.image.url}`
  const [activeClassName, setActiveClassName] = useState('')

  const movieDuration = () => {
    const hours = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  const handleSaveClick = () => {
    setActiveClassName('movies-card__button_active');
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__wrapper'>
        <h2 className='movies-card__title'>{movie.nameRU}</h2>
        <p className='movies-card__text'>{movieDuration()}</p>
        <button
          type='button'
          className={`movies-card__button ${activeClassName}`}
          onClick={handleSaveClick}
        />
        <a href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
          <img
            src={imageUrl}
            alt='Промо-изображение фильма'
            className='movies-card__image'
          />
        </a>
      </div>
    </li>
  );
}

export default MoviesCard;
