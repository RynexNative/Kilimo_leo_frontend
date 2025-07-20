// src/pages/extension/ExtensionDashboard.jsx
import React from 'react';
import styles from '../../style/ExtOfficer/ExtensionDashboard.module.css'
import StatCard from '../../components/ExtOfficer/StatCard'
import { FaUsers, FaQuestionCircle, FaWalking, FaCloudSun } from 'react-icons/fa';


const ExtensionDashboard = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Karibu Dashboard ya Afisa Ugani</h2>

      <div className={styles.statsGrid}>
        <StatCard icon={<FaUsers />} label="Wakulima Wako" value={58} color="#2d6a4f" />
        <StatCard icon={<FaQuestionCircle />} label="Maswali Mapya" value={12} color="#40916c" />
        <StatCard icon={<FaWalking />} label="Ziara za Shamba" value={9} color="#74c69d" />
        <StatCard icon={<FaCloudSun />} label="Alerts za Hali ya Hewa" value={4} color="#95d5b2" />
      </div>

      <div className={styles.activitySection}>
        <h3>Shughuli za Karibuni</h3>
        <ul className={styles.activityList}>
          <li>✅ Umetembelea mkulima Juma - 21/06/2025</li>
          <li>🚨 Umetuma alert ya mvua - 20/06/2025</li>
          <li>📩 Umepokea swali kutoka Asha K. - 19/06/2025</li>
        </ul>
      </div>
    </div>
  );
};

export default ExtensionDashboard;
