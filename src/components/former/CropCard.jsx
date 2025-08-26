import React from 'react'
import { FaSeedling, FaCalendarAlt } from 'react-icons/fa';
import styles from '../style/farmer/CropCard.module.css'
function CropCard({crop, action}) {
    const { id, crop_type, location, stages, planted_date, estimated_harvest_date } = crop;
    // const {stage_name, stage_display} = stages?.[0] || 'hakuna stage'
    const stage_name = stages?.stage_name || 'none'
    const stage_display = stages?.stage_display || 'hakuna hatua'
    // console.log(stage_name)
    // const hatua = stages[0]?.stage_name

  // Rangi kulingana na status ya zao
  const getStatusColor = (hatua) => {
    switch (stage_name) {
      case 'GROWING':
        return '#388e3c'; // kijani
      case 'HARVESTING':
        return '#fbc02d'; // manjano
      case 'PLANTING':
        return '#e64a19'; // orange/red
      case 'none':
        return '#292929FF'
      default:
        return '#E42727FF'; // grey
    }
  };
  // const cropId = () => {
  //   console.log(id)
  // }

  return (
    <div className={styles.card}>
      <div className={styles.icon}><FaSeedling /></div>
      <h3 className={styles.name}>{crop_type.name}</h3>

      <span className={styles.status} style={{ backgroundColor: getStatusColor(stage_name) }} onClick={()=> action()}>
        {stage_display}
      </span>

      <div className={styles.dates}>
        <p><FaCalendarAlt className={styles.dateIcon} /> Kupandwa: {planted_date}</p>
        <p><FaCalendarAlt className={styles.dateIcon} /> Kuvunwa: {estimated_harvest_date}</p>
      </div>
    </div>
  )
}

export default CropCard