import React, { useEffect } from 'react'
import Styles from "../styles/pages/HomePage.module.css"
import { useNavigate } from 'react-router-dom'
import AsideBar from "../components/AsideBar/AsideBar"

const Homepage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    if (!token) {
      navigate("/")      
    }
  }, [])
  
  return (
    <div className={Styles.homePage}>
      <AsideBar/>


      <div className={Styles.container}>
        <div className={Styles.leftContainer}>left us voluptatum nisi quia consequatur voluptate.</div>
        <div className={Styles.rightContainer}>right</div>
      </div>
    </div>
  )
}

export default Homepage
