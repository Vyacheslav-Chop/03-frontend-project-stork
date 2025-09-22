import styles from './BabyTodayCard.module.css';
import { BabyWeekData } from '@/types/babyWeekData';

interface Props {
  data: BabyWeekData;
}

export default function BabyTodayCard({ data }: Props) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Малюк сьогодні</h2>

        <div className={styles.content}>
          {/* Левая колонка */}
          <div className={styles.imageBlock}>
            <img src={data.image} alt={`Тиждень ${data.weekNumber}`} />
          </div>

          {/* Правая колонка */}
          <div className={styles.infoBlock}>
            <p>
              <strong>Розмір:</strong> {data.babySize}
            </p>
            <p>
              <strong>Вага:</strong> {data.babyWeight}
            </p>
            <p>
              <strong>Активність:</strong> {data.babyActivity}
            </p>
          </div>
        </div>

        {/* Текст снизу */}
        <p className={styles.development}>{data.babyDevelopment}</p>
      </div>
    </section>
  );
}
