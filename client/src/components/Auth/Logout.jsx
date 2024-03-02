import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../styles/components/Logout.module.css"
import image from "../../assets/svg.svg"

const Logout = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  
  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className={Styles.blackbg}>
      <div className={Styles.modalBackdrop}>
        <div className={Styles.modalContent}>
            <div className={Styles.imageDiv}>
                <img src={image} alt="" />
            </div>
            <h3>Log out of X?</h3>
            <span>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </span>
            <button onClick={handleLogout} className={Styles.logoutBtn}>Logout</button>
            <Link to="#" onClick={() => navigate(-1)} className={Styles.cancelBtn}>Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
