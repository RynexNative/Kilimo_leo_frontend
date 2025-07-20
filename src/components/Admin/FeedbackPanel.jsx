// src/components/Admin/FeedbackPanel.jsx
import React from 'react';
import styles from '../style/Admin/FeedbackPanel.module.css';
import { FaUserCircle } from 'react-icons/fa';

const feedbacks = [
  {
    id: 1,
    name: 'Asha K.',
    role: 'Mkulima',
    message: 'Mfumo unasaidia sana, hasa kwenye kujifunza kuhusu magonjwa ya mazao.',
    date: '2025-06-20',
  },
  {
    id: 2,
    name: 'Juma M.',
    role: 'Mtaalamu',
    message: 'It would be nice to have more analytics on farmers’ questions.',
    date: '2025-06-19',
  },
  {
    id: 3,
    name: 'Mary T.',
    role: 'Ofisa Ugani',
    message: 'Ningependa kuona sehemu ya kupanga ratiba za ziara kwa wakulima.',
    date: '2025-06-18',
  },
];

const FeedbackPanel = () => {
  return (
    <div className={styles.panel}>
      <h4>Maoni ya Watumiaji</h4>
      <div className={styles.feedbackList}>
        {feedbacks.map((fb) => (
          <div className={styles.feedbackItem} key={fb.id}>
            <div className={styles.userInfo}>
              <FaUserCircle className={styles.avatar} />
              <div>
                <h5>{fb.name}</h5>
                <p className={styles.role}>{fb.role}</p>
              </div>
              <span className={styles.date}>{fb.date}</span>
            </div>
            <p className={styles.message}>{fb.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPanel;
