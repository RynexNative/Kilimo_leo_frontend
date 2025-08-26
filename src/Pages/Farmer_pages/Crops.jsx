import React, { useEffect, useState } from 'react'
import CropCard from '../../components/former/CropCard'
import AddCropModal from '../../components/former/AddCropModal';
import styles from '../../style/farmer/Crops.module.css'
import { useNavigate } from 'react-router-dom';
import axiosAuthApi from '../../utils/http';

function Crops() {
  // const [crops, setCrops] = 
  const [showModal, setShowModal] = useState(false);
  const [myCrops, setMyCrops] = useState(null);
  const [type, setType] = useState(null)
  const [cropid, setCropid] = useState('')


  const cropsdata = async () => {
    try {
      const resp = await axiosAuthApi.get('http://localhost:8000/api/crops/crops/')
      setMyCrops(resp)
      // console.log(resp)
    } catch (err) {
      console.log('error ipo hapa' - err)
    }
  }
  const handleAddCrop = async (crop) => {
    console.log(crop)
    const res = await axiosAuthApi.post('http://localhost:8000/api/crops/crops/', { ...crop })
  };

  const handleStageUpdate = async (stage) => {
    try {
      const resp = await axiosAuthApi.post(`http://localhost:8000/api/crops/stages/`, { ...stage })
    } catch (err) {
      console.log(`hii ni error ${err}`)
    }

  }

  const handleAddStage = (stages) => {
    const newStage = { ...stages, crop: cropid }
    handleStageUpdate(newStage)
    onClose()
  }

  useEffect(() => {
    cropsdata()
  }, [showModal])

  const showStageModal = (cropId) => {
    setType('stages');
    setShowModal(true);
    setCropid(cropId)
    // console.log(cropId)
  }
  const onClose = () => {
    setShowModal(false)
    setType(null)
    // console.log(id)
    // {id? setCropid(id) : console.log("error imeonekana")}
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mazao Yangu</h2>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>+ Ongeza Zao</button>      </div>

      <div className={styles.cropsList}>
        {myCrops?.map((crop) => (
          <CropCard key={crop.id} crop={crop} action={() => showStageModal(crop.id)} onClose={onClose} />
        ))}
      </div>
      <AddCropModal
        isOpen={showModal}
        onClose={onClose}
        onAdd={handleAddCrop}
        onAddStage={handleAddStage}
        isType={type}

      />
    </div>
  )
}

export default Crops