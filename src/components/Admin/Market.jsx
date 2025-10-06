import React, { useState, useEffect } from 'react'
import styles from '../style/Admin/Market.module.css'
import axiosAuthApi from '../../utils/http';
import AddMarket from './AddMarket';

// const data1 = [
//     {
//         "id": 1,
//         "name": "kariako",
//         "location": "Dar Es Salaam",
//         "description": "Tanzania"
//     },
//     {
//         "id": 2,
//         "name": "Kilombero",
//         "location": "Arusha",
//         "description": "Tanzania"
//     },
//     {
//         "id": 3,
//         "name": "Msufini",
//         "location": "Singida",
//         "description": "Tanzania"
//     },
//     {
//         "id": 4,
//         "name": "mgunda",
//         "location": "Dar Es Salaam",
//         "description": "Tanzania"
//     },
//     {
//         "id": 5,
//         "name": "Kinondoni",
//         "location": "Dar Es Salaam",
//         "description": "Tanzania"
//     }
// ]

function Market() {

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [data, setData] = useState()
    const [showmodal, setShowModal] = useState(false)

    // console.log(data)

    const filteredMarket = data?.filter(f =>
        f?.name.toLowerCase().includes(search.toLowerCase()) ||
        f?.location.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentMarket = filteredMarket?.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredMarket?.length / itemsPerPage);

    const get_data = async () => {
      try {
        const resp = await axiosAuthApi.get('/markets/markets/')
        setData(resp)
        // console.log(resp)
      } catch (error) {
        console.log(error)
      }
    }

    const onClose = () => {
        setShowModal(false)
    }

    useEffect(() => {
          get_data() 
    }, [showmodal])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Markets</h2>

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

                <input type="button" className={styles.addButton} value='+ Ongeza Soko' onClick={() => setShowModal(true)} />

            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Soko</th>
                        <th>Eneo</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMarket?.length > 0 ? (
                        currentMarket.map((Market) => (
                            <tr key={Market?.id}>
                                <td>{Market?.name.charAt(0).toUpperCase() + Market?.name.slice(1).toLowerCase()}</td>
                                <td>{Market?.location}</td>
                                <td>{Market?.description}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
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

            <AddMarket
            isOpen={showmodal}
            onClose={()=> onClose()}
            isType='market'
            />

        </div>
    )
}

export default Market