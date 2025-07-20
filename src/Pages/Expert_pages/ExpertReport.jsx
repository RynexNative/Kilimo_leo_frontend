// src/pages/expert/ExpertReport.jsx
import React, { useRef } from 'react';
import styles from '../../style/Expert/ExpertReport.module.css';
import { useReactToPrint } from 'react-to-print';
import ReportContent from '../../components/Expert/ReportContent';

const ExpertReport = () => {
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
        <div>
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
