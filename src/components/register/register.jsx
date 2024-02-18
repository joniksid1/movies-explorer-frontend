import React from 'react';
import './register.css'
import Logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onRegister }) => {
  const navigate = useNavigate();

  const [nameValue, setNameValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(passwordValue, emailValue);
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  return (
    <div className='register'>
      <form className='register__form' name='login' noValidate>
        <img className='navigation__logo navigation__logo_type_register' src={Logo} alt='Логотип' onClick={() => navigate('/')} />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <div className="register__wrapper register__wrapper_type_input">
          <label className='register__label'>
            Имя
          </label>
          <input
            name="name"
            type="text"
            className="register__input register__input_type_name"
            required="true"
            value={nameValue ?? ''}
            onChange={handleNameChange}
          />
          <span
            className="register__input-error register__input-error_type_email"
          />
        </div>
        <div className="register__wrapper register__wrapper_type_input">
          <label className='register__label'>
            E-mail
          </label>
          <input
            name="email"
            type="email"
            className="register__input register__input_type_email"
            required="true"
            value={emailValue ?? ''}
            onChange={handleEmailChange}
          />
          <span
            className="register__input-error register__input-error_type_email"
          />
        </div>
        <div className="register__wrapper register__wrapper_type_input">
          <label className='register__label'>
            Пароль
          </label>
          <input
            name="password"
            type="password"
            className="register__input register__input_type_password"
            required="true"
            minLength={6}
            value={passwordValue ?? ''}
            onChange={handlePasswordChange}
          />
          <span
            className="register__input-error register__input-error_type_password"
          />
        </div>
        <div className='register__wrapper register__wrapper_type_button register__wrapper_type_register'>
          <button
            className="register__button"
            type='submit'
            onClick={handleSubmit}>
            Зарегистрироваться
          </button>
          <p className="register__caption">
            Уже зарегистрированы?
            <Link to="/sign-in" className="register__caption register__link">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
