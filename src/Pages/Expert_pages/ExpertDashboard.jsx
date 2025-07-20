// src/pages/expert/ExpertDashboard.jsx
import React from 'react';
import styles from '../../style/Expert/ExpertDashboard.module.css';
import { FaUserFriends, FaClipboardList, FaCloudSun, FaLeaf } from 'react-icons/fa';

const ExpertDashboard = () => {
  const stats = [
    {
      icon: <FaUserFriends />,
      label: 'Maswali Yote',
      value: 152,
      color: '#40916c',
    },
    {
      icon: <FaClipboardList />,
      label: 'Maswali Yaliyojibiwa',
      value: 117,
      color: '#1b4332',
    },
    {
      icon: <FaCloudSun />,
      label: 'Weather Tips',
      value: 32,
      color: '#2d6a4f',
    },
    {
      icon: <FaLeaf />,
      label: 'Mafunzo',
      value: 12,
      color: '#52b788',
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard ya Mtaalamu wa Kilimo</h2>
      <div className={styles.statsGrid}>
        {stats.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon} style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <div className={styles.info}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertDashboard;
