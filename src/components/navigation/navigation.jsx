import React from "react";
import Logo from '../../images/logo.svg';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navigation.css';
import BurgerMenu from './burger-menu/burger-menu';
import MenuModal from "./menu-modal/menu-modal";

function Navigation({ isLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBurgerMenuClick = () => {
    setIsMenuOpen(true);
  };

  const hadndleMenuClose = () => {
    setIsMenuOpen(false);
  }

  return (
    <>
      <nav className='navigation'>
        <ul className='navigation__list navigation__list_left'>
          <li className='navigation__list-item'>
            <img className='navigation__logo' alt='Логотип' src={Logo} onClick={() => navigate('/')} />
          </li>
          {width > 1279 && isLoggedIn && (
            <>
              <li className='navigation__list-item'>
                <Link
                  to={'/movies'}
                  className='navigation__link'
                >
                  Фильмы
                </Link>
              </li>
              <li className='navigation__list-item'>
                <Link
                  to={'/saved-movies'}
                  className='navigation__link'
                >
                  Сохранённые фильмы
                </Link>
              </li>
            </>
          )}
        </ul>
        {width > 1279 && isLoggedIn
          ? (
            <ul className='navigation__list navigation__list_right'>
              <li className='navigation__list-item'>
                <Link
                  to={'/profile'}
                  className='navigation__link'
                >
                  <div className='navigation__link-wrapper'>
                    <h2 className='navigation__text'>Аккаунт</h2>
                    <div className='navigation__account-logo'></div>
                  </div>
                </Link>
              </li>
            </ul>
          )
          : !isLoggedIn && (
            <ul className='navigation__list navigation__list_right'>
              <li className='navigation__list-item'>
                <Link
                  to={'/sign-up'}
                  className='navigation__link navigation__link_signup'
                >
                  Регистрация
                </Link>
              </li>
              <li className='navigation__list-item'>
                <Link
                  to={'/sign-in'}
                  className='navigation__link navigation__link_signin'
                >
                  Войти
                </Link>
              </li>
            </ul>
          )}
        {(isLoggedIn && width < 1280) && (
          <BurgerMenu handleOpen={handleBurgerMenuClick} />
        )}
      </nav>
      <MenuModal
        isMenuOpen={isMenuOpen}
        onClose={hadndleMenuClose}
      />
    </>
  );
}

export default Navigation;
