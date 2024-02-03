import React from 'react'
import logo from "../../assets/svg.svg"
import Styles from "../../styles/Home/Loader.module.css"

const Loader = () => {
  return (
    <div className={Styles.LoaderDiv}>
        <img src={logo} alt="" />      
    </div>
  )
}

export default Loader
