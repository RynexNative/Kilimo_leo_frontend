// src/components/extension/AddAlertModal.jsx
import React, { useState } from 'react';
import styles from '../style/ExtOfficer/AddAlertModal.module.css';

const AddAlertModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    date: '',
    region: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.message && formData.date && formData.region) {
      onAdd(formData);
      onClose();
      setFormData({ title: '', message: '', date: '', region: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Ongeza Tahadhari Mpya</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Kichwa cha Tahadhari"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Ujumbe wa tahadhari..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />
          <input
            type="text"
            name="region"
            placeholder="Mkoa unaohusika"
            value={formData.region}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Ghairi
            </button>
            <button type="submit" className={styles.submitBtn}>
              Tuma Tahadhari
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlertModal;
