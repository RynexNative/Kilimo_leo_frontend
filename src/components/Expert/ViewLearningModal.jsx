// src/components/expert/ViewLearningModal.jsx
import React from 'react';
import styles from '../style/Expert/ViewLearningModal.module.css';
import { FaTimes } from 'react-icons/fa';

const ViewLearningModal = ({ lesson, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{lesson.title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <p className={styles.meta}>
          <strong>Tarehe:</strong> {lesson.date} | <strong>Zao:</strong> {lesson.cropType}
        </p>

        <div className={styles.content}>
          {lesson.content}
        </div>
      </div>
    </div>
  );
};

export default ViewLearningModal;
