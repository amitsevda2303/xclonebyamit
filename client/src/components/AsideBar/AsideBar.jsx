import React, { useEffect } from 'react'
import Styles from "../../styles/components/AsideBars/Asidebar.module.css"
import { useNavigate } from 'react-router-dom'

const AsideBar = () => {
    const navigate = useNavigate()
    const logoutFunc = ()=>{
        localStorage.clear();
        navigate("/")
    }

    useEffect(() => {
      if (!localStorage.getItem("authToken")) {
        navigate("/")        
      }
    }, [])
    
  return (
    <div className={Styles.container}>
      this is Aside Bar
      <button onClick={logoutFunc}>log out</button>
    </div>
  )
}

export default AsideBar
