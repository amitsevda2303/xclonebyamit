import React from 'react'
import Styles from "../../styles/components/Modal.module.css"
import Signup from './Signup'

const Modal = () => {
  return (
    <div className={Styles.blackbg}>
        <div className={Styles.modalBackdrop}>
            <div className={Styles.modalContent}>
               <Signup/>
            </div>
        </div>
    </div>
  )
}

export default Modal
