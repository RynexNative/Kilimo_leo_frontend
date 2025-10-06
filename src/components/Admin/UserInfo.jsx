import React from 'react'
import styles from '../style/Admin/UserInfo.module.css'

function UserInfo({ isOpen, userInfo, onClose }) {
    if (!isOpen) return null
    if (userInfo) {
        console.log(userInfo)
    }
    return (
        <div className={styles.div1}>
            <div className={styles.div1container}>
                <h4>PERSONAL DETAILS</h4>

                <h5>First Name: <span>{userInfo.first_name.toUpperCase()}</span></h5>
                <h5>Last Name: <span>{userInfo.last_name.toUpperCase()}</span></h5>
                <h5>Email: <span>{userInfo.email}</span></h5>
                <h5>Phone Number: <span>{userInfo.phoneNumber || 'Null'}</span></h5>
                <h5>Extra Phone Number: <span>{userInfo.profile.extra_phone_number || 'Null'}</span></h5>
                <h5>Role: <span>{userInfo.role_name}</span></h5>
                <h5>Suspended: <span>{userInfo?.is_suspended? "True" : "False"}</span></h5>
                <h5>Region: <span>{userInfo?.profile?.region || userInfo?.profile.location }</span></h5>
                <h5>Last Login: <span>{userInfo?.last_login}</span></h5>

                <button onClick={()=> onClose()}>Close</button>
            </div>
        </div>
    )
}

export default UserInfo