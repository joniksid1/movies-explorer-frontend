import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
      </h2>
      <div className='footer__wrapper'>
        <span className='footer__text'>
          &copy;&nbsp;2023
        </span>
        <ul className='footer__list'>
          <li className='footer__list_item'>
            <a
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noopener noreferrer'
              className='footer__link'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__list_item'>
            <a
              href='https://github.com/joniksid1'
              target='_blank'
              rel='noopener noreferrer'
              className='footer__link'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
