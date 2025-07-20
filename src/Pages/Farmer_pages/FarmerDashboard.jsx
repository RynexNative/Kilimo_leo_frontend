import React from 'react'
import styles from '../../style/farmer/FarmerDashboard.module.css'
import { FaSeedling, FaCloudSun, FaStore, FaBookOpen, FaQuestionCircle } from 'react-icons/fa'
import DashboardCard from '../../components/former/UniversalCard'

function FarmerDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Row 1: Welcome + Weather */}
      <div className={styles.row}>
        <DashboardCard title="Karibu Mkulima John" icon={<FaSeedling />} bgColor="#D7F4D9FF" borderColorLeft='#38AC40FF'>
          <p>Leo ni tarehe 17 Juni 2025</p>
          <p>Una mazao 3 yanayofuatiliwa kwa sasa.</p>
        </DashboardCard>

        <DashboardCard title="Hali ya Hewa" icon={<FaCloudSun />} bgColor="#D7EEFFFF" borderColorLeft='#49ACF8FF'>
          <p>🌤️ Joto: 28°C</p>
          <p>💧 Unyevu: 65%</p>
          <p>💨 Upepo: 10 km/h</p>
        </DashboardCard>
      </div>

      {/* Row 2: Market + Crops */}
      <div className={styles.row}>
        <DashboardCard title="Bei za Mazao" icon={<FaStore />} bgColor="#FDF4D5FF" borderColorLeft='#DDC983FF'>
          <ul>
            <li>Mahindi: TZS 1,200/kg</li>
            <li>Maharage: TZS 2,300/kg</li>
            <li>Viazi: TZS 800/kg</li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Mazao Yangu" icon={<FaSeedling />} bgColor="#FBDEFFFF" borderColorLeft='#EC70FCFF'>
          <p>✅ Mahindi – Kwenye hatua ya ukuaji</p>
          <p>⏳ Nyanya – Kusubiri mvua</p>
          <p>✅ Maharage – Tayari kuvunwa</p>
        </DashboardCard>
      </div>

      {/* Row 3: Resources + Expert */}
      <div className={styles.row}>
        <DashboardCard title="Mafunzo Mapya" icon={<FaBookOpen />} bgColor="#EADEFBFF" borderColorLeft='#BB9BE7FF'>
          <ul>
            <li>📝 Jinsi ya kulima Mahindi kwa tija</li>
            <li>🎥 Video: Umwagiliaji wa kisasa</li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Uliza Mtaalamu" icon={<FaQuestionCircle />} bgColor="#FFE2DFFF" borderColorLeft='#D0918AFF'>
          <p>Una maswali 2 yanayosubiri majibu.</p>
          <button className={styles.askButton}>Uliza Sasa</button>
        </DashboardCard>
      </div>
    </div>

  )
}

export default FarmerDashboard