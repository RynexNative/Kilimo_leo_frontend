// src/components/extension/VisitAccordion.jsx
import React, { useState } from 'react';
import styles from '../style/ExtOfficer/VisitAccordion.module.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const VisitAccordion = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={`${styles.accordion} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header} onClick={toggleAccordion}>
        <div>
          <strong>{data.farmerName}</strong> - {data.location} | {data.date}
        </div>
        <div className={styles.icon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isOpen && (
        <div className={styles.content}>
          <p><strong>Madhumuni:</strong> {data.purpose}</p>
          <p><strong>Maelezo:</strong> {data.notes}</p>
          {data.attachment && (
            <div className={styles.attachment}>
              <strong>Lampiran:</strong><br />
              <img src={data.attachment} alt="Attachment" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisitAccordion;
