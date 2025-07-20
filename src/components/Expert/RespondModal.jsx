// src/components/expert/RespondModal.jsx
import React, { useState } from 'react';
import styles from '../style/Expert/RespondModal.module.css';

const RespondModal = ({ question, onClose }) => {
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic ya kutuma jibu (API call itakuja baadaye)
    console.log('Jibu lililotumwa:', response);

    // Clear na funga modal
    setResponse('');
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Jibu swali kutoka kwa {question.farmerName}</h3>
        <p className={styles.originalQuestion}>{question.question}</p>

        <form onSubmit={handleSubmit}>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Andika jibu lako hapa..."
            className={styles.textarea}
            required
          />

          <div className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={onClose}>
              Funga
            </button>
            <button type="submit" className={styles.submit}>
              Tuma Jibu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RespondModal;
