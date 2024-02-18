import React, { useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import './app.css';
import Header from '../header/header';
import Main from '../main/main';
import Movies from '../movies/movies';
import SavedMovies from '../saved-movies/saved-movies';
import Profile from '../profile/profile';
import Login from '../login/login';
import Register from '../register/register';
import Footer from '../footer/footer';
import NotFound from '../not-found/not-found';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isHeaderVisible = ['/','/movies','/saved-movies','/profile'].includes(location.pathname);
  const isFooterVisible = ['/', '/movies','/saved-movies'].includes(location.pathname);

  return (
    <>
      {isHeaderVisible && <Header isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route path={'/movies'} element={<Movies/>} />
        <Route path={'/saved-movies'} element={<SavedMovies/>} />
        <Route path={'/profile'} element={<Profile/>} />
        <Route path={'/sign-in'} element={<Login/>} />
        <Route path={'/sign-up'} element={<Register/>} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
      {isFooterVisible && <Footer />}
    </>
  );
}

export default App
