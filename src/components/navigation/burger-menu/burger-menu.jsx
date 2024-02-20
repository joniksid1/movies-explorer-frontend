import React from "react";
import './burger-menu.css';

function BurgerMenu({ handleOpen }) {
  return (
    <div
      className='burger-menu'
      type='button'
      onClick={handleOpen}
    >
      <div className='burger-menu__line' />
      <div className='burger-menu__line' />
      <div className='burger-menu__line' />
    </div>
  );
}

export default BurgerMenu;
