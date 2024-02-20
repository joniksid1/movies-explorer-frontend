import React from 'react';
import './about-me.css';
import avatar from '../../../images/student-avatar.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='subtitle'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__text-wrapper'>
          <h3 className='title about-me__title'>Виталий</h3>
          <h2 className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</h2>
          <p className='about-me__text'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена
            и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С
            2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по
            веб&#8209;разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/joniksid1'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </div>
        <img src={avatar} alt='Фотография студента' className='about-me__avatar' />
      </div>
    </section>
  );
}

export default AboutMe;
