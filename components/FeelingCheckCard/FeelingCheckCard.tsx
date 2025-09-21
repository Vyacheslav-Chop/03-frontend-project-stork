'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/useAuthStore';
import styles from './FeelingCheckCard.module.css';
import React, { FC } from 'react';

const FeelingCheckCard: FC = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      console.log('Open feeling check modal for authorized user');
    } else {
      router.push('/auth/signin');
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.question}>Як ти себе почуваєш сьогодні?</h3>
      <p className={styles.recommendation}>
        Заплануй свою ідеальну рутину, щоб бути продуктивним і щасливим.
      </p>
      <button onClick={handleButtonClick} className={styles.button}>
        Запланувати
      </button>
    </div>
  );
};

export default FeelingCheckCard;
