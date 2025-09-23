'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/useAuthStore';
import styles from './FeelingCheckCard.module.css';
// import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';

// ----- !!! Dummy modal для тесту! ----- //
const DummyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    style={{
      position: 'fixed',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      background: '#fff4f6',
      padding: '40px 24px',
      borderRadius: '24px',
      boxShadow: '0 2px 32px #ffe1ea',
    }}
  >
    <div style={{ marginBottom: 16 }}>Тестове модальне вікно. після тестування - видалити!</div>
    <button
      onClick={onClose}
      style={{ borderRadius: 16, padding: '8px 18px', border: 'none', background: '#ffcbd3' }}
    >
      Закрити
    </button>
  </div>
);
// ----- кінець Dummy modal для тесту ----- //

const FeelingCheckCard: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.textContainer}>
        <h3 className={styles.question}>Як ви себе почуваєте?</h3>
        <div className={styles.recommendation}>
          <span className={styles.recommendationHeading}>Рекомендація на сьогодні:</span>
          <span className={styles.recommendationText}>Занотуйте незвичні відчуття у тілі.</span>
        </div>
      </div>
      <button onClick={handleButtonClick} className={styles.button}>
        Зробити запис у щоденник
      </button>

      {/* // ----- Dummy modal для тесту! ----- // */}
      {isLoggedIn && isModalOpen && <DummyModal onClose={() => setIsModalOpen(false)} />}
      {/* // ----- кінець Dummy modal для тесту ----- // */}

      {/* {isLoggedIn && isModalOpen && <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );
};

export default FeelingCheckCard;
