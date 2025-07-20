// src/pages/ext_officer/ExtOfficerReport.jsx
import React, { useRef } from 'react';
import styles from '../../style/ExtOfficer/ExtOfficerReport.module.css';
import { useReactToPrint } from 'react-to-print';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import SummaryCard from '../../components/ExtOfficer/SummaryCard';

const ExtOfficerReport = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'RipotiYaZiara',
  });

  const summaryData = [
    { label: 'Jumla ya Ziara', value: 37, icon: '🧭' },
    { label: 'Maeneo Tofauti', value: 12, icon: '🌍' },
    { label: 'Wakulima Waliofikiwa', value: 58, icon: '👨‍🌾' },
  ];

  const visitData = [
    { name: 'Jan', visits: 8 },
    { name: 'Feb', visits: 5 },
    { name: 'Mar', visits: 12 },
    { name: 'Apr', visits: 7 },
    { name: 'May', visits: 10 },
  ];

  const areaData = [
    { name: 'Morogoro', value: 10 },
    { name: 'Mbeya', value: 7 },
    { name: 'Arusha', value: 6 },
    { name: 'Dodoma', value: 8 },
    { name: 'Tanga', value: 6 },
  ];

  const COLORS = ['#2d6a4f', '#40916c', '#74c69d', '#95d5b2', '#52b788'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ripoti ya Ziara za Shambani</h2>
        <button onClick={handlePrint} className={styles.exportBtn}>Pakua Ripoti</button>
      </div>

      <div className={styles.filters}>
        <select><option>Chuja kwa kipindi</option></select>
        <select><option>Chuja kwa eneo</option></select>
      </div>

      <div className={styles.printArea} ref={componentRef}>
        <div className={styles.summary}>
          {summaryData.map((item, i) => (
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
                  {areaData.map((entry, index) => (
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
