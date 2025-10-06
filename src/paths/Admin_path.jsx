import React from 'react'
import { Route, Routes } from "react-router-dom"
import ExpertLayout from '../components/Expert/ExpertLayout'
import _404page from '../Pages/ErrorHandle/_404page'
import AdminDashboard from '../Pages/Admin_pages/AdminDashboard'
import UserManagement from '../Pages/Admin_pages/UserManagement'
import AdminContentDashboard from '../Pages/Admin_pages/AdminContentDashboard'
import LearningResourceTable from '../Pages/Admin_pages/LearningResourcesTable'
import WeatherTipsTable from '../Pages/Admin_pages/WeatherTipsTable'
import Market_manage from '../Pages/Admin_pages/Market_manage'
import Market from '../components/Admin/Market'
import Market_price from '../components/Admin/Market_price'
import Crops from '../components/Admin/Crops'
import Qns from '../Pages/Admin_pages/Qns'
import Pvm from '../Pages/Admin_pages/Pvm'

function Admin_path() {
    return (
        <Routes>
            <Route path='' element={<ExpertLayout />} >
                <Route path='/dashboard' element={<AdminDashboard />} />
                {/* #-------------ADMIN USER MANAGEMENT----------- */}
                <Route path='/users' element={<UserManagement/>} />
                {/* #-------------ADMIN MARKET MANAGEMENT---------- */}
                <Route path='/market' element={<Market_manage/>} />
                <Route path='/market/markets' element={<Market/>} />
                <Route path='/market/market-price' element ={<Market_price/>} />
                <Route path='/market/crops' element = {<Crops/>} />

                {/* #----------ADMIN CONTENT------------- */}
                <Route path='/content' element={<AdminContentDashboard/>} />
                <Route path='/content/learning-resources' element={<LearningResourceTable/>} />
                <Route path='/content/questions/' element={<Qns/>} />
                <Route path='/content/view-learning/' element={<Pvm/>} />

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