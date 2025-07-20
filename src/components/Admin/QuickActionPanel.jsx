// src/components/Admin/QuickActionPanel.jsx
import React from 'react';
import styles from '../style/Admin/QuickActionPanel.module.css';
import { FaUserPlus, FaBookOpen, FaUserTie, FaBullhorn } from 'react-icons/fa';

const actions = [
  { id: 1, label: 'Ongeza Mtumiaji', icon: <FaUserPlus />, onClick: () => alert("Add User") },
  { id: 2, label: 'Chapisha Mafunzo', icon: <FaBookOpen />, onClick: () => alert("Publish Training") },
  { id: 3, label: 'Ongeza Mtaalamu', icon: <FaUserTie />, onClick: () => alert("Add Expert") },
  { id: 4, label: 'Tuma Taarifa', icon: <FaBullhorn />, onClick: () => alert("Send Alert") },
];

const QuickActionPanel = () => {
  return (
    <div className={styles.panel}>
      <h4>Quick Actions</h4>
      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <button key={action.id} className={styles.actionBtn} onClick={action.onClick}>
            <span className={styles.icon}>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;
