import React, { useEffect } from 'react'
import Styles from "../../styles/Home/EditProfile.module.css"
import ProfilePage from '../../pages/ProfilePage';
import { useNavigate } from 'react-router-dom';
import ClickAwayListener from 'react-click-away-listener';
import {Link} from "react-router-dom"


const EditProfile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    useEffect(() => {
        if (!token) {
          navigate('/');
        }
    
        const handleTabPress = (event) => {
          if (event.key === 'Tab') {
            event.preventDefault();
          }
        };
    
        window.addEventListener('keydown', handleTabPress);
    
        return () => {
          window.removeEventListener('keydown', handleTabPress);
        };
      }, [navigate, token]);

      const gotoProfilePage = () =>{
        navigate("/profile")
      }
    
  return (
<>
      <ProfilePage/>

      <div className={Styles.blackbg}>
        <div className={Styles.modalBackdrop}>
      <ClickAwayListener onClickAway={gotoProfilePage}>
            <div className={Styles.modalContent}>
                <div className={Styles.topDiv}>
                <div className={Styles.backbtnDiv}>
              <Link to={"/profile"}>
                <i className="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>
            <div className={Styles.nameDiv}>
              <span className={Styles.Name}>
Edit profile</span>
            </div>
            <div className={Styles.saveDiv}>
              <button>Save</button>
            </div>
                </div>
            </div>
        </ClickAwayListener>
        </div>
    </div>
</>

  )
}

export default EditProfile
