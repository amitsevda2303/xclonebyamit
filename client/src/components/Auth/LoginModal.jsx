import React from 'react'
import Styles from "../../styles/components/Modal.module.css"
import Login from './Login'

const LoginModal = () => {
  return (
    <div className={Styles.blackbg}>
    <div className={Styles.modalBackdrop}>
        <div className={Styles.modalContent}>
           <Login/>
        </div>
    </div>
</div>
  )
}

export default LoginModal
