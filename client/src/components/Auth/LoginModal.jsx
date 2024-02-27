import React, { useEffect } from 'react'
import Styles from "../../styles/components/Modal.module.css"
import Login from './Login'
import { useNavigate } from 'react-router-dom';

const LoginModal = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")
  useEffect(() => {
    if (token) {
      navigate("/home")
    }
  }, [navigate,token])
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
