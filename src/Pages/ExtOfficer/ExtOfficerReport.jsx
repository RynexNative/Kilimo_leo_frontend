// src/pages/ext_officer/ExtOfficerReport.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from '../../style/ExtOfficer/ExtOfficerReport.module.css';
import { useReactToPrint } from 'react-to-print';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import SummaryCard from '../../components/ExtOfficer/SummaryCard';
import axios from 'axios';
import axiosAuthApi from '../../utils/http';

const ExtOfficerReport = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    documentTitle: 'RipotiYaZiara',
  });

  const [summaryData, setSummaryData] = useState()

  const [visitData, setVisits] = useState()

  const [areaData, setAreaData] = useState()


  const get_data = async()=>{
    try{
      const resp = await axiosAuthApi.get('/fields/report/')
      setSummaryData(resp.summaryData)
      setVisits(resp.visitData)
      setAreaData(resp.areaData)
    }catch(err){
      console.log(err)
      alert('')
    }
  }
  const COLORS = ['#2d6a4f', '#40916c', '#74c69d', '#95d5b2', '#52b788'];


    useEffect(()=>{
      get_data()

    },[])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ripoti ya Ziara za Shambani</h2>
        <button onClick={handlePrint} className={styles.exportBtn}>Pakua Ripoti</button>
      </div>

      {/* <div className={styles.filters}>
        <select><option>Chuja kwa kipindi</option></select>
        <select><option>Chuja kwa eneo</option></select>
      </div> */}

      <div className={styles.printArea} ref={componentRef}>
        <div className={styles.summary}>
          {summaryData?.map((item, i) => (
            <SummaryCard key={i} icon={item.icon} label={item.label} value={item.value} />
          ))}
        </div>

        <div className={styles.charts}>
          <div className={styles.chartBox}>
            <h4>Idadi ya Ziara kwa Miezi</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#40916c" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartBox}>
            <h4>Uwiano wa Maeneo Yaliyotembelewa</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={areaData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {areaData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtOfficerReport;
