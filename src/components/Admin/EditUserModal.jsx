import React, { useState, useEffect } from 'react';
import styles from '../style/Admin/EditUserModal.module.css';

const EditUserModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...user, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Hariri Mtumiaji</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Jina kamili"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Barua pepe"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Namba ya simu"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Chagua Jukumu</option>
            <option value="admin">Admin</option>
            <option value="expert">Mtaalamu</option>
            <option value="ext_officer">Afisa Ugani</option>
            <option value="farmer">Mkulima</option>
          </select>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Ghairi
            </button>
            <button type="submit" className={styles.saveBtn}>
              Hifadhi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
