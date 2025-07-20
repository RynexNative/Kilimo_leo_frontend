import React from 'react'
import { FaSeedling, FaCalendarAlt } from 'react-icons/fa';
import styles from '../style/farmer/CropCard.module.css'
function CropCard({crop}) {
    const { name, status, plantedDate, expectedHarvest } = crop;

  // Rangi kulingana na status ya zao
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'tayari kuvunwa':
        return '#388e3c'; // kijani
      case 'kwenye ukuaji':
        return '#fbc02d'; // manjano
      case 'kusubiri mvua':
        return '#e64a19'; // orange/red
      default:
        return '#757575'; // grey
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.icon}><FaSeedling /></div>
      <h3 className={styles.name}>{name}</h3>

      <span className={styles.status} style={{ backgroundColor: getStatusColor(status) }}>
        {status}
      </span>

      <div className={styles.dates}>
        <p><FaCalendarAlt className={styles.dateIcon} /> Kupandwa: {plantedDate}</p>
        <p><FaCalendarAlt className={styles.dateIcon} /> Kuvunwa: {expectedHarvest}</p>
      </div>
    </div>
  )
}

export default CropCard