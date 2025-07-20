// src/components/expert/QuestionCard.jsx
import React from 'react';
import styles from '../style/Expert/QuestionCard.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const QuestionCard = ({ data, onRespond }) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.farmerInfo}>
          <h4>{data.farmerName}</h4>
          <p className={styles.location}>{data.location}</p>
        </div>
        <div className={styles.status}>
          {data.answered ? (
            <span className={`${styles.answered}`}>
              <FaCheckCircle /> Limejibiwa
            </span>
          ) : (
            <span className={`${styles.unanswered}`}>
              <FaTimesCircle /> Haliujibiwa
            </span>
          )}
        </div>
      </div>

      <p className={styles.question}>{data.question}</p>

      {data.image && (
        <div className={styles.imagePreview}>
          <img src={data.image} alt="Shida ya mazao" />
        </div>
      )}

      {!data.answered && (
        <button className={styles.respondBtn} onClick={onRespond}>
          Jibu Swali
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
