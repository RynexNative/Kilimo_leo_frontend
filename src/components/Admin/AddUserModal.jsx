// src/components/Admin/AddUserModal.jsx
import React, { useState } from 'react';
import styles from '../style/Admin/AddUserModal.module.css';

const AddUserModal = ({ isOpen, onClose, onAdd }) => {
    const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      sendLink: false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name || !form.email || !form.role) {
        alert('Tafadhali jaza sehemu zote muhimu');
        return;
      }
  
      // Hakikisha password ikiwa haipo basi sendLink ni lazima iwe true
      if (!form.password && !form.sendLink) {
        alert('Weka password au wezesha kutuma link ya kuanzisha');
        return;
      }
  
      onAdd(form);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          <h3>Ongeza Mtumiaji Mpya</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Jina Kamili"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Barua Pepe"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Namba ya Simu"
              value={form.phone}
              onChange={handleChange}
            />
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="">Chagua Aina ya Mtumiaji</option>
              <option value="farmer">Mkulima</option>
              <option value="expert">Mtaalamu</option>
              <option value="officer">Afisa Ugani</option>
              <option value="admin">Msimamizi</option>
            </select>
  
            <input
              type="password"
              name="password"
              placeholder="Password ya Awali"
              value={form.password}
              onChange={handleChange}
              disabled={form.sendLink}
            />
  
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="sendLink"
                checked={form.sendLink}
                onChange={handleChange}
              />
              Tuma link ya kuanzisha akaunti badala ya kuweka password
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
export default AddUserModal;
