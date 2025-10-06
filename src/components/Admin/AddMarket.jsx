import React, { useState } from 'react'
import styles from '../style/Admin/AddMarket.module.css'
import axiosAuthApi from '../../utils/http'   // hakikisha umeimport axios yako

function AddMarket({isOpen, onClose, isType, onEdit}) {


  if (!isOpen) return null;

  if(isType === 'market'){

    const [data, setData] = useState({
        name: '',
        location: '',
        description: ''
      });
    
      const handleChange = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const resp = await axiosAuthApi.post("/markets/markets/", data);
          console.log("✅ Market added:", resp.data);
    
          // Clear form baada ya kutuma
          setData({ name: '', location: '', description: '' });
    
          // Funga modal
          onClose();
        } catch (error) {
          console.error("❌ Error adding market:", error.response?.data || error.message);
        }
      };
    return (
        <div className={styles.container}>
          <div className={styles.formCont}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Jina</label>
              <input
                type="text"
                name="name"
                placeholder="Jina la Soko"
                value={data.name}
                onChange={handleChange}
              />
    
              <label htmlFor="location">Mkoa</label>
              <input
                type="text"
                name="location"
                placeholder="Mkoa"
                value={data.location}
                onChange={handleChange}
              />
    
              <label htmlFor="description">Maelezo</label>
              <input
                type="text"
                name="description"
                placeholder="Maelezo Mafupi...."
                value={data.description}
                onChange={handleChange}
              />
    
                <button type="submit">Tuma</button>
                <button type="button" onClick={onClose} className={styles.gahiri}>
                  Gahiri
                </button>
              
            </form>
          </div>
        </div>
      );
  }

  if(isType === 'Crop'){

    const [data, setData] = useState({
        name: '',
      });
    
      const handleChange = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const resp = await axiosAuthApi.post("/crops/croptype/", data);
          alert("✅ Crop added:", resp);
    
          // Clear form baada ya kutuma
          setData({ name: '', location: '', description: '' });
    
          // Funga modal
          onClose();
        } catch (error) {
            alert("❌ Error adding market:", error.response.status || error.status)
          console.error("❌ Error adding market:", error.response || error.message);
        }
      };
    return (
        <div className={styles.container}>
          <div className={styles.formCont}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Jina</label>
              <input
                type="text"
                name="name"
                placeholder="Jina la Zao"
                value={data.name}
                onChange={handleChange}
              />    
    
                <button type="submit">Tuma</button>
                <button type="button" onClick={onClose} className={styles.gahiri}>
                  Gahiri
                </button>
              
            </form>
          </div>
        </div>
      );
  }

  if(isType === 'CropEdit'){

    const [data, setData] = useState(onEdit);
    

    //   console.log(onEdit)
      const handleChange = (e) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const name= data.name
            // console.log(name)

          const resp = await axiosAuthApi.put(`/crops/croptype/${data.id}/`, {name});
          alert("✅ Crop Edited Successfuly:", resp);
    
          // Funga modal
          onClose();
        } catch (error) {
            alert("❌ Error adding market:", error.response.status || error.status)
          console.error("❌ Error adding market:", error.response || error.message);
        }
      };
    return (
        <div className={styles.container}>
          <div className={styles.formCont}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Jina</label>
              <input
                type="text"
                name="name"
                placeholder="Jina la Zao"
                value={data.name}
                onChange={handleChange}
              />    
    
                <button type="submit">Tuma</button>
                <button type="button" onClick={onClose} className={styles.gahiri}>
                  Gahiri
                </button>
              
            </form>
          </div>
        </div>
      );
  }

  
}

export default AddMarket;
