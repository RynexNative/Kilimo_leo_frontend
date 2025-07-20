// src/components/farmer/WeatherTip.jsx
import React from 'react';
import styles from '../style/farmer/WeatherTips.module.css';
import { FaCloudRain, FaSun, FaLeaf, FaExclamationTriangle } from 'react-icons/fa';

const weatherIcons = {
  Sunny: <FaSun className={styles.icon} />,
  Rainy: <FaCloudRain className={styles.icon} />,
  Windy: <FaLeaf className={styles.icon} />,
  Stormy: <FaExclamationTriangle className={styles.icon} />,
};

const WeatherTip = ({ weather = 'Sunny', tip = 'Panda mazao yanayostahimili joto kali.' }) => {
  const icon = weatherIcons[weather] || <FaLeaf className={styles.icon} />;

  return (
    <div className={styles.card}>
      {icon}
      <div className={styles.content}>
        <h4 className={styles.weather}>{weather}</h4>
        <p className={styles.tip}>{tip}</p>
      </div>
    </div>
  );
};

export default WeatherTip;
