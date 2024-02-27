import React, { useState, useContext, useEffect } from 'react';
import './profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Profile({ onSignOut, handleUpdateUser, setIsSucsessed, setAction, setIsToolTipOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isDataChanged, setIsDataChanged] = useState(false);

  // При монтировании компонента, устанавливаем начальные значения полей
  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, true);
  }, [currentUser, resetForm]);

  // Обновляем флаг isDataChanged при изменении значений в форме
  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [values, currentUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, true);
  };

  const handleSaveClick = () => {
    setServerError('');
    if (isValid) {
      handleUpdateUser(values)
        .then(() => {
          setIsEditing(false);
          setIsSucsessed(true);
          setAction('отредактировали профиль');
          setIsToolTipOpen(true);
        })
        .catch(error => {
          setServerError(error.message);
        });
    }
  };

  const handleLogout = () => {
    onSignOut();
  };

  return (
    <main className='profile'>
      <h1 className='profile__title'>
        Привет, {currentUser.name}!
      </h1>
      <form className='profile__form'>
        <div className='profile__wrapper'>
          <label className='profile__label'>
            Имя
          </label>
          <input
            required
            minLength={2}
            maxLength={30}
            placeholder='Введите имя'
            name='name'
            type='text'
            className='profile__input'
            value={values.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <span className='profile__error'>{errors.name}</span>
        </div>
        <div className='profile__wrapper'>
          <label className='profile__label'>
            E-mail
          </label>
          <input
            required
            placeholder={currentUser.email}
            name='email'
            type='email'
            maxLength={65}
            className='profile__input profile__input_type_email'
            value={values.email || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <span className='profile__error'>{errors.email}</span>
        </div>
      </form>
      <div className='profile__button-wrapper'>
        {serverError && <span className='profile__error'>{serverError}</span>}
        {isEditing ? (
          <>
            <button
              type='button'
              className='profile__button profile__save-button'
              onClick={handleSaveClick}
              disabled={!isValid || !isDataChanged}
            >
              Сохранить
            </button>
            <button
              type='button'
              className='profile__button profile__button_red'
              onClick={handleCancelClick}
            >
              Отменить
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              className='profile__button'
              onClick={handleEditClick}
            >
              Редактировать
            </button>
            <button
              type='button'
              className='profile__button profile__button_red'
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;
