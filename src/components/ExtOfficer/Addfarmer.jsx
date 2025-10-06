import React, { useState } from 'react'
import axiosAuthApi from '../../utils/http';
import styles from '../style/ExtOfficer/Addfarmer.module.css'

function Addfarmer({isOpen, onClose}) {
  const [vaa , setvaa] = useState(false)
  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    email:'',
    phoneNumber:'',
    password:'',
    confirm_password:''
  })

  // handle input changes
  const handleChanges = (e)=>{
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  // handle submit
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axiosAuthApi.post('/details/register/user/', formData)
      console.log("✅ Farmer created:", res)
      onClose()
    } catch (err) {
      console.error("❌ Error:", err.response ? err.response.data : err.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.container} id='container'>
        <div className={styles.divform}>
            <h2>Ongeza Mkulima</h2>

            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input 
                  type="text" 
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChanges}
                />

                <label>Last Name</label>
                <input 
                  type="text" 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChanges}
                />

                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChanges}
                />

                <label>Phone Number</label>
                <input 
                  type="text" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChanges}
                />

                <label>Password </label>
                <input 
                  type='password'
                  name="password"
                  value={formData.password}
                  onChange={handleChanges}
                  disabled={vaa}
                />

                <label>Confirm password</label>
                <input 
                  type='password'
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChanges}
                  disabled={vaa}
                />
                
                <div className={styles.vialink}>
                  <label>Via Link</label>
                  <input 
                    type="checkbox"  
                    id='checklink' 
                    onClick={(e) => setvaa(e.target.checked)}
                  />
                </div>

                <button type="submit">Submit</button>
                <button type="button" onClick={onClose} style={{backgroundColor:'gray'}}>Gahiri</button>
            </form>
        </div>
    </div>
  )
}

export default Addfarmer
