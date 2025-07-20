// src/components/farmer/AddCropModal.jsx
import React, { useState } from 'react';
import styles from '../style/farmer/AddCropModal.module.css';

const AddCropModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Kwenye Ukuaji');
  const [plantedDate, setPlantedDate] = useState('');
  const [expectedHarvest, setExpectedHarvest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCrop = {
      id: Date.now(),
      name,
      status,
      plantedDate,
      expectedHarvest,
    };
    onAdd(newCrop);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Ongeza Zao Jipya</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Jina la Zao:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label>
            Hali ya Zao:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Kwenye Ukuaji</option>
              <option>Tayari Kuvunwa</option>
              <option>Kusubiri Mvua</option>
            </select>
          </label>

          <label>
            Tarehe ya Kupanda:
            <input type="date" value={plantedDate} onChange={(e) => setPlantedDate(e.target.value)} required />
          </label>

          <label>
            Tarehe ya Kuvuna:
            <input type="date" value={expectedHarvest} onChange={(e) => setExpectedHarvest(e.target.value)} required />
          </label>

          <div className={styles.actions}>
            <button type="submit" className={styles.addButton}>Ongeza</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Ghairi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCropModal;
