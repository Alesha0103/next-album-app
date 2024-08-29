import styles from './globals.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingPage;