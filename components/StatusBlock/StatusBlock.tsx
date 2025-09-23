import { BabyWeekDataResponse } from '@/types/babyWeekData';
import styles from './StatusBlock.module.css';

type StatusBlockProps = Pick<BabyWeekDataResponse, 'weekNumber' | 'daysToBirth'>;

const StatusBlock = ({ weekNumber, daysToBirth }: StatusBlockProps) => {
  return (
    <section className={styles.statusBlock}>
      <div className={styles.item}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{weekNumber}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>{daysToBirth}</p>
      </div>
    </section>
  );
};

export default StatusBlock;
