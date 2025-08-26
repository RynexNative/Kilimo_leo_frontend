import React, { useEffect, useState } from 'react'
import FarmerNavbar from './FarmerNavbar'
import FarmerSidebar from './FarmerSidebar'
import { Outlet } from 'react-router-dom'
import '../style/farmer/FarmerLayout.css'
import axiosAuthApi from '../../utils/http'

function FarmerLayout() {

    const [CropType, setCropType] = useState(null)
    const [Stagechoices, setStagechoice] = useState(null)
    const croptype = async () => {
        try{
            const res = await axiosAuthApi.get("http://localhost:8000/api/crops/croptype/")

            setCropType(res)
        }catch(err){
            console.log("error ni crop type")
        }
    }
    const cropsStagesChoices = async() =>{
        try{
            const resp = await axiosAuthApi.get('http://localhost:8000/api/crops/stage-choices/')

            setStagechoice(resp)
            // console.log(resp)
        }catch(err){
            console.log('error ni crop stage')
        }
    }
    useEffect(()=>{
        croptype();
        cropsStagesChoices()
    },[])
    const sample = ['casa', 'kingu']
    const context = {CropType, Stagechoices}
    // console.log(CropType)
    return (
        <div className="farmer-layout">
            <FarmerNavbar />
            <div className="farmer-body">
                <FarmerSidebar />
                <main className="farmer-content">
                    <Outlet context={context}/>
                </main>
            </div>
        </div>
    )
}

export default FarmerLayout