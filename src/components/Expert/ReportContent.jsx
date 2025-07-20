// src/pages/expert/ExpertReport.jsx
import React, { useRef } from 'react';
import styles from '../../style/Expert/ExpertReport.module.css';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import SummaryCard from '../../components/Expert/SummaryCard';
import { useReactToPrint } from 'react-to-print';

const ExpertReport = () => {
//   const reportRef = useRef();
  const componentRef = useRef();

  const summaryData = [
    { label: 'Maswali Yote', value: 124, icon: '❓' },
    { label: 'Majibu Yaliyotolewa', value: 98, icon: '✅' },
    { label: 'Mazao Yaliyoorodheshwa', value: 35, icon: '🌾' },
    { label: 'Mafunzo Yaliyochapishwa', value: 15, icon: '📚' },
  ];

  const priceTrendData = [
    { month: 'Jan', price: 1000 },
    { month: 'Feb', price: 1200 },
    { month: 'Mar', price: 1100 },
    { month: 'Apr', price: 1300 },
    { month: 'May', price: 1250 },
  ];

  const pieData = [
    { name: 'Yaliyopata Majibu', value: 98 },
    { name: 'Bado', value: 26 },
  ];

  const barData = [
    { name: 'Wiki 1', questions: 22 },
    { name: 'Wiki 2', questions: 31 },
    { name: 'Wiki 3', questions: 28 },
    { name: 'Wiki 4', questions: 43 },
  ];

  const COLORS = ['#2d6a4f', '#d00000'];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'RipotiYaMtaalamu',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ripoti Kuu ya Mfumo</h2>
        <button onClick={handlePrint} className={styles.exportBtn}>
          Pakua PDF
        </button>
      </div>

      <div className={styles.filters}>
        <select><option>Chuja kwa zao</option></select>
        <select><option>Chuja kwa kipindi</option></select>
      </div>

      {/* Hii ndio reference sahihi */}
      <ReportContent
        ref={componentRef}
        summaryData={summaryData}
        priceTrendData={priceTrendData}
        pieData={pieData}
        barData={barData}
        COLORS={COLORS}
      />
    </div>
  );
};

export default ExpertReport;


const ReportContent = React.forwardRef(({ summaryData, priceTrendData, pieData, barData, COLORS }, ref) => {
    return (
      <div className={styles.reportContent} ref={ref}>
        <div className={styles.cards}>
          {summaryData.map((item, i) => (
            <SummaryCard key={i} icon={item.icon} label={item.label} value={item.value} />
          ))}
        </div>
  
        <div className={styles.charts}>
          <div className={styles.chartBox}>
            <h4>Mwenendo wa Bei</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2d6a4f" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          <div className={styles.chartBox}>
            <h4>Uwiano wa Maswali</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
  
          <div className={styles.chartBox}>
            <h4>Maswali kwa Wiki</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="questions" fill="#40916c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  });