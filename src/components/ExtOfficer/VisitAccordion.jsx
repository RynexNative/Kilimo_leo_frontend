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
          <strong>{data.farmer}</strong> - {data.city} | {data.date}
        </div>
        <div className={styles.icon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {isOpen && (
        <div className={styles.content}>
          <p><strong>Madhumuni:</strong> {data.dhumuni}</p>
          <p><strong>Maelezo:</strong> {data.desc}</p>
          {data.attachment && (
            <div className={styles.attachment}>
              <strong>Kiambata:</strong><br />
              <img src={data.attachment} alt="Attachment" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisitAccordion;
