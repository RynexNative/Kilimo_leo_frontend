// src/components/expert/AddWeatherTipModal.jsx
import React, { useState } from 'react';
import styles from '../style/Expert/AddWeatherTipModal.module.css';

const AddWeatherTipModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const newTip = {
      ...formData,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };

    onAdd(newTip);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Ongeza Tip ya Hali ya Hewa</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Kichwa cha Tip"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <textarea
            name="content"
            placeholder="Maelezo ya Tip..."
            value={formData.content}
            onChange={handleChange}
            className={styles.textarea}
            required
          />

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Funga
            </button>
            <button type="submit" className={styles.submitBtn}>
              Hifadhi Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWeatherTipModal;
