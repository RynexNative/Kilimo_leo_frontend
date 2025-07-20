// src/components/extension/AlertCard.jsx
import React from 'react';
import styles from '../style/ExtOfficer/AlertCard.module.css';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const AlertCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{data.title}</h3>
      <p className={styles.message}>{data.message}</p>

      <div className={styles.details}>
        <span className={styles.region}>
          <FaMapMarkerAlt className={styles.icon} />
          {data.region}
        </span>
        <span className={styles.date}>
          <FaCalendarAlt className={styles.icon} />
          {data.date}
        </span>
      </div>
    </div>
  );
};

export default AlertCard;
