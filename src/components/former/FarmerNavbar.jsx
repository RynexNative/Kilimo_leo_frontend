import React from 'react'
import styles from '../style/farmer/FarmerNavbar.module.css';
import { FaUserCircle, FaSignOutAlt, FaLeaf } from 'react-icons/fa';

function FarmerNavbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <FaLeaf className={styles.logoIcon} />
        <span className={styles.logoText}>Kilimo Leo</span>
      </div>
      <div className={styles.right}>
        <div className={styles.icon}>
        <FaUserCircle  title="Profile" />
        <span>Profile</span>

        </div>
        <div className={styles.icon}>
        <FaSignOutAlt  title="Logout" />
        <span>Logout</span>

        </div>
      </div>
    </nav>
  )
}

export default FarmerNavbar