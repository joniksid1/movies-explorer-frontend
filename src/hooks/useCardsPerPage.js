import { useEffect, useState } from 'react';
import {
  LAPTOP_FILMS_AMOUNT,
  TABLET_FILMS_AMOUNT,
  MOBILE_FILMS_AMOUNT,
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  MOBILE_WIDTH,
} from '../utils/constants';

export function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= DESKTOP_WIDTH) {
        setCardsPerPage(LAPTOP_FILMS_AMOUNT);
      } else if (width >= TABLET_WIDTH) {
        setCardsPerPage(TABLET_FILMS_AMOUNT);
      } else if (width >= MOBILE_WIDTH) {
        setCardsPerPage(MOBILE_FILMS_AMOUNT);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return cardsPerPage;
}
