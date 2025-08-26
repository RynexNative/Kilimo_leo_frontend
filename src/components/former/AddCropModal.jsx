// src/components/farmer/AddCropModal.jsx
import React, { useContext, useState } from 'react';
import styles from '../style/farmer/AddCropModal.module.css';
import { useOutlet, useOutletContext } from 'react-router-dom';

const AddCropModal = ({ isOpen, onClose, onAdd, isType, onAddStage }) => {

  const {CropType, Stagechoices} = useOutletContext()

  const [crop_type_id, setCrop_type] = useState('');
  // const [status, setStatus] = useState(null);
  const [planted_date, setPlantedDate] = useState('');
  const [estimated_harvest_date, setExpectedHarvest] = useState('');
  const [location, setLocation] = useState('');
  const [size_in_acres, setSize] = useState('');

  // # updates
  const [crop, setCrop] = useState('');
  const [stage_name, setStagename] = useState('');
  const [notes, setNotes] = useState('');
  const [damage_description, setDamagedescription] = useState('');
  // #const [size_in_acres5, setSize5] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isType=='stages'){
      const newStage = {
        // cropid:crop.id,
        stage_name,
        notes,
        damage_description
      }
      onAddStage(newStage)
    }else{
      const newCrop = {
        crop_type_id,
        location,
        planted_date,
        estimated_harvest_date,
        size_in_acres,
      };
      onAdd(newCrop);
      onClose();
    }
  };

  if (!isOpen) return null;

  // if (CropType) return console.log(`hiziapa: ${CropType?.name}`);
  // if (CropType){
    console.log(isType)
  if (isType == 'stages'){
    return(
      <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Hatua ya Ukuaji</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Chagua Hatua:
            <select onChange={(e) => setStagename(e.target.value)}>
              <option value="" disabled>--- Chagua hatua ---</option>
              {Stagechoices?.map(([value, label], index)=>(
                <option key={index} value={value}>{label}</option>
              ))}
            </select>
          </label>

          <label>
            Maelezo mafupi:
          </label>
            <textarea rows='6' type="text" value={notes} onChange={(e) => setNotes(e.target.value)} required />

          <label>
            Elezea Uharibifu:
          </label>
            <textarea rows='6' type="date" value={damage_description} onChange={(e) => setDamagedescription(e.target.value)} required />

          <div className={styles.actions}>
            <button type="submit" className={styles.addButton}>Ongeza</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Ghairi</button>
          </div>
        </form>
      </div>
    </div>
    )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Ongeza Zao Jipya</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Chagua Zao:
            <select value={crop_type_id} onChange={(e) => setCrop_type(e.target.value)}>
            <option value="" disabled>--- Chagua Zao ---</option>
              {CropType?.map((crop)=>(
                <option key={crop.id} value={crop.id}>{crop.name}</option>
              ))}
            </select>
          </label>

          <label>
            Mahali:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </label>

          <label>
            Tarehe ya Kupanda:
            <input type="date" value={planted_date} onChange={(e) => setPlantedDate(e.target.value)} required />
          </label>

          <label>
            Tarehe ya Kuvuna:
            <input type="date" value={estimated_harvest_date} onChange={(e) => setExpectedHarvest(e.target.value)} required />
          </label>

          <label>
            Ukubwa wa Shamba:
            <input type="number" value={size_in_acres} onChange={(e) => setSize(e.target.value)} required />
          </label>


          <div className={styles.actions}>
            <button type="submit" className={styles.addButton}>Ongeza</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Ghairi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCropModal;
