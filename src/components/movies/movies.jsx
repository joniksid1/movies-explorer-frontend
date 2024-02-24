import React, { useEffect, useState } from 'react';
import './movies.css';
import SearchForm from './search-form/search-form';
import MoviesCardList from './movies-card-list/movies-card-list';
import moviesApi from '../../utils/MoviesApi';
import Preloader from './preloader/preloader';
import { useResize } from '../../hooks/useResize';
import { ERROR_TEXT } from '../../utils/constants';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(0);
  const cardsToAdd = useResize(cardsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardsPerPage(12);
      } else if (width >= 768) {
        setCardsPerPage(8);
      } else if (width >= 320) {
        setCardsPerPage(5);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const moviesData = await moviesApi.getMovies();
      setMovies(moviesData);
      if (!moviesData) {
        setError('Ничего не найдено');
      }
    } catch (error) {
      console.log(error);
      setError(ERROR_TEXT);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main className='movies'>
      <SearchForm onSubmit={fetchMovies} />
      {isLoading && <Preloader />}
      {error && <div className='movies__error-wrapper'>
        <p className='movies__error-message'>
          {error}
        </p>
      </div>}
      {!isLoading && !error && movies.length > 0 && (
        <MoviesCardList
          movies={movies}
          cardsPerPage={cardsPerPage}
          cardsToAdd={cardsToAdd}
        />
      )}
    </main>
  );
}
export default Movies;
