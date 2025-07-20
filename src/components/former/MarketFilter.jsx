// src/components/farmer/MarketFilter.jsx
import React from 'react';
import styles from '../style/farmer/MarketFilter.module.css';

const MarketFilter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        name="search"
        value={filter.search}
        onChange={handleChange}
        placeholder="Tafuta kwa jina la zao..."
        className={styles.input}
      />
      <input
        type="text"
        name="location"
        value={filter.location}
        onChange={handleChange}
        placeholder="Chuja kwa eneo..."
        className={styles.input}
      />
      <input
        type="number"
        name="minPrice"
        value={filter.minPrice}
        onChange={handleChange}
        placeholder="Bei ndogo..."
        className={styles.input}
      />
      <input
        type="number"
        name="maxPrice"
        value={filter.maxPrice}
        onChange={handleChange}
        placeholder="Bei kubwa..."
        className={styles.input}
      />
    </div>
  );
};

export default MarketFilter;
