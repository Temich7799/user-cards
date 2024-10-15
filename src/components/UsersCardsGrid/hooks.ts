import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { IUserCard } from './types';
import { getUsers, initialCount, replaceRandomCards } from './utils';

export const useUsersCards = () => {
  const { current } = useRef({
    count: initialCount,
  });

  const [cards, setCards] = useState<IUserCard[]>([]);

  const onSuccessHandler = useCallback(
    (newData: IUserCard[]) => {
      if (cards.length > 0) setCards(replaceRandomCards(cards, newData));
      else setCards(newData);
    },
    [cards]
  );

  const { isLoading, error, refetch } = useQuery('users', () => getUsers(current.count), {
    onSuccess: onSuccessHandler,
  });

  useEffect(() => {
    const timerId = setTimeout(async () => {
      try {
        current.count = Math.floor(Math.random() * 9) + 1;
        refetch();
      } catch (err) {
        console.error('Error fetching new users:', err);
      }
    }, 3000);

    return () => clearTimeout(timerId);
  }, [refetch, current, cards]);

  return { cards, isLoading, error };
};
