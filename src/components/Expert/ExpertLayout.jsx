// src/layouts/ExpertLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ExpertNavbar from './ExpertNavbar';
import ExpertSidebar from './ExpertSidebar';
import styles from '../style/Expert/ExpertLayout.module.css';

const ExpertLayout = () => {
  return (
    <div className={styles.layoutContainer}>
        <ExpertNavbar />
      <div className={styles.mainContent}>
      <ExpertSidebar />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ExpertLayout;
