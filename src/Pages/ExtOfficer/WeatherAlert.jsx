// src/pages/extension/WeatherAlert.jsx
import React, { useState } from 'react';
import styles from '../../style/ExtOfficer/WeatherAlert.module.css';
import AlertCard from '../../components/ExtOfficer/AlertCard';
import AddAlertModal from '../../components/ExtOfficer/AddAlertModal';

const dummyAlerts = [
  {
    id: 1,
    title: 'Mvua Kubwa Inatarajiwa',
    message: 'Mvua kubwa inatarajiwa kuanzia tarehe 25 hadi 27. Hakikisha mashamba yako hayajafunikwa.',
    date: '2025-06-25',
    region: 'Mbeya',
  },
  {
    id: 2,
    title: 'Ukame',
    message: 'Kutakuwa na ukame kwa wiki ijayo. Hifadhi maji na epuka kupanda mazao yasiyostahimili.',
    date: '2025-06-28',
    region: 'Singida',
  },
];

const WeatherAlert = () => {
  const [alerts, setAlerts] = useState(dummyAlerts);
  const [showModal, setShowModal] = useState(false);

  const handleAddAlert = (newAlert) => {
    setAlerts((prev) => [{ ...newAlert, id: Date.now() }, ...prev]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Tahadhari za Hali ya Hewa</h2>
        <button onClick={() => setShowModal(true)} className={styles.addButtons}>
          + Ongeza Tahadhari
        </button>
      </div>

      <div className={styles.alertList}>
        {alerts.length > 0 ? (
          alerts.map((alert) => <AlertCard key={alert.id} data={alert} />)
        ) : (
          <p className={styles.empty}>Hakuna tahadhari yoyote kwa sasa.</p>
        )}
      </div>

      <AddAlertModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddAlert} />
    </div>
  );
};

export default WeatherAlert;
