// src/components/Admin/SystemLogPanel.jsx
import React from 'react';
import styles from '../style/Admin/SystemLogPanel.module.css';

const logs = [
  { id: 1, type: 'Login', message: 'Admin aliingia kwenye mfumo', time: '2025-06-22 10:24 AM' },
  { id: 2, type: 'Update', message: 'Expert Musa alisasisha mafunzo ya kilimo hai', time: '2025-06-21 03:12 PM' },
  { id: 3, type: 'Error', message: 'Jaribio la kuingia na neno siri batili', time: '2025-06-21 02:45 PM' },
  { id: 4, type: 'Logout', message: 'Extension Officer alitoka kwenye mfumo', time: '2025-06-20 05:30 PM' },
];

const SystemLogPanel = () => {
  return (
    <div className={styles.panel}>
      <h4>Rekodi za Mfumo</h4>
      <ul className={styles.logList}>
        {logs.map((log) => (
          <li key={log.id} className={`${styles.logItem} ${styles[log.type.toLowerCase()]}`}>
            <div className={styles.logHeader}>
              <span className={styles.logType}>{log.type}</span>
              <span className={styles.logTime}>{log.time}</span>
            </div>
            <p className={styles.logMessage}>{log.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemLogPanel;
