import React from 'react';
import './header.css';
import Navigation from '../navigation/navigation';

function Header({ isLoggedIn, setIsMenuOpen, isHeaderWhite }) {

  return (
    <header className={isHeaderWhite ? 'header header_white' : 'header'}>
      <Navigation
        isLoggedIn={isLoggedIn}
        setIsMenuOpen={setIsMenuOpen}
      />
    </header>
  );
}

export default Header;
