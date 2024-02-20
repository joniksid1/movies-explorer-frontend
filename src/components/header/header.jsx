import React from 'react';
import { useLocation } from "react-router-dom";
import './header.css';
import Navigation from '../navigation/navigation';

function Header({ isLoggedIn }) {
  const location = useLocation();
  const isHeaderWhite = ['/profile', '/movies','/saved-movies'].includes(location.pathname);

  return (
    <header className={isHeaderWhite ? 'header header_white' : 'header'}>
      <Navigation
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Header;
