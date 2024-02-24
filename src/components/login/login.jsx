import React from 'react';
import Logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onLogin(values.password, values.email);
    }
  };

  return (
    <div className='register'>
      <form className='register__form' name='login' noValidate>
        <img className='register__logo' src={Logo} alt='Логотип' onClick={() => navigate('/')} />
        <h1 className='register__title'>Рады видеть!</h1>
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
            onChange={handleChange}
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
            minLength={6}
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className='register__input-error'>{errors.password}</span>
        </div>
        <div className='register__wrapper register__wrapper_type_button'>
          <button
            className='register__button'
            type='submit'
            onClick={handleSubmit}
            disabled={!isValid}
            >
            Войти
          </button>
          <p className='register__caption'>
            Ещё не зарегистрированы?
            <Link to='/sign-up' className='register__link'>
              {' '}
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
