'use client';

import styles from './FeelingCheckCard.module.css';
import React, { FC } from 'react';

interface FeelingCheckCardProps {
  onButtonClick: () => void;
}

const FeelingCheckCard: FC<FeelingCheckCardProps> = ({ onButtonClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textContainer}>
        <h3 className={styles.question}>Як ви себе почуваєте?</h3>
        <div className={styles.recommendation}>
          <span className={styles.recommendationHeading}>Рекомендації на сьогодні:</span>
          <span className={styles.recommendationText}>Занотуйте незвичні відчуття у тілі.</span>
        </div>
      </div>

      <button onClick={onButtonClick} className={styles.button}>
        Зробити запис у щоденник
      </button>
    </div>
  );
};

export default FeelingCheckCard;
