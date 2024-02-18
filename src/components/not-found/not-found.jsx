import React from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';

function NotFound() {

  return (
    <main className='not-found'>
      <h1 className='not-found__title'>
        404
      </h1>
      <p className='not-found__caption'>
        Страница не найдена
      </p>
      <Link className='not-found__link' to='/'>
        Назад
      </Link>
    </main>
  );
}

export default NotFound;
