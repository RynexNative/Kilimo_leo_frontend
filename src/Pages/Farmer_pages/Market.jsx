// src/pages/farmer/Market.jsx
import React, { useState } from 'react';
import styles from '../../style/farmer/Market.module.css';
import AddProductModal from '../../components/former/AddProductModal';
import MarketFilter from '../../components/former/MarketFilter';
import BuyerList from '../../components/former/BuyerList';
import PriceTrendChart from '../../components/former/PriceTrandChart';


const dummyMarketData = [
  { id: 1, crop: 'Mahindi', price: 1200, location: 'Arusha', change: '+5%' },
  { id: 2, crop: 'Maharage', price: 2500, location: 'Mbeya', change: '-3%' },
  { id: 3, crop: 'Mpunga', price: 1800, location: 'Morogoro', change: '+2%' },
  { id: 4, crop: 'Viazi', price: 950, location: 'Kilimanjaro', change: '0%' },
];

const Market = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(dummyMarketData);
  const [filter, setFilter] = useState({
    search: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
  };

  const filteredProducts = products.filter((item) => {
    const searchMatch = item.crop.toLowerCase().includes(filter.search.toLowerCase());
    const locationMatch = item.location.toLowerCase().includes(filter.location.toLowerCase());
    const minMatch = filter.minPrice === '' || item.price >= parseFloat(filter.minPrice);
    const maxMatch = filter.maxPrice === '' || item.price <= parseFloat(filter.maxPrice);
    return searchMatch && locationMatch && minMatch && maxMatch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Soko la Mazao</h2>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + Ongeza Bidhaa
        </button>
      </div>

      <MarketFilter filter={filter} setFilter={setFilter} />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Zao</th>
            <th>Bei (TSh/kg)</th>
            <th>Eneo</th>
            <th>Mabadiliko</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => (
            <tr key={item.id}>
              <td>{item.crop}</td>
              <td>{item.price}</td>
              <td>{item.location}</td>
              <td
                className={
                  item.change.startsWith('+')
                    ? styles.positive
                    : item.change.startsWith('-')
                      ? styles.negative
                      : styles.neutral
                }
              >
                {item.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddProduct}
      />
      <PriceTrendChart />

      <BuyerList />
    </div>

  );
};

export default Market;
