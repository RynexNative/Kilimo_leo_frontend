// src/components/expert/ExpertSidebar.jsx
import React, { useState } from 'react';
import { Navigate, NavLink, useOutletContext } from 'react-router-dom';
import styles from '../style/Expert/ExpertSidebar.module.css';
import { FaTachometerAlt, FaBookOpen, FaLeaf, FaCloudSun, FaChartLine, FaSignOutAlt, FaFirstdraft, FaList, FaLowVision, FaInvision, FaDiscourse, FaFacebookMessenger, FaTextHeight, FaVoicemail, FaSms, FaUsers, FaBook, FaBell, FaChartBar, FaCog, FaBookmark } from 'react-icons/fa';
import axiosAuthApi from '../../utils/http';

const ExpertSidebar = () => {

  const role = useOutletContext()

  console.log(role)
  // const [role, setRule] = useState('Cadmin')
  if (role == 'Expert') {
    return (
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Kilimo Expert</h2>
        <nav className={styles.nav}>
          <NavLink to="/expert/dashboard" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaTachometerAlt /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/expert/questions" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaLeaf /> <span>Maswali</span>
          </NavLink>
          <NavLink to="/expert/resources" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaBookOpen /> <span>Mafunzo</span>
          </NavLink>
          <NavLink to="/expert/weather" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaCloudSun /> <span>Weather Tips</span>
          </NavLink>
          <NavLink to="/expert/market" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaChartLine /> <span>Bei Sokoni</span>
          </NavLink>
          <NavLink to="/expert/report" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaFirstdraft /> <span>Report</span>
          </NavLink>
          <NavLink to="/logout" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaSignOutAlt /> <span>Logout</span>
          </NavLink>
        </nav>
      </div>
    );
  } else if (role === 'ExtOfficer') {
    console.log(role)
    return (
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Afisa Ugani</h2>
        <nav className={styles.nav}>
          <NavLink to="/extofficer/dashboard" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaTachometerAlt /> <span>Nyuumbani</span>
          </NavLink>
          <NavLink to="/extofficer/farmer-list" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaList /> <span>Oriodha ya Wakulima</span>
          </NavLink>
          <NavLink to="/extofficer/weather-alert" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaCloudSun /> <span>Taarifa za Haliya hewa</span>
          </NavLink>
          <NavLink to="/extofficer/field-visits" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaChartLine /> <span>Field Visits</span>
          </NavLink>
          <NavLink to='/extofficer/resource' className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaBookmark /> <span>Mafunzo</span>
          </NavLink>
          <NavLink to="/extofficer/report" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`}>
            <FaBook /> <span>Report</span>
          </NavLink>
          <NavLink to="/" className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`} onClick={Logout}>
            <FaSignOutAlt /> <span>Logout</span>
          </NavLink>
        </nav>
      </div>
    );
  } else if (role === 'Cadmin') {
    console.log(role)
    return (
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Kilimo Leo</h2>

        <nav className={styles.navList}>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaTachometerAlt className={styles.icon} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaUsers className={styles.icon} />
            <span>Users</span>
          </NavLink>

          <NavLink to="/admin/market" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaChartBar className={styles.icon} />
            <span>Market</span>
          </NavLink>

          <NavLink to="/admin/content" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaBook className={styles.icon} />
            <span>Content</span>
          </NavLink>

          {/* <NavLink to="/admin/alerts" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaBell className={styles.icon} />
            <span>Alerts</span>
          </NavLink> */}

          {/* <NavLink to="/admin/reports" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaChartBar className={styles.icon} />
            <span>Reports</span>
          </NavLink> */}

          {/* <NavLink to="/admin/settings" className={({ isActive }) => isActive ? styles.active : styles.link}>
            <FaCog className={styles.icon} />
            <span>Settings</span>
          </NavLink> */}

          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link} onClick={Logout}>
            <FaSignOutAlt className={styles.icon} />
            <span>Logout</span>
          </NavLink>
        </nav>
      </div>
    );

  }

};

export default ExpertSidebar;


export const Logout = async()=>{
  // const navigate = Navigate()
  try{
    const resp = await axiosAuthApi.post('auth/logout/')
    // navigate('/farmer/dashboard/')
  }catch(err){
    console.log(err)
    alert("kuna error wakati waku-logout")
  }
}