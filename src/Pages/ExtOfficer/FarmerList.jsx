// src/pages/extension/FarmerList.jsx
import React, { useState } from 'react';
import styles from '../../style/ExtOfficer/FarmerList.module.css';
import FarmerCard from '../../components/ExtOfficer/AlertCard';

const dummyFarmers = [
    { id: 1, name: 'Juma M.', location: 'Mbeya', crops: ['Mahindi', 'Maharage'] },
    { id: 2, name: 'Asha K.', location: 'Iringa', crops: ['Nyanya', 'Viazi'] },
    { id: 3, name: 'Salum O.', location: 'Dodoma', crops: ['Mpunga', 'Vitunguu'] },
    { id: 4, name: 'Anna P.', location: 'Arusha', crops: ['Mahindi'] },
    { id: 5, name: 'John D.', location: 'Morogoro', crops: ['Tumbaku'] },
    { id: 6, name: 'Zena K.', location: 'Mtwara', crops: ['Korosho', 'Ufuta'] },
    { id: 7, name: 'Tito G.', location: 'Singida', crops: ['Alizeti'] },
    { id: 8, name: 'Hawa S.', location: 'Kigoma', crops: ['Mihogo'] },
    { id: 9, name: 'Bakari Y.', location: 'Lindi', crops: ['Mpunga', 'Mahindi'] },
    { id: 10, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 11, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 12, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 13, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 14, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 15, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 16, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 10, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 10, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
    { id: 10, name: 'Musa T.', location: 'Tabora', crops: ['Miwa'] },
  ];
  
  const FarmerList = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    const filteredFarmers = dummyFarmers.filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase())
    );
  
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentFarmers = filteredFarmers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Wakulima Wangu</h2>
  
        <input
          type="text"
          placeholder="Tafuta kwa jina au eneo..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
          className={styles.searchInput}
        />
  
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Jina</th>
              <th>Eneo</th>
              <th>Mazao</th>
            </tr>
          </thead>
          <tbody>
            {currentFarmers.length > 0 ? (
              currentFarmers.map((farmer) => (
                <tr key={farmer.id}>
                  <td>{farmer.name}</td>
                  <td>{farmer.location}</td>
                  <td>{farmer.crops.join(', ')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.empty}>Hakuna mkulima aliyepatikana</td>
              </tr>
            )}
          </tbody>
        </table>
  
        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
  
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? styles.activePage : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
  
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

export default FarmerList;
