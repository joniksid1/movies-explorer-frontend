import React from 'react';
import movie from '../../../images/test-card.png';
import './movies-card.css';

function MoviesCard() {

  return (
    <li className='movies-card'>
      <div className='movies-card__wrapper'>
        <h2 className='movies-card__title'>33 слова о дизайне</h2>
        <p className='movies-card__text'>1ч 47м</p>
        <button
          type='button'
          className='movies-card__button'
        />
        <img
          src={movie}
          alt='Промо-изображение фильма'
          className='movies-card__image'
        />
      </div>
    </li>
  );
}

export default MoviesCard;
