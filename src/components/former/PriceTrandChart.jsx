// src/components/farmer/PriceTrendChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from '../style/farmer/PriceTrandChart.module.css';

const sampleData = [
  { date: 'Mei 01', Mahindi: 1200, Maharage: 2300, Kunde: 2300 },
  { date: 'Mei 05', Mahindi: 1250, Maharage: 2200, Kunde: 2000 },
  { date: 'Mei 10', Mahindi: 1300, Maharage: 2400, Kunde: 2700 },
  { date: 'Mei 15', Mahindi: 1280, Maharage: 2350, Kunde: 2500 },
  { date: 'Mei 20', Mahindi: 1320, Maharage: 2500, Kunde: 2300},
  { date: 'Mei 25', Mahindi: 1290, Maharage: 2450, Kunde: 2800 },
];

const PriceTrendChart = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Mwenendo wa Bei ya Mazao</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=" TSh" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Mahindi" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Maharage" stroke="#ff9800" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="Kunde" stroke="#5713ABFF" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendChart;
