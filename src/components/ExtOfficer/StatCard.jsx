// src/components/extension/StatCard.jsx
import React from 'react';
import styles from '../style/ExtOfficer/StatCard.module.css';

const StatCard = ({ icon, label, value, color }) => {
  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <div className={styles.icon} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className={styles.info}>
        <h4>{value}</h4>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
