import styles from '../styles/Message.module.css';

export default function Message() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <svg id='svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0'
          />
        </svg>
        <p id='p'>Hi, thanks for stopping by!</p>
      </div>
    </div>
  );
}
