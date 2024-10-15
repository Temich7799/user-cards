import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import LoadingScreen from 'components/LoadingScreen';
import UserCard from 'components/UserCard';

import { fetchUsers, IUsersResponse } from 'api/users';
import { IUser } from 'ts/models';
import { getRandomIndexesMap } from 'utils';

import styles from './styles.module.scss';

type IUserCard = {
  id: string;
  content: IUser;
};

const formatUsersResponse = (response: IUsersResponse): IUserCard[] => {
  return response.results.map((user) => ({
    id: user.login.uuid,
    content: user,
  }));
};

const getUsers = async (count: number): Promise<IUserCard[]> => {
  const response = await fetchUsers(count);
  return formatUsersResponse(response);
};

const initialCount = 10;

const replaceRandomCards = (oldCards: IUserCard[], newCards: IUserCard[]): IUserCard[] => {
  const indexesToChange = getRandomIndexesMap(newCards.length, initialCount);

  const updatedCards = oldCards.map((card, index) => {
    if (indexesToChange.has(index)) {
      return newCards.pop();
    }
    return card;
  });

  return updatedCards as IUserCard[];
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

  if (isLoading) return <LoadingScreen />;
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
