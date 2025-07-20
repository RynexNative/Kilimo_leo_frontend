// src/components/expert/AddPriceModal.jsx
import React, { useState } from 'react';
import styles from '../style/Expert/AddPriceModal.module.css';

const AddPriceModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    crop: '',
    price: '',
    location: '',
    change: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.crop || !formData.price || !formData.location) return;

    onAdd(formData);
    onClose();
    setFormData({ crop: '', price: '', location: '', change: '' });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Ongeza Bei ya Zao</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="crop"
            placeholder="Jina la Zao"
            value={formData.crop}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Bei (TSh/kg)"
            value={formData.price}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Eneo"
            value={formData.location}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="change"
            placeholder="Mabadiliko (km +5% au -2%)"
            value={formData.change}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Funga
            </button>
            <button type="submit" className={styles.submitBtn}>
              Hifadhi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPriceModal;
