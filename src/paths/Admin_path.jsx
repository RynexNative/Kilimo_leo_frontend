import React from 'react'
import { Route, Routes } from "react-router-dom"
import ExpertLayout from '../components/Expert/ExpertLayout'
import _404page from '../Pages/ErrorHandle/_404page'
import AdminDashboard from '../Pages/Admin_pages/AdminDashboard'
import UserManagement from '../Pages/Admin_pages/UserManagement'
import AdminContentDashboard from '../Pages/Admin_pages/AdminContentDashboard'
import LearningResourceTable from '../Pages/Admin_pages/LearningResourcesTable'
import WeatherTipsTable from '../Pages/Admin_pages/WeatherTipsTable'

function Admin_path() {
    return (
        <Routes>
            <Route path='' element={<ExpertLayout />} >
                <Route path='/dashboard' element={<AdminDashboard />} />
                {/* #-------------ADMIN USER MANAGEMENT----------- */}
                <Route path='/users' element={<UserManagement/>} />
                {/* #----------ADMIN CONTENT------------- */}
                <Route path='/content' element={<AdminContentDashboard/>} />
                <Route path='/content/learning-resources' element={<LearningResourceTable/>} />
                <Route path='/content/weather-tips' element={<WeatherTipsTable/>} />

                <Route path='/alerts' element={<UserManagement/>} />

                <Route path='/reports' element={<UserManagement/>} />

                {/* <Route path='/farmer-list' element={<FarmerList/>} />
                <Route path='/weather-alert' element={<WeatherAlert/>} />
                <Route path='/field-visits' element={<FieldVisits/>} />
                <Route path='/report' element={<ExtOfficerReport/>} /> */}


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

export default Admin_path