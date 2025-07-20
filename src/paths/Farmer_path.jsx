import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FarmerLayout from '../components/former/FarmerLayout'
import FarmerDashboard from '../Pages/Farmer_pages/FarmerDashboard'
import Crops from '../Pages/Farmer_pages/Crops'
import AskExpert from '../Pages/Farmer_pages/AskExpert'
import Profile from '../Pages/Farmer_pages/Profile'
import LearningResource from '../Pages/Farmer_pages/LearningResource'
import Weather from '../Pages/Farmer_pages/Weather'
import AddCropModal from '../components/former/AddCropModal'
import Market from '../Pages/Farmer_pages/Market'
import _404page from '../Pages/ErrorHandle/_404page'

function Farmer_path() {
    return (
        <Routes>
            <Route path='' element={<FarmerLayout />} >

                <Route path='/dashboard' element={<FarmerDashboard />} />

                {/* Crops Routes */}
                <Route path='/crops' element={<Crops />} />
                <Route path='/crops/add-crop-modal' element={<AddCropModal />} />

                <Route path='/weather' element={<Weather />} />
                <Route path='/market' element={<Market />} />
                <Route path='/resources' element={<LearningResource />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/ask-expert' element={<AskExpert />} />


                {/* <Route path='crop' />
                    <Route path='crop' />
                    <Route path='crop' /> 
                */}

            </Route>
            <Route path="*" element={<_404page />} />




        </Routes>
    )
}

export default Farmer_path