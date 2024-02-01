import React, { useEffect } from "react";
import Styles from "../styles/pages/HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar/AsideBar";

const Homepage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className={Styles.homePage}>
      <AsideBar />

      <div className={Styles.container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.topDiv}>
            <span className={Styles.leftSpan}>For you</span>
            <span className={Styles.rightSpan}>Following</span>
            <span className={Styles.settings}>
              <Link>
                <i class="fa-solid fa-gear"></i>
              </Link>
            </span>
          </div>
          <div className={Styles.maincontainer}>
            <div className={Styles.textareaDiv}>
              <i class="fa-solid fa-circle-user"></i>
              <div className={Styles.textarea}>
                <textarea
                  placeholder="what is happening?"
                  cols="70"
                  rows="1"
                  resize="none"
                ></textarea>
              </div>
            </div>
            <div className={Styles.emojiDiv}>bottom</div>
          </div>
        </div>
        <div className={Styles.rightContainer}>right</div>
      </div>
    </div>
  );
};

export default Homepage;
