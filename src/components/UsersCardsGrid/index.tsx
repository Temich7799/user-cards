import LoadingScreen from 'components/LoadingScreen';
import UserCard from 'components/UserCard';

import { useUsersCards } from './hooks';
import { IUserCard } from './types';

import styles from './styles.module.scss';

const UsersCardsGrid = () => {
  const { cards, isLoading, error } = useUsersCards();

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
