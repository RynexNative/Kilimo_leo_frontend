// src/pages/extension/FarmerList.jsx
import React, { useEffect, useState } from 'react';
import styles from '../../style/ExtOfficer/FarmerList.module.css';
import FarmerCard from '../../components/ExtOfficer/AlertCard';
import axiosAuthApi from '../../utils/http';
import Addfarmer from '../../components/ExtOfficer/Addfarmer';


const FarmerList = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [data, setData] = useState()
  const[showmodal, setShowModal] = useState(false)

  const filteredFarmers = data?.filter(f =>
    f?.first_name.toLowerCase().includes(search.toLowerCase()) ||
    f?.location.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFarmers = filteredFarmers?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredFarmers?.length / itemsPerPage);

  const get_data = async () => {
    try {
      const resp = await axiosAuthApi.get('/details/details/')
      setData(resp)
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }

  const onClose = ()=> {
    setShowModal(false)
  }

  useEffect(() => {
    get_data()
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Wakulima Wangu</h2>

      <div className={styles.adddiv}>
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

        <input type="button" className={styles.addButton} value='+ Ongeza Mkulima' onClick={()=>setShowModal(true)}/>

      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Jina</th>
            <th>Email</th>
            <th>Eneo</th>
            <th>Mazao</th>
          </tr>
        </thead>
        <tbody>
          {currentFarmers?.length > 0 ? (
            currentFarmers.map((farmer) => (
              <tr key={farmer?.id}>
                <td>{farmer?.first_name.charAt(0).toUpperCase() + farmer?.first_name.slice(1).toLowerCase()} .{farmer.last_name.charAt(0).toUpperCase()}</td>
                <td>{farmer?.email}</td>
                <td>{farmer?.farmer_profile?.location || 'none'}</td>
                <td>{farmer?.farmer_profile?.crop_type || 'none'}</td>
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

      <Addfarmer 
      isOpen ={showmodal}
      onClose ={onClose}
      />
    </div>
  );
};

export default FarmerList;
