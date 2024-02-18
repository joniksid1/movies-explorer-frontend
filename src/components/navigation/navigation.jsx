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
        <ul className='navigation__list'>
          <div className='navigation__list_left'>
            <img className='navigation__logo' alt='Логотип' src={Logo} onClick={() => navigate('/')} />
            {width > 1279 && isLoggedIn && (
              <>
                <li className='navigation__list_item'>
                  <Link
                    to={'/movies'}
                    className='navigation__link'
                  >
                    Фильмы
                  </Link>
                </li>
                <li className='navigation__list_item'>
                  <Link
                    to={'/saved-movies'}
                    className='navigation__link'
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
              </>
            )}
          </div>
          <div className='navigation__list_right'>
            {width > 1279 && isLoggedIn
              ? (
                <li className='navigation__list_item'>
                  <Link
                    to={'/profile'}
                    className='navigation__link'
                  >
                    <div className='navigation__link_wrapper'>
                      <h2 className='navigation__text'>Аккаунт</h2>
                      <div className='navigation__account-logo'></div>
                    </div>
                  </Link>
                </li>
              )
              : !isLoggedIn && (
                <div className='navigation__list_wrapper navigation__list_wrapper_not-authed'>
                  <li className='navigation__list_item'>
                    <Link
                      to={'/sign-up'}
                      className='navigation__link navigation__link_signup'
                    >
                      Регистрация
                    </Link>
                  </li>
                  <li className='navigation__list_item'>
                    <Link
                      to={'/sign-in'}
                      className='navigation__link navigation__link_signin'
                    >
                      Войти
                    </Link>
                  </li>
                </div>
              )}
            {(isLoggedIn && width < 1280) && (
              <BurgerMenu handleOpen={handleBurgerMenuClick} />
            )}
          </div>
        </ul>
      </nav>
      <MenuModal
        isMenuOpen={isMenuOpen}
        onClose={hadndleMenuClose}
      />
    </>
  );
}

export default Navigation;
