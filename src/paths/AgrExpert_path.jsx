import React from 'react'
import ExpertLayout from '../components/Expert/ExpertLayout'
import { Route, Routes } from 'react-router-dom'
import ExpertDashboard from '../Pages/Expert_pages/ExpertDashboard'
import ExpertViewQuestions from '../Pages/Expert_pages/ExpertViewQuestions'
import ExpertLearningResource from '../Pages/Expert_pages/ExpertLearningResource'
import ExpertWeatherTips from '../Pages/Expert_pages/ExpertWeatherTips'
import ExpertMarket from '../Pages/Expert_pages/ExpertMarket'
import ExpertReport from '../Pages/Expert_pages/ExpertReport'
import _404page from '../Pages/ErrorHandle/_404page'


function AgrExpert_path() {
    return (
        <Routes>
            <Route path='' element={<ExpertLayout />} >

                <Route path='/dashboard' element={<ExpertDashboard />} />
                <Route path='/questions' element={<ExpertViewQuestions />} />
                <Route path='/resources' element={<ExpertLearningResource />} />
                <Route path='/weather' element={<ExpertWeatherTips />} />
                <Route path='/market' element={< ExpertMarket/>} />
                <Route path='/report' element={< ExpertReport/>} />

                {/* Crops Routes */}

                {/* <Route path='crop' />
                    <Route path='crop' />
                    <Route path='crop' /> 
                */}

            </Route>
            <Route path="*" element={<_404page />} />




        </Routes>
    )
}

export default AgrExpert_path;