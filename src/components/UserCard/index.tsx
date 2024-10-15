import { IUser } from 'ts/models';

import styles from './styles.module.scss';

type UserCardProps = { data: IUser };

const UserCard = (props: UserCardProps) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.cardTitle}>
        {props.data.name.first} {props.data.name.last}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardText}>Email: {props.data.email}</div>
        <div className={styles.cardText}>Phone: {props.data.phone}</div>
        <div className={styles.cardText}>Registered: {props.data.registered.date}</div>
      </div>
    </div>
  );
};

export default UserCard;
