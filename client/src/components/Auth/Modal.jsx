import React, { useEffect } from 'react'
import Styles from "../../styles/components/Modal.module.css"
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'

const Modal = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")
  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  }, [])
  
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
