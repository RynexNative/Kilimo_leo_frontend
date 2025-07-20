// src/components/extension/AddVisitModal.jsx
import React, { useState } from 'react';
import styles from '../style/ExtOfficer/AddVisitModal.module.css';

const AddVisitModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    farmerName: '',
    location: '',
    date: '',
    purpose: '',
    notes: '',
    attachment: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, attachment: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({
      farmerName: '',
      location: '',
      date: '',
      purpose: '',
      notes: '',
      attachment: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Ongeza Ziara Mpya</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="farmerName"
            placeholder="Jina la Mkulima"
            value={formData.farmerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Eneo"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="purpose"
            placeholder="Madhumuni ya Ziara"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Maelezo ya ziara..."
            rows={4}
            value={formData.notes}
            onChange={handleChange}
            required
          />
          <label className={styles.fileLabel}>
            Picha/Attachment:
            <input
              type="file"
              name="attachment"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <div className={styles.actions}>
            <button type="submit">Hifadhi</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Funga
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisitModal;
