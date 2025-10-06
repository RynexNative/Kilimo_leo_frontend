import React, { useState } from 'react'
import styles from '../style/ExtOfficer/AddResource.module.css'

function AddResourceModal({isOpen, onClose}) {
  const [types, setTypes] = useState({Video:false,Pdf:false})
 if (!isOpen) return null

  return (
    <div className={styles.Cont}>
     <div className={styles.innerCont}>
      <h2>Ongeza Funzo Hapa</h2>
      <form >
       <label htmlFor="">

       <select name="" id="">
        <option value="#">Beginer</option>
        <option value="#">Intermidiate</option>
        <option value="#">Advanced</option>
        <option value="#">Proffesional</option>


       </select>
       </label>
       <label>
        Kinchwa Cha Funzo
        <input type="text" />
       </label>

       <label>
        Maelezo
       </label>
        <textarea placeholder='Toa maelezo yanayo husiana na Somo'></textarea>

        <label htmlFor="">
        Aina ya somo
        <select name="" id="">
        <option value="#">PDF</option>
        <option value="#">Video</option>

       </select>
        </label>

        <label htmlFor="">
          PDF
          <input type="file" />
        </label>

        <label htmlFor="">
          Video
          <input type="file" name="" id="" />
        </label>

       <label>
        Url
        <input type="url" placeholder='e.g. htts://rynexnative.com'/>
       </label>

       <label htmlFor="">
          Thumbnail
          <input type="file" name="" id="" />
        </label>

       <button ty='submit'>Tuma</button>
       <button ty='gairi' onClick={()=>onClose(false)}>Gairi</button>

      </form>
     </div>
    </div>
  )
}

export default AddResourceModal