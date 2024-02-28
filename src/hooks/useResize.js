import { useEffect, useState } from 'react';
import {
  DESKTOP_WIDTH,
  TABLET_WIDTH,
  MOBILE_WIDTH,
  MOBILE_TABLET_CARDS_TO_ADD,
  DESKTOP_CARDS_TO_ADD,
} from '../utils/constants';

export const useResize = (cardsPerPage) => {
  const [cardsToAdd, setCardsToAdd] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= MOBILE_WIDTH && width < TABLET_WIDTH) {
        setCardsToAdd(MOBILE_TABLET_CARDS_TO_ADD);
      } else if (width >= TABLET_WIDTH && width < DESKTOP_WIDTH) {
        setCardsToAdd(MOBILE_TABLET_CARDS_TO_ADD);
      } else if (width >= DESKTOP_WIDTH) {
        setCardsToAdd(DESKTOP_CARDS_TO_ADD);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardsPerPage]);

  return cardsToAdd;
};
