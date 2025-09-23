import css from './MomTipCard.module.css';
import { BabyWeekData } from '@/types/babyWeekData';

export interface MomTipCardProps {
  data: BabyWeekData;
}

const MomTipCard = ({ data }: MomTipCardProps) => {
  const tips = data.momDailyTips;
  const dayIndex = (new Date().getDay() + 6) % 7;
  const tip = tips[dayIndex];

  return (
    <div className={css.card}>
      <h2 className={css.title}>Порада для мами</h2>
      <p className={css.text}>{tip}</p>
    </div>
  );
};

export default MomTipCard;
