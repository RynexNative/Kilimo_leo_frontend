import React from 'react'
import styles from '../style/farmer/UniversalCard.module.css'

function UniversalCard({ title, icon, children, bgColor, borderColorLeft }) {
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor || '#fff' , borderLeft: `5px solid ${borderColorLeft}`}}>
      {title && (
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default UniversalCard