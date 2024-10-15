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

const getUsers = async (): Promise<IUserCard[]> => {
  const res = await fetch('https://randomuser.me/api/?results=10');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await res.json();
  return formatUsersResponse(data);
};

const UsersCardsGrid = () => {
  const { data, isLoading, error } = useQuery('users', getUsers);

  if (isLoading) return <div>Loading...</div>; //TODO: make splash screen
  if (error) return <div>Error loading cards</div>; //TODO: make error screen

  return (
    <div className={styles.gridContainer}>
      {data?.map((card: IUserCard) => (
        <UserCard
          key={card.id}
          data={card.content}
        />
      ))}
    </div>
  );
};

export default UsersCardsGrid;
