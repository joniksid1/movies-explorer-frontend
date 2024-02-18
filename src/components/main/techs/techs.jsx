import React from 'react';
import './techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='subtitle'>Технологии</h2>
      <div className="techs__wrapper">
        <h3 className='title techs__title'>7 технологий</h3>
        <p className='techs__text'>
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили
          в&nbsp;дипломном проекте.
        </p>
        <ul className='techs__list'>
          <li className='techs__list_item'>HTML</li>
          <li className='techs__list_item'>CSS</li>
          <li className='techs__list_item'>JS</li>
          <li className='techs__list_item'>React</li>
          <li className='techs__list_item'>Git</li>
          <li className='techs__list_item'>Express.js</li>
          <li className='techs__list_item'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
