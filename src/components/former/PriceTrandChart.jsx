import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import styles from '../style/farmer/PriceTrandChart.module.css';

const PriceTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center' }}>Hakuna data ya kuonyesha kwenye chart</p>;
  }

  // 1. Chukua unique crops (hadi 10)
  const crops = [...new Set(data.map((item) => item.crop))].slice(0, 5);

  // 2. Chukua unique dates kutoka data, sort descending (latest kwanza)
  const uniqueDatesDesc = [...new Set(data.map((item) => item.date))]
    .sort((a, b) => new Date(b) - new Date(a)) // latest date kwanza
    .slice(0, 10) // chukua latest 10 days
    .reverse(); // ili x-axis iwe ascending (oldest -> latest)

  // 3. Andaa chartData
  const chartData = uniqueDatesDesc.map((date) => {
    const entry = { date };
    crops.forEach((crop) => {
      // Chukua data ya crop kwa tarehe hii
      const cropData = data.find(d => d.crop === crop && d.date === date);
      entry[crop] = cropData ? cropData.price : null; // kama hakuna, acha null
    });
    return entry;
  });

  // 4. Colors for lines
  const colors = ['#4caf50', '#ff9800', '#5713AB', '#2196f3', '#e91e63'];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Mwenendo wa Bei ya Mazao (Latest 10 Days)</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=" TSh" />
          <Tooltip />
          <Legend />
          {crops.map((crop, index) => (
            <Line
              key={crop}
              type="monotone"
              dataKey={crop}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendChart;
