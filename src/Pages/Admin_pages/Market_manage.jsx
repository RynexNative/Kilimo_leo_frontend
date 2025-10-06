import React, { useState, useEffect } from 'react'
import styles from '../../style/Admin/Market_manage.module.css'
import ContentCard from '../../components/Admin/ContentCard';
import { FaAlipay, FaBook, FaBookDead, FaBookReader, FaChalkboard, FaChartBar, FaChartLine, FaChartPie, FaGooglePay, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaMoneyCheck, FaWallet, FaWarehouse } from 'react-icons/fa';



const contentTypes = [
     {
        title: 'Masoko(Market)',
        count: 'Quality',
        icon: <FaChartPie />,
        desc: 'Orodha kamili ya Masoko Tanzania katika mikoa mbalimbali',
        color: '#6D9DEBFF',
        link: 'markets',
      },
      {
        title: 'Market Price',
        count: 'Quality',
        icon: <FaMoneyBillAlt/>,
        desc: 'Muolekeo wa Bei ya Mazao Mbalimbali Tanzania',
        color: '#38A6D6FF',
        link: 'market-price',
      },
      
      {
        title: 'Mazao (Crops)',
        count: 'Quality',
        icon: '🌾',
        desc: 'Mazao Mbalimbali yanayo limwa Tanzania',
        color: '#B4FBCEFF',
        link: 'crops',
      }
]



function Market_manage() {

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Usimamizi wa Masoko na Mazao</h2>
      <p className={styles.subtitle}>Fuatilia Usimamizi wa Masoko, Mazao na Bei za Mazao</p>

      <div className={styles.cardGrid}>
        {contentTypes.map((item, index) => (
          <ContentCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Market_manage