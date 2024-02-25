import { useEffect, useState } from 'react';

export function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(0);

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

  return cardsPerPage;
}
