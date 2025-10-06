// src/pages/admin/LearningResourceTable.jsx
import React, { useEffect, useState } from 'react';
import styles from '../../style/Admin/LearningResourceTable.module.css';
import ViewResourceModal from '../../components/Admin/ViewResourceModal';
import axiosAuthApi from '../../utils/http';

const LearningResourceTable = () => {
 const [search, setSearch] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const rowsPerPage = 5;
 const [selectedResource, setSelectedResource] = useState(null);
 const [data, setData] = useState()

 const filteredData = data?.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase()) ||
  item.resource_type.toLowerCase().includes(search.toLowerCase())
 );

 const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
 const startIdx = (currentPage - 1) * rowsPerPage;
 const currentData = filteredData?.slice(startIdx, startIdx + rowsPerPage);

 const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
   setCurrentPage(newPage);
  }
 };

 const get_data = async () => {
  try {
   const resp = await axiosAuthApi.get('/learning/resources/')
   setData(resp)

  } catch (err) {
   console.log(err)
  }
 }

 useEffect(() => {
  get_data()
 }, [])

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
     {currentData?.length > 0 ? (
      currentData.map((item) => (
       <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.resource_type}</td>
        <td>{item.created_by}</td>
        <td>{item.created_at}</td>
        <td>
         <button className={styles.viewBtn}
          onClick={() => setSelectedResource(item)}
         >Tazama</button>
         <button className={styles.viewBtn}
          onClick={() => alert("Samahani hudima hii bado haijawezeshwa...")}
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
