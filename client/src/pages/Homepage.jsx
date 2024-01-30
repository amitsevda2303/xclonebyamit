import React, { useEffect } from 'react'
import Styles from "../styles/pages/HomePage.module.css"
import { useNavigate } from 'react-router-dom'

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
      this is HomePage
    </div>
  )
}

export default Homepage
