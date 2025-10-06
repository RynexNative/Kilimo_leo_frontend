// src/components/Admin/QuickActionPanel.jsx
import React from 'react';
import { useNavigate} from 'react-router-dom'
import styles from '../style/Admin/QuickActionPanel.module.css';
import { FaUserPlus, FaBookOpen, FaUserTie, FaBullhorn } from 'react-icons/fa';

const actions = [
  { id: 1, label: 'Ongeza Mtumiaji', icon: <FaUserPlus />, link: '/admin/users' },
  { id: 2, label: 'Chapisha Mafunzo', icon: <FaBookOpen />, link: '/admin/content' },
  { id: 3, label: 'Ongeza Mtaalamu', icon: <FaUserTie />, link:'/admin/users' },
  { id: 4, label: 'Tuma Taarifa', icon: <FaBullhorn />, onClick: () => alert("Samahani Huduma hii Bado haija wezeshwa") },
];

const QuickActionPanel = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.panel}>
      <h4>Quick Actions</h4>
      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <button key={action.id} className={styles.actionBtn} onClick={()=>navigate(action.link)}>
            <span className={styles.icon}>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;
