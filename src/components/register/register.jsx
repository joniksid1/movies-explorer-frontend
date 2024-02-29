import React, { useState } from 'react';
import './register.css';
import Logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { validateEmail } from '../../utils/validateEmail';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      setIsLoading(true);
      onRegister(values.name, values.password, values.email)
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className='register'>
      <form className='register__form' name='login' noValidate onSubmit={handleSubmit}>
        <img className='register__logo' src={Logo} alt='Логотип' onClick={() => navigate('/')} />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <div className='register__wrapper register__wrapper_type_input'>
          <label className='register__label'>
            Имя
          </label>
          <input
            name='name'
            type='text'
            minLength={2}
            className='register__input register__input_type_name'
            required={true}
            value={values.name || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span className='register__input-error'>{errors.name}</span>
        </div>
        <div className='register__wrapper register__wrapper_type_input'>
          <label className='register__label'>
            E-mail
          </label>
          <input
            name='email'
            type='email'
            className='register__input register__input_type_email'
            required={true}
            value={values.email || ''}
            onChange={(event) => {
              handleChange(event);
              const isValidEmail = validateEmail(event.target.value);
              setIsValid(isValidEmail);
            }}
            disabled={isLoading}
          />
          <span className='register__input-error'>{errors.email}</span>
        </div>
        <div className='register__wrapper register__wrapper_type_input'>
          <label className='register__label'>
            Пароль
          </label>
          <input
            name='password'
            type='password'
            className='register__input register__input_type_password'
            required={true}
            minLength={5}
            value={values.password || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span className='register__input-error'>{errors.password}</span>
        </div>
        <div className='register__wrapper register__wrapper_type_button register__wrapper_type_register'>
          <button
            className='register__button'
            type='submit'
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <p className='register__caption'>
            Уже зарегистрированы?
            <Link to='/sign-in' className='register__link'>
              {' '}
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
