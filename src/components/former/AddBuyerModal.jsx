// src/components/farmer/AddBuyerModal.jsx
import React, { useState } from 'react';
import styles from '../style/farmer/AddBuyerModal.module.css';

const AddBuyerModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [crop, setCrop] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !crop || !amount || !price || !location || !phone) return;
    onAdd({ id: Date.now(), name, crop, amount, price, location, phone });
    setName('');
    setCrop('');
    setAmount('');
    setPrice('');
    setLocation('');
    setPhone('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Ongeza Mnunuzi</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Jina Kamili" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Aina ya Zao" value={crop} onChange={(e) => setCrop(e.target.value)} className={styles.input} />
          <input type="number" placeholder="Kiasi (kg)" value={amount} onChange={(e) => setAmount(e.target.value)} className={styles.input} />
          <input type="number" placeholder="Bei (TSh/kg)" value={price} onChange={(e) => setPrice(e.target.value)} className={styles.input} />
          <input type="text" placeholder="Eneo" value={location} onChange={(e) => setLocation(e.target.value)} className={styles.input} />
          <input type="tel" placeholder="Namba ya Simu" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} />
          <div className={styles.buttons}>
            <button type="submit" className={styles.submitBtn}>Ongeza</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Funga</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBuyerModal;
