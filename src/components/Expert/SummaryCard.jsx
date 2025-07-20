import React from 'react';
import styles from '../style/Expert/SummaryCard.module.css';

const SummaryCard = ({ icon, label, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <h5 className={styles.label}>{label}</h5>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
