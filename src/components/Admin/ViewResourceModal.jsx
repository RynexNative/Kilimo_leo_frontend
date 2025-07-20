// src/components/admin/ViewResourceModal.jsx
import React from 'react';
import styles from '../style/Admin/ViewResourceModal.module.css';

const ViewResourceModal = ({ isOpen, onClose, resource }) => {
  if (!isOpen || !resource) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{resource.title}</h2>
        <div className={styles.details}>
          <p><strong>Aina:</strong> {resource.type}</p>
          <p><strong>Amechapisha:</strong> {resource.uploadedBy}</p>
          <p><strong>Tarehe:</strong> {resource.date}</p>
          <p><strong>Maelezo:</strong> {resource.description || 'Hakuna maelezo yaliyowekwa.'}</p>

          {resource.link && (
            <div className={styles.linkSection}>
              <a href={resource.link} target="_blank" rel="noreferrer" className={styles.link}>
                Fungua Mafunzo &rarr;
              </a>
            </div>
          )}
        </div>

        <button className={styles.closeBtn} onClick={onClose}>Funga</button>
      </div>
    </div>
  );
};

export default ViewResourceModal;
