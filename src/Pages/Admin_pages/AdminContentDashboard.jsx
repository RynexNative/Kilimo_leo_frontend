// src/pages/admin/AdminContentDashboard.jsx
import React from 'react';
import styles from '../../style/Admin/AdminContentDashboard.module.css';
import ContentCard from '../../components/Admin/ContentCard';
import { FaBook, FaBookDead, FaBookReader, FaChartLine, FaWarehouse } from 'react-icons/fa';

const contentTypes = [
  {
    title: 'Mafunzo',
    count: 35,
    icon: <FaBookReader />,
    desc: 'Taarifa za kitaalamu kuhusu kilimo bora',
    color: '#3b82f6',
    link: 'learning-resources',
  },
  {
    title: 'Maswali ya Wakulima',
    count: 112,
    icon: '❓',
    desc: 'Maswali yaliyoulizwa na wakulima',
    color: '#f97316',
    link: 'questions',
  },
  {
    title: 'PDF/Video Maudhui',
    count: 8,
    icon: '🎥',
    desc: 'Maudhui ya media kama Video na PDF',
    color: '#a8a29e',
    link: 'view-learning',
  },
];

const AdminContentDashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usimamizi wa Maudhui</h2>
      <p className={styles.subtitle}>Tazama aina zote za maudhui na pitia taarifa husika</p>

      <div className={styles.cardGrid}>
        {contentTypes.map((item, index) => (
          <ContentCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default AdminContentDashboard;
