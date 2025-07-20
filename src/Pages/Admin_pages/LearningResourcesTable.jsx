// src/pages/admin/LearningResourceTable.jsx
import React, { useState } from 'react';
import styles from '../../style/Admin/LearningResourceTable.module.css';
import ViewResourceModal from '../../components/Admin/ViewResourceModal';

const dummyData = [
    { id: 1, title: 'Kilimo cha Nyanya', type: 'Video', uploadedBy: 'Expert A', date: '2025-06-10' },
    { id: 2, title: 'Umwagiliaji wa Kisasa', type: 'Makala', uploadedBy: 'Expert B', date: '2025-06-14' },
    { id: 3, title: 'Udhibiti wa Wadudu', type: 'PDF', uploadedBy: 'Expert C', date: '2025-06-19' },
    { id: 4, title: 'Utunzaji wa Mazao', type: 'Video', uploadedBy: 'Expert D', date: '2025-06-20' },
    { id: 5, title: 'Mbolea Bora', type: 'Makala', uploadedBy: 'Expert A', date: '2025-06-21' },
    { id: 6, title: 'Kilimo hai', type: 'PDF', uploadedBy: 'Expert C', date: '2025-06-22' },
    { id: 7, title: 'Pest Control', type: 'Video', uploadedBy: 'Expert B', date: '2025-06-23' },
];

const LearningResourceTable = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [selectedResource, setSelectedResource] = useState(null);

    const filteredData = dummyData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const currentData = filteredData.slice(startIdx, startIdx + rowsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Orodha ya Mafunzo Yaliyowekwa</h2>

            <div className={styles.topControls}>
                <input
                    type="text"
                    placeholder="Tafuta kwa kichwa au aina..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Reset to page 1
                    }}
                    className={styles.searchInput}
                />
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Kichwa</th>
                        <th>Aina</th>
                        <th>Mtaalamu</th>
                        <th>Tarehe</th>
                        <th>Hatua</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.length > 0 ? (
                        currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.type}</td>
                                <td>{item.uploadedBy}</td>
                                <td>{item.date}</td>
                                <td>
                                    <button className={styles.viewBtn}
                                        onClick={() => setSelectedResource(item)}
                                    >Tazama</button>
                                    <button className={styles.viewBtn}
                                        onClick={() => setSelectedResource(item)}
                                    >Zuia</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Hakuna matokeo yaliyopatikana.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Weka Nyuma
                    </button>
                    <span>
                        Ukurasa {currentPage} ya {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Mbele &raquo;
                    </button>
                </div>
            )}
            <ViewResourceModal
                isOpen={!!selectedResource}
                resource={selectedResource}
                onClose={() => setSelectedResource(null)}
            />
        </div>
    );
};

export default LearningResourceTable;
