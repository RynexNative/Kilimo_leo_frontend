// src/pages/expert/ExpertMarket.jsx
import React, { useState } from 'react';
import styles from '../../style/Expert/ExpertMarket.module.css';
import AddPriceModal from '../../components/Expert/AddPriceModal';

const dummyPrices = [
  { id: 1, crop: 'Mahindi', price: 1200, location: 'Arusha', change: '+5%' },
  { id: 2, crop: 'Mpunga', price: 1800, location: 'Morogoro', change: '-3%' },
  { id: 3, crop: 'Maharage', price: 2500, location: 'Mbeya', change: '0%' },
  { id: 4, crop: 'Viazi', price: 950, location: 'Kilimanjaro', change: '+2%' },
];

const ExpertMarket = () => {
  const [marketData, setMarketData] = useState(dummyPrices);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = marketData.filter(item =>
    item.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPrice = (newPrice) => {
    setMarketData((prev) => [...prev, { ...newPrice, id: Date.now() }]);
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Bei ya Mazao Sokoni</h2>
        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Tafuta kwa zao..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />
          <button
            onClick={() => setShowModal(true)}
            className={styles.addBtn}
          >
            + Ongeza Bei
          </button>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Zao</th>
            <th>Bei (TSh/kg)</th>
            <th>Eneo</th>
            <th>Mabadiliko</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.crop}</td>
              <td>{item.price}</td>
              <td>{item.location}</td>
              <td
                className={
                  item.change.startsWith('+')
                    ? styles.positive
                    : item.change.startsWith('-')
                    ? styles.negative
                    : styles.neutral
                }
              >
                {item.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddPriceModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddPrice}
        />
      )}
    </div>
  );
};

export default ExpertMarket;
