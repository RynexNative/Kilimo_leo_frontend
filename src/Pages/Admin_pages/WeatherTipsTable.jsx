// src/pages/admin/WeatherTipsTable.jsx
import React, { useState } from 'react';
import styles from '../../style/Admin/WeatherTipsTable.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const dummyTips = [
  // ... (weka tips zako zote hapa)
  {
    id: 1,
    title: 'Epuka kumwagilia kupita kiasi msimu wa mvua',
    description: 'Katika msimu wa mvua, maji ya mvua yanatosha, hivyo epuka kuongeza maji zaidi...',
    author: 'Expert John',
    date: '2025-06-20',
  },
  {
    id: 2,
    title: 'Fuatilia hali ya hewa kabla ya kupanda',
    description: 'Ni muhimu kujua kama wiki inayofuata kutakuwa na mvua au ukame kabla ya kupanda mazao.',
    author: 'Expert Fatma',
    date: '2025-06-18',
  },
  {
    id: 3,
    title: 'Epuka kumwagilia kupita kiasi msimu wa mvua',
    description: 'Katika msimu wa mvua, maji ya mvua yanatosha, hivyo epuka kuongeza maji zaidi...',
    author: 'Expert John',
    date: '2025-06-20',
  },
  {
    id: 4,
    title: 'Fuatilia hali ya hewa kabla ya kupanda',
    description: 'Ni muhimu kujua kama wiki inayofuata kutakuwa na mvua au ukame kabla ya kupanda mazao.',
    author: 'Expert Fatma',
    date: '2025-06-18',
  },
  {
    id: 5,
    title: 'Epuka kumwagilia kupita kiasi msimu wa mvua',
    description: 'Katika msimu wa mvua, maji ya mvua yanatosha, hivyo epuka kuongeza maji zaidi...',
    author: 'Expert John',
    date: '2025-06-20',
  },
  {
    id: 6,
    title: 'Fuatilia hali ya hewa kabla ya kupanda',
    description: 'Ni muhimu kujua kama wiki inayofuata kutakuwa na mvua au ukame kabla ya kupanda mazao.',
    author: 'Expert Fatma',
    date: '2025-06-18',
  },
  {
    id: 7,
    title: 'Epuka kumwagilia kupita kiasi msimu wa mvua',
    description: 'Katika msimu wa mvua, maji ya mvua yanatosha, hivyo epuka kuongeza maji zaidi...',
    author: 'Expert John',
    date: '2025-06-20',
  },
  {
    id: 8,
    title: 'Fuatilia hali ya hewa kabla ya kupanda',
    description: 'Ni muhimu kujua kama wiki inayofuata kutakuwa na mvua au ukame kabla ya kupanda mazao.',
    author: 'Expert Fatma',
    date: '2025-06-18',
  },
];

const ITEMS_PER_PAGE = 5;

const WeatherTipsTable = () => {
  const [tips, setTips] = useState(dummyTips);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTips = tips.filter((tip) =>
    tip.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTips.length / ITEMS_PER_PAGE);

  const paginatedTips = filteredTips.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Orodha ya Weather Tips</h2>
        <input
          type="text"
          placeholder="Tafuta tip kwa kichwa..."
          className={styles.search}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Kichwa</th>
            <th>Maelezo</th>
            <th>Mwandishi</th>
            <th>Tarehe</th>
            <th>Hatua</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTips.length > 0 ? (
            paginatedTips.map((tip) => (
              <tr key={tip.id}>
                <td>{tip.title}</td>
                <td>
                  {tip.description.length > 50
                    ? tip.description.slice(0, 50) + '...'
                    : tip.description}
                </td>
                <td>{tip.author}</td>
                <td>{tip.date}</td>
                <td className={styles.actions}>
                  <button title="Edit"><FaEdit /></button>
                  <button title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Hakuna matokeo yanayolingana.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#8592; Weka Nyuma
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? styles.activePage : ''}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Endelea &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherTipsTable;
