import React, { useState } from 'react'
import CropCard from '../../components/former/CropCard'
import AddCropModal from '../../components/former/AddCropModal';
import styles from '../../style/farmer/Crops.module.css'
import { useNavigate } from 'react-router-dom';


const crops = [
  {
    id: 1,
    name: 'Mahindi',
    status: 'Kwenye Ukuaji',
    plantedDate: '2025-05-10',
    expectedHarvest: '2025-08-15',
  },
  {
    id: 2,
    name: 'Nyanya',
    status: 'Tayari Kuvunwa',
    plantedDate: '2025-03-01',
    expectedHarvest: '2025-06-01',
  },
  {
    id: 3,
    name: 'Maharage',
    status: 'Kusubiri Mvua',
    plantedDate: '2025-07-01',
    expectedHarvest: '2025-10-10',
  },
];

function Crops() {
  const [showModal, setShowModal] = useState(false);
  const [myCrops, setMyCrops] = useState(crops);

  const handleAddCrop = (crop) => {
    setMyCrops((prev) => [...prev, crop]);
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Mazao Yangu</h2>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>+ Ongeza Zao</button>      </div>

      <div className={styles.cropsList}>
        {myCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
      <AddCropModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddCrop}
      />
    </div>
  )
}

export default Crops