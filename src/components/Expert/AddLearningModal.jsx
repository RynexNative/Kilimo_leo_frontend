// src/components/expert/AddLearningModal.jsx
import React, { useState } from 'react';
import styles from '../style/Expert/AddLearningModal.module.css';

const AddLearningModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    cropType: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.cropType || !formData.content) return;

    const newLesson = {
      ...formData,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    onAdd(newLesson);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Ongeza Funzo Jipya</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Kichwa cha somo"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <input
            type="text"
            name="cropType"
            placeholder="Aina ya zao (mf. Mahindi)"
            value={formData.cropType}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <textarea
            name="content"
            placeholder="Maelezo ya somo..."
            value={formData.content}
            onChange={handleChange}
            className={styles.textarea}
            required
          />

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Funga
            </button>
            <button type="submit" className={styles.submitBtn}>
              Hifadhi Funzo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLearningModal;
