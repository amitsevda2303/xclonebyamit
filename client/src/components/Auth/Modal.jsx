import React, { useContext } from 'react'
import Styles from "../../styles/components/Modal.module.css"
import Signup from './Signup'
import { Mycontext } from '../../context/MyContext'

const Modal = () => {
    const {signup} = useContext(Mycontext)
  return (
    <div className={Styles.blackbg}>
        <div className={Styles.modalBackdrop}>
            <div className={Styles.modalContent}>
                {
                    signup &&  <Signup/>
                }
            </div>
        </div>
    </div>
  )
}

export default Modal
