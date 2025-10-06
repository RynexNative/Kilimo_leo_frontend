import React,{useState, useEffect} from 'react'
import styles from '../style/Admin/Market.module.css'
import axiosAuthApi from '../../utils/http';
import AddMarket from './AddMarket';


function Crops() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [data, setData] = useState()
  const [showmodal, setShowModal] = useState(false)
  const [modal,setModal] = useState()
  const [edit, setEdit] = useState({id:'', name:''})

  // console.log(data)

  const filteredMarket = data?.filter(f =>
      f?.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMarket = filteredMarket?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMarket?.length / itemsPerPage);

  const get_data = async () => {
    try {
      const resp = await axiosAuthApi.get('/crops/croptype/')
      setData(resp)
      // console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }

  const get_delete = async (id) => {
    try{
      const resp = await axiosAuthApi.delete(`/crops/croptype/${id}/`)
      get_data()
    }catch(err){
      console.log(err)
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
          <h2 className={styles.title}>Mazao</h2>

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

              <input type="button" className={styles.addButton} value='+ Ongeza Zao' onClick={() => {
                setShowModal(true)
                setModal('Crop')
                }} />

          </div>

          <table className={styles.table}>
              <thead>
                  <tr>
                      <th>Zao</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {currentMarket?.length > 0 ? (
                      currentMarket.map((Market) => (
                          <tr key={Market?.id}>
                              <td>{Market?.name.charAt(0).toUpperCase() + Market?.name.slice(1).toLowerCase()}</td>
                              <td>
                                <button onClick={()=>{
                                  setShowModal(true)
                                  setModal('CropEdit')
                                  setEdit(
                                    {
                                      id:Market?.id,
                                      name:Market?.name
                                    }
                                  )
                                }}>Edit</button>
                                <button onClick={()=> get_delete(Market?.id)} style={{backgroundColor:'#a00', marginLeft:'10px'}}>Delete</button>
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
          isType={modal}
          onEdit={edit}
          />

      </div>
  )
}

export default Crops