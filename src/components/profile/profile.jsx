import React from 'react';
import './profile.css';

function Profile() {

  return (
    <main className='profile'>
      <h1 className='profile__title'>
        Привет, Виталий!
      </h1>
      <form className='profile__form'>
        <div className='profile__wrapper'>
          <label className='profile__label'>
            Имя
          </label>
          <input
            placeholder='Виталий'
            name='name'
            type='text'
            className='profile__input'
          />
        </div>
        <div className='profile__wrapper'>
          <label className='profile__label'>
            E-mail
          </label>
          <input
            required
            placeholder='pochta@yandex.ru'
            name='email'
            type='email'
            className='profile__input profile__input_type_email'
          />
        </div>
      </form>
      <div className='profile__button-wrapper'>
        <button
          type='button'
          className='profile__button'
        >
          Редактировать
        </button>
        <button
          type='button'
          className='profile__button'
        >
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
}

export default Profile;
