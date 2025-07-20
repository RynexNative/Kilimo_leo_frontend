// src/components/Admin/RecentActivityPanel.jsx
import React from 'react';
import styles from '../style/Admin/RecentActivityPanel.module.css';

const activities = [
  { id: 1, message: 'Asha K. ameongeza zao jipya (Mpunga)', time: 'Dakika 10 zilizopita' },
  { id: 2, message: 'Expert Musa D. amejibu swali la mkulima', time: 'Saa 1 iliyopita' },
  { id: 3, message: 'Mafunzo mapya ya “Kilimo Hai” yamechapishwa', time: 'Leo asubuhi' },
];

const RecentActivityPanel = () => {
  return (
    <div className={styles.panel}>
      <h4>Shughuli za Hivi Karibuni</h4>
      <ul className={styles.list}>
        {activities.map((item) => (
          <li key={item.id}>
            <p>{item.message}</p>
            <span className={styles.time}>{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityPanel;
