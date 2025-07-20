// src/pages/expert/ExpertWeatherTips.jsx
import React, { useState } from 'react';
import styles from '../../style/Expert/ExpertWeatherTips.module.css';
import AddWeatherTipModal from '../../components/Expert/AddWeatherTipModal';

const dummyTips = [
  {
    id: 1,
    title: 'Epuka kunyunyizia mimea wakati wa jua kali',
    content: 'Kunyunyizia mimea wakati wa jua kali husababisha maji kuyeyuka haraka...',
    date: '2025-06-18',
  },
  {
    id: 2,
    title: 'Fuatilia hali ya mvua kabla ya kupanda',
    content: 'Kupanda kabla ya msimu wa mvua unaweza kusababisha mazao kufa mapema...',
    date: '2025-06-15',
  },
];

const ExpertWeatherTips = () => {
  const [tips, setTips] = useState(dummyTips);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filteredTips = tips.filter(tip =>
    tip.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTip = (newTip) => {
    setTips(prev => [...prev, { ...newTip, id: Date.now() }]);
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Vidokezo vya Hali ya Hewa</h2>
        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Tafuta tip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />
          <button onClick={() => setShowModal(true)} className={styles.addBtn}>
            + Ongeza Tip
          </button>
        </div>
      </div>

      <div className={styles.tipList}>
        {filteredTips.map((tip) => (
          <div key={tip.id} className={styles.tipCard}>
            <h4>{tip.title}</h4>
            <span className={styles.date}>{tip.date}</span>
            <p>{tip.content.length > 100 ? tip.content.slice(0, 100) + '...' : tip.content}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <AddWeatherTipModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddTip}
        />
      )}
    </div>
  );
};

export default ExpertWeatherTips;
