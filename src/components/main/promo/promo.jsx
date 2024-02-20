import React from 'react';
import './promo.css';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__wrapper'>
        <h1 className='title'>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.
        </p>
        <a className='promo__link' href='#about-project'>
          Узнать больше
        </a>
      </div>
      <div className='promo__logo'></div>
    </section>
  );
}

export default Promo
