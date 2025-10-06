import React from 'react'
import styles from '../style/farmer/FarmerSidebar.module.css';
import { NavLink, useOutletContext } from 'react-router-dom';
import { FaTachometerAlt, FaSeedling, FaCloudSun, FaStore, FaBookOpen, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { Logout } from '../Expert/ExpertSidebar';

function FarmerSidebar() {
  const role = useOutletContext()
  console.log(role)
  return (
    <aside className={styles.sidebar}>
      <NavLink to="/farmer/dashboard" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }>
        <FaTachometerAlt className={styles.icon} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/farmer/crops" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }>
        <FaSeedling className={styles.icon} />
        <span>Mazao</span>
      </NavLink>
      <NavLink to="/farmer/weather" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }>
        <FaCloudSun className={styles.icon} />
        <span>Hali ya Hewa</span>
      </NavLink>
      <NavLink to="/farmer/market" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }>
        <FaStore className={styles.icon} />
        <span>Masoko</span>
      </NavLink>
      <NavLink to="/farmer/resources" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }>
        <FaBookOpen className={styles.icon} />
        <span>Mafunzo</span>
      </NavLink>
      <NavLink to="/farmer/ask-expert" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      }>
        <FaQuestionCircle className={styles.icon} />
        <span>Uliza Mtaalamu</span>
      </NavLink>

      <NavLink to="/" className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.active : ''}`
      } onClick={Logout}>
        <FaSignOutAlt className={styles.icon} />
        <span>Logout</span>
      </NavLink>
    </aside>
  )
}

export default FarmerSidebar