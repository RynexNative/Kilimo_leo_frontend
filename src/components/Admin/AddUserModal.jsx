// src/components/Admin/AddUserModal.jsx
import React, { useState, useEffect } from 'react';
import styles from '../style/Admin/AddUserModal.module.css';
import axiosAuthApi from '../../utils/http';


const AddUserModal = ({ isOpen, onClose, onAdd, is_Role }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phoneNumber: '',
    role: '',
    password: '',
    confirm_password:'',
    // sendLink: false,
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
    if (!form.first_name || !form.last_name || !form.email || !form.role) {
      alert('Tafadhali jaza sehemu zote muhimu');
      return;
    }

    // Hakikisha password ikiwa haipo basi sendLink ni lazima iwe true
    if (!form.password && !form.sendLink) {
      alert('Weka password au wezesha kutuma link ya kuanzisha');
      return;
    }

    // console.log(form)

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
            name="first_name"
            placeholder="Jina la Kwanza"
            value={form.first_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="last_name"
            placeholder="Jina la Mwisho"
            value={form.last_name}
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
            name="phoneNumber"
            placeholder="Namba ya Simu"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="">Chagua Aina ya Mtumiaji</option>
            {is_Role?.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password ya Awali"
            value={form.password}
            onChange={handleChange}
            disabled={form.sendLink}
          />
            <input 
            type="password" 
            name="confirm_password" 
            placeholder='Confirm Password'
            value={form.confirm_password}
            onChange={handleChange}
            />

          {/* <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="sendLink"
              checked={form.sendLink}
              onChange={handleChange}
            />
            Tuma link ya kuanzisha akaunti badala ya kuweka password
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
export default AddUserModal;
