import { useEffect, useState } from 'react';

export const useResize = (cardsPerPage) => {
  const [cardsToAdd, setCardsToAdd] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 320 && width < 768) {
        setCardsToAdd(2);
      } else {
        setCardsToAdd(cardsPerPage);
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
