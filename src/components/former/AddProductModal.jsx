// src/components/farmer/AddProductModal.jsx
import React, { useState } from 'react';
import styles from '../style/farmer/AddProductModal.module.css';


const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [crop, setCrop] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!crop || !price || !location) return;
    onAdd({ crop, price: parseInt(price), location, change: '0%' });
    setCrop('');
    setPrice('');
    setLocation('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Ongeza Bidhaa Sokoni</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Jina la Zao"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Bei kwa Kg (TSh)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Eneo"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttons}>
            <button type="submit" className={styles.submitBtn}>Ongeza</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Funga</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
