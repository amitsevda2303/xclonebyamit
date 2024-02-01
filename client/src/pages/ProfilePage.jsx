import React, { useEffect } from 'react'
import Styles from "../styles/pages/ProfilePage.module.css"
import { Link, useNavigate } from 'react-router-dom'
import AsideBar from "../components/AsideBar/AsideBar"

const ProfilePage = () => {
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
        <div className={Styles.leftContainer}>
        this is profile page
        </div>
        <div className={Styles.rightContainer}>right</div>
      </div>
    </div>
  )
}

export default ProfilePage
