import { IUser } from 'ts/models';

import styles from './styles.module.scss';

type UserCardProps = { data: IUser };

const UserCard = (props: UserCardProps) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.cardPhoto}>
        <img
          src={props.data.picture.large}
          alt={props.data.name.first}
        />
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardText}>
          {props.data.name.first} {props.data.name.last}
        </p>
        <p className={styles.cardText}>Phone: {props.data.phone}</p>
      </div>
    </div>
  );
};

export default UserCard;
