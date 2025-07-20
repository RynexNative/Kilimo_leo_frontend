// src/components/Admin/AdminSummaryCard.jsx
import React from 'react';
import styles from '../style/Admin/AdminSummaryCard.module.css';

const AdminSummaryCard = ({ icon, label, value }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
      </div>
    </div>
  );
};

export default AdminSummaryCard;
