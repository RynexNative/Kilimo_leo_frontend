// src/components/farmer/BuyerList.jsx
import React, { useState } from 'react';
import BuyerCard from './BuyerCard';
import styles from '../style/farmer/BuyerList.module.css';
import AddBuyerModal from './AddBuyerModal';

const initialBuyers = [
  {
    id: 1,
    name: 'Juma Mwinyi',
    crop: 'Mahindi',
    amount: 500,
    price: 1200,
    location: 'Dodoma',
    phone: '255712345678'
  },
  {
    id: 2,
    name: 'Amina Shabani',
    crop: 'Mpunga',
    amount: 1000,
    price: 1800,
    location: 'Morogoro',
    phone: '255715678901'
  },
  {
    id: 3,
    name: 'John Peter',
    crop: 'Maharage',
    amount: 300,
    price: 2500,
    location: 'Mwanza',
    phone: '255710123456'
  }
];

const BuyerList = () => {
  const [buyers, setBuyers] = useState(initialBuyers);
  const [showModal, setShowModal] = useState(false);

  const handleAddBuyer = (buyer) => {
    setBuyers((prev) => [...prev, buyer]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Wanunuzi wa Mazao</h3>
        <button onClick={() => setShowModal(true)} className={styles.addButton}>+ Ongeza Mnunuzi</button>
      </div>
      <div className={styles.grid}>
        {buyers.map((buyer) => (
          <BuyerCard key={buyer.id} buyer={buyer} />
        ))}
      </div>
      <AddBuyerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddBuyer}
      />
    </div>
  );
};

export default BuyerList;
