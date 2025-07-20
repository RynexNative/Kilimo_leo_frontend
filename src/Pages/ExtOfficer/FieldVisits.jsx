// src/pages/extension/FieldVisits.jsx
import React, { useState } from 'react';
import styles from '../../style/ExtOfficer/FieldVisits.module.css';
import AddVisitModal from '../../components/ExtOfficer/AddVisitModal';
import VisitAccordion from '../../components/ExtOfficer/VisitAccordion';

const dummyVisits = [
  {
    id: 1,
    farmerName: 'Asha K.',
    location: 'Mbeya',
    date: '2025-06-20',
    purpose: 'Ukaguzi wa magonjwa',
    notes: 'Mimea ilionyesha dalili za fangasi. Ilishauriwa kutumia dawa maalum.',
    attachment: '',
  },
  {
    id: 2,
    farmerName: 'Juma M.',
    location: 'Moshi',
    date: '2025-06-18',
    purpose: 'Mafunzo ya matumizi ya mbolea',
    notes: 'Alielekezwa matumizi ya mbolea ya kupandia na kukuzia.',
    attachment: '',
  },
];

const FieldVisits = () => {
  const [visits, setVisits] = useState(dummyVisits);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');

  const filteredVisits = visits.filter(
    (visit) =>
      visit.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      visit.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVisit = (visit) => {
    setVisits((prev) => [{ ...visit, id: Date.now() }, ...prev]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h2>Ziara za Mashambani</h2>
        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Tafuta kwa jina au eneo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setShowModal(true)}>+ Ongeza Ziara</button>
        </div>
      </div>

      <div className={styles.accordionList}>
        {filteredVisits.length === 0 ? (
          <p className={styles.noData}>Hakuna ziara zinazolingana na utafutaji</p>
        ) : (
          filteredVisits.map((visit) => (
            <VisitAccordion key={visit.id} data={visit} />
          ))
        )}
      </div>

      <AddVisitModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={handleAddVisit} />
    </div>
  );
};

export default FieldVisits;
