// src/components/admin/ContentCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/Admin/ContentCard.module.css';

const ContentCard = ({ title, count, icon, desc, color, link }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(link);
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconCircle} style={{ backgroundColor: color }}>
        <span className={styles.icon}>{icon}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>
        <p className={styles.count}>{count} Maudhui</p>
      </div>

      <button className={styles.viewBtn} onClick={handleView}>
        Tazama Yote →
      </button>
    </div>
  );
};

export default ContentCard;
