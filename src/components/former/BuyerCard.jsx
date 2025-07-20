// src/components/farmer/BuyerCard.jsx
import React from 'react';
import styles from '../style/farmer/BuyerCard.module.css';
import { FaUserCircle, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';

const BuyerCard = ({ buyer }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <FaUserCircle className={styles.icon} />
        <h4>{buyer.name}</h4>
      </div>
      <p>
        <strong>Anahitaji:</strong> {buyer.crop} ({buyer.amount} kg)
      </p>
      <p>
        <strong>Bei:</strong> {buyer.price} TSh/kg
      </p>
      <p>
        <strong>Mkoa:</strong> {buyer.location}
      </p>
      <div className={styles.contact}>
        <a href={`tel:${buyer.phone}`} className={styles.phone}>
          <FaPhoneAlt /> Piga Simu
        </a>
        <a href={`https://wa.me/${buyer.phone}`} target="_blank" rel="noreferrer" className={styles.chat}>
          <FaCommentDots /> Tuma WhatsApp
        </a>
      </div>
    </div>
  );
};

export default BuyerCard;
