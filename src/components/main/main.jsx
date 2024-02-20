import React from 'react';
import AboutMe from './about-me/about-me';
import AboutProject from './about-project/about-project';
import Portfolio from './portfolio/portfolio';
import Promo from './promo/promo';
import Techs from './techs/techs';

function Main() {
  return (
    <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main
