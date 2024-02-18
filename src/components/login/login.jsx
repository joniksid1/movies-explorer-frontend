import React from 'react';
import Logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(passwordValue, emailValue);
  }

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  }

  return (
    <div className='register'>
      <form className='register__form' name='login' noValidate>
        <img className='navigation__logo navigation__logo_type_register' src={Logo} alt='Логотип' onClick={() => navigate('/')} />
        <h1 className='register__title'>Рады видеть!</h1>
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
        <div className='register__wrapper register__wrapper_type_button'>
          <button
            className="register__button"
            type='submit'
            onClick={handleSubmit}>
            Войти
          </button>
          <p className="register__caption">
            Ещё не зарегистрированы?
            <Link to="/sign-up" className="register__caption register__link">
              {" "}
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
