import React, { useState } from 'react'
import styles from '../style/Admin/AnswersModal.module.css'

function AnswersModal({ isOpen, onClose, datainp, onChange, onAdd, Error }) {
 // const [datainp, setData] = useState({
 //  Content:'',
 //  Image:'',
 //  Is_accepted:true,
 // })

 const handleChange = (e) => {
  const newData = { ...datainp, [e.target.name]: e.target.value }
  onChange({
   ...newData
  })
 }

 const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    onChange({
      ...datainp,
      image: file
    });
  }
}



 if (isOpen) {
  return (
   <div className={styles.Container}>
    <div className={styles.formCont}>
     <form onSubmit={onAdd} >

      <label htmlFor="">Jibu*</label>

      {Error.errCont ? <div style={{ color: 'red' }}>{Error.errCont} </div> : <div></div>}
      <textarea placeholder='Andika jibu hapa' name='content' value={datainp.content} onChange={handleChange}></textarea>




      <label htmlFor="">Ambatanisha Picha</label>

      <input type="file" name='image' onChange={handleFileChange} />


      <button>Tuma Jibu</button>
      <button onClick={() => onClose()} style={{ backgroundColor: 'gray' }}>Gahiri</button>

     </form>
    </div>
   </div>
  )
 }

}

export default AnswersModal