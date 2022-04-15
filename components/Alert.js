import React, { useEffect } from 'react'
import '../index.css'

export default function Alert({closeAlert, alertContent, isAlertOpen}) {
  useEffect(() => {
    let timer = setTimeout(() => {
      closeAlert();
    }, 2000);
    return () => clearTimeout(timer);
  })
  return (
    <div className="alert-container" style={{color: 'whitesmoke', background: isAlertOpen ? '#505050' : 'transparent'}}>
      <p>{alertContent}</p>
    </div>
  )
}
