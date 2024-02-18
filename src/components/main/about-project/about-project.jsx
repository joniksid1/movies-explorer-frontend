import React from 'react';
import './about-project.css';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='subtitle'>О проекте</h2>
      <div className='about-project__two-columns'>
        <div className='about-project__wrapper'>
          <h3 className='about-project__subtitle'>
            Дипломный проект включал 5&nbsp;этапов
          </h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className='about-project__wrapper'>
          <h3 className='about-project__subtitle'>
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className='about-project__text'>
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__timer'>
        <div className='about-project__wrapper'>
          <h3 className='about-project__timer_subtitle about-project__timer_subtitle_type_green'>1 неделя</h3>
          <p className='about-project__timer-text'>Back-end</p>
        </div>
        <div className='about-project__wrapper'>
          <h3 className='about-project__timer_subtitle about-project__timer_subtitle_type_grey'>4 недели</h3>
          <p className='about-project__timer-text'>Front-end</p>
        </div>
      </div>
    </section >
  );
}

export default AboutProject
