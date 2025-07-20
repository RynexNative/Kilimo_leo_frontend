import React from 'react';
import styles from '../style/ExtOfficer/SummaryCard.module.css';

const SummaryCard = ({ icon, label, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.details}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  );
};

export default SummaryCard;
