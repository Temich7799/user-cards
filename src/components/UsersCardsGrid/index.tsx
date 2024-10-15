import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import UserCard from 'components/UserCard';

import { IUserCard, IUsersResponse } from 'ts/models';

import styles from './styles.module.scss';

const formatUsersResponse = (response: IUsersResponse): IUserCard[] => {
  return response.results.map((user) => ({
    id: user.login.uuid,
    content: user,
  }));
};

const getRandomIndexesMap = (count: number) => {
  const indexesMap = new Map<number, number>();
  while (indexesMap.size < count) {
    const randomIndex = Math.floor(Math.random() * count);
    indexesMap.set(randomIndex, randomIndex);
  }
  return indexesMap;
};

const replaceRandomCards = (oldCards: IUserCard[], newCards: IUserCard[]): IUserCard[] => {
  const indexesToChange = getRandomIndexesMap(newCards.length);

  const updatedCards = oldCards.map((card, index) => {
    if (indexesToChange.has(index)) {
      return newCards.pop();
    }
    return card;
  });

  return updatedCards as IUserCard[];
};

const initialCount = 10;

const getUsers = async (count: number = initialCount): Promise<IUserCard[]> => {
  const res = await fetch('https://randomuser.me/api/?results=' + count);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return formatUsersResponse(data);
};

const UsersCardsGrid = () => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cards</div>;

  return (
    <div className={styles.gridContainer}>
      {cards.map((card: IUserCard) => (
        <UserCard
          key={card.id}
          data={card.content}
        />
      ))}
    </div>
  );
};

export default UsersCardsGrid;
