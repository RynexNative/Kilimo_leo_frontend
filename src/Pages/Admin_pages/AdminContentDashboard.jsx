// src/pages/admin/AdminContentDashboard.jsx
import React from 'react';
import styles from '../../style/Admin/AdminContentDashboard.module.css';
import ContentCard from '../../components/Admin/ContentCard';

const contentTypes = [
  {
    title: 'Mafunzo',
    count: 35,
    icon: '📚',
    desc: 'Taarifa za kitaalamu kuhusu kilimo bora',
    color: '#3b82f6',
    link: '/admin/content/learning-resources',
  },
  {
    title: 'Vidokezo vya Hali ya Hewa',
    count: 15,
    icon: '🌤️',
    desc: 'Ushauri wa hali ya hewa kwa wakulima',
    color: '#38bdf8',
    link: '/admin/content/weather-tips',
  },
  {
    title: 'Vidokezo vya Kilimo',
    count: 22,
    icon: '🌾',
    desc: 'Miongozo ya kilimo bora na ufanisi',
    color: '#22c55e',
    link: '/admin/content/farming-tips',
  },
  {
    title: 'Maswali ya Wakulima',
    count: 112,
    icon: '❓',
    desc: 'Maswali yaliyoulizwa na wakulima',
    color: '#f97316',
    link: '/admin/content/farmer-questions',
  },
  {
    title: 'PDF/Video Maudhui',
    count: 8,
    icon: '🎥',
    desc: 'Maudhui ya media kama Video na PDF',
    color: '#a8a29e',
    link: '/admin/content/media',
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
