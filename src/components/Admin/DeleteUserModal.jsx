import React from 'react';
import styles from '../style/Admin/DeleteUserModal.module.css';

const DeleteUserModal = ({ isOpen, onClose, user, onDelete }) => {
  if (!isOpen || !user) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Thibitisha Kufuta</h3>
        <p>
          Una uhakika unataka <strong>kufuta</strong> mtumiaji{" "}
          <strong>{user.name}</strong>?
        </p>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Ghairi
          </button>
          <button
            onClick={() => {
              onDelete(user.id);
              onClose();
            }}
            className={styles.deleteBtn}
          >
            Futa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
