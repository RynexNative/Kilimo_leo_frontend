// src/pages/admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import styles from '../../style/Admin/AdminDashboard.module.css';
import AdminSummaryCard from '../../components/Admin/AdminSummaryCard';
import {
    LineChart, Line, PieChart, Pie, Cell, Tooltip, BarChart,
    Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import QuickActionPanel from '../../components/Admin/QuickActionPanel';
import SystemLogPanel from '../../components/Admin/SystemLogsPanel';
import FeedbackPanel from '../../components/Admin/FeedbackPanel';
import axiosAuthApi from '../../utils/http';

// const summaryData = [
//     { label: 'Wakulima', value: 1200, icon: '👩🏿‍🌾' },
//     { label: 'Wataalamu', value: 55, icon: '🧠' },
//     { label: 'Mazao Sokoni', value: 320, icon: '🌽' },
//     { label: 'Mafunzo', value: 45, icon: '📚' },
//     { label: 'Maswali', value: 640, icon: '❓' },
//     { label: 'Majibu', value: 580, icon: '✅' },
// ];

// const questionsData = [
//     { name: 'Jan', questions: 120 },
//     { name: 'Feb', questions: 140 },
//     { name: 'Mar', questions: 110 },
//     { name: 'Apr', questions: 160 },
//     { name: 'May', questions: 150 },
//     { name: 'jun', questions: 130 },
//     { name: 'juy', questions: 160 },
//     { name: 'aug', questions: 170 },
// ];

// const pieData = [
//     { name: 'Wakulima', value: 1200 },
//     { name: 'Wataalamu', value: 55 },
//     { name: 'Maafisa Ugani', value: 25 },
// ];

const COLORS = ['#2d6a4f', '#40916c', '#74c69d'];

const AdminDashboard = () => {

        const [summaryData, setSummaryData] = useState()
        const [questionsData, setQuestionData] = useState()
        const [pieData, setPieData] = useState()

    


        const get_data = async() => {
            try{
                const resp = await axiosAuthApi.get('details/admin-dashboard/')
                setSummaryData(resp.summary)
                setQuestionData(resp.trend)
                setPieData(resp.pie_data)
            }catch(err){
                console.log(err)
            }
        }

        useEffect(()=>{
            get_data()
        },[])
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Admin Dashboard</h2>

            <div className={styles.cardContainer}>
                {summaryData?.map((item, idx) => (
                    <AdminSummaryCard
                        key={idx}
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                    />
                ))}
            </div>

            <div className={styles.charts}>
                <div className={styles.chartBox}>
                    <h4>Mwenendo wa Maswali</h4>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={questionsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="questions" stroke="#2d6a4f" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.chartBox}>
                    <h4>Uwiano wa Watumiaji</h4>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={150} label>
                                {pieData?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                </div>
                <FeedbackPanel />

            </div>

            <div className={styles.topGrid}>
                <QuickActionPanel />
                <SystemLogPanel />
            </div>

            <div className={styles.bottomGrid}>
                <FeedbackPanel />
            </div>
        </div>
    );
};

export default AdminDashboard;
