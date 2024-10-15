import styles from './styles.module.scss';

const LoadingScreen = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.loadingText}>Loading...</p>
  </div>
);

export default LoadingScreen;
