// src/components/extension/AddVisitModal.jsx
import React, { useState } from 'react';
import styles from '../style/ExtOfficer/AddVisitModal.module.css';

const AddVisitModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    farmer: '',
    city: '',
    date: '',
    dhumuni: '',
    desc: '',
    // attachment: '',
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
      farmer: '',
      city: '',
      date: '',
      dhumuni: '',
      desc: '',
      // attachment: '',
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
            name="farmer"
            placeholder="Jina la Mkulima"
            value={formData.farmer}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Eneo"
            value={formData.city}
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
            name="dhumuni"
            placeholder="Madhumuni ya Ziara"
            value={formData.dhumuni}
            onChange={handleChange}
            required
          />
          <textarea
            name="desc"
            placeholder="Maelezo ya ziara..."
            rows={4}
            value={formData.desc}
            onChange={handleChange}
            required
          />
          {/* <label className={styles.fileLabel}>
            Picha/Attachment:
            <input
              type="file"
              name="attachment"
              accept="image/*"
              onChange={handleChange}
            />
          </label> */}

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
