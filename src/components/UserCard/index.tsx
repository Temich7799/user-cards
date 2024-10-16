import { IUser } from 'ts/models';
import { getRandomColor } from 'utils/colors';

import styles from './styles.module.scss';

type UserCardProps = { data: IUser };

const UserCard = ({ data }: UserCardProps) => {
  const backgroundColor = getRandomColor();

  return (
    <div
      className={styles.userCard}
      style={{ backgroundColor }}
    >
      <div className={styles.cardHeader}>
        <h2>{`${data.name.first} ${data.name.last}`}</h2>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardDetails}>
          <p>{data.location.city}</p>
          <p>{data.phone}</p>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardPhoto}>
          <img
            src={data.picture.large}
            alt={data.name.first}
          />
        </div>
        <button className={styles.viewButton}>View</button>
      </div>
    </div>
  );
};

export default UserCard;
