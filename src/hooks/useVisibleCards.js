import { useState, useEffect } from 'react';

export const useVisibleCards = (cardsToAdd, cardsPerPage) => {
  const [visibleCards, setVisibleCards] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (cardsPerPage > 0 && !isReady) {
      setVisibleCards(cardsPerPage);
      setIsReady(true);
    }
  }, [cardsPerPage, isReady]);

  const handleShowMoreClick = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + cardsToAdd);
  };

  return { visibleCards, handleShowMoreClick };
};
