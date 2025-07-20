import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ExtensionDashboard from '../Pages/ExtOfficer/ExtensionDashboard'
import ExpertLayout from '../components/Expert/ExpertLayout'
import FarmerList from '../Pages/ExtOfficer/FarmerList'
import WeatherAlert from '../Pages/ExtOfficer/WeatherAlert'
import FieldVisits from '../Pages/ExtOfficer/FieldVisits'
import ExtOfficerReport from '../Pages/ExtOfficer/ExtOfficerReport'
import _404page from '../Pages/ErrorHandle/_404page'

function ExtOfficer_path() {
    return (
        <Routes>
            <Route path='' element={<ExpertLayout/>} >
                <Route path='/dashboard' element={<ExtensionDashboard/>} />
                <Route path='/farmer-list' element={<FarmerList/>} />
                <Route path='/weather-alert' element={<WeatherAlert/>} />
                <Route path='/field-visits' element={<FieldVisits/>} />
                <Route path='/report' element={<ExtOfficerReport/>} />

                {/* Crops Routes */}

                {/* <Route path='crop' />
                    <Route path='crop' />
                    <Route path='crop' />
                */}

            </Route>
            <Route path="*" element={<_404page />} />
        </Routes>)
}

export default ExtOfficer_path