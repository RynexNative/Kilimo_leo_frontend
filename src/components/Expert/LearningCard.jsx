// src/components/expert/LearningCard.jsx
import React from 'react';
import styles from '../style/Expert/LearningCard.module.css';
import { FaBookOpen } from 'react-icons/fa';

const LearningCard = ({ lesson, onView }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>{lesson.title}</h4>
        <span className={styles.date}>{lesson.date}</span>
      </div>

      <p className={styles.cropType}>Zao: <strong>{lesson.cropType}</strong></p>

      <p className={styles.excerpt}>
        {lesson.content.length > 100
          ? lesson.content.slice(0, 100) + '...'
          : lesson.content}
      </p>

      <button className={styles.viewBtn} onClick={onView}>
        <FaBookOpen /> Soma Zaidi
      </button>
    </div>
  );
};

export default LearningCard;
