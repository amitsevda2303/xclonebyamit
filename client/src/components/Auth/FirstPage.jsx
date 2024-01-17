import React from 'react'
import Styles from "../../styles/components/FirstPage.module.css"
import image from "../../assets/svg.svg"

const FirstPage = () => {
  return (
    <div>
      <div className={Styles.LeftContainer}>
        <img src={image} alt="" />
      </div>
      <div className={Styles.RightContainer}>
        <h4>HAppening now</h4>
      </div>
    </div>
  )
}

export default FirstPage
