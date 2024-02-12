import React, { useEffect, useState } from "react";
import Styles from "../styles/pages/HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar/AsideBar";


const Homepage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const calculateRows = (text) => {
    const lines = text.split('\n');
    return lines.length;
  };
  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("customTextarea");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };


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
                <i className="fa-solid fa-gear"></i>
              </Link>
            </span>
          </div>
          <div className={Styles.maincontainer}>
            <div className={Styles.textareaDiv}>
              <div className={Styles.profileDiv}>
              <Link to={"/profile"}>
              <i className="fa-solid fa-circle-user"></i>
              </Link>
              </div>
              <div className={Styles.textarea}>
              <textarea
                 id="customTextarea"
                 className={Styles.area}
                 value={inputValue}
                 onChange={handleInputChange}
                 rows={calculateRows(inputValue)}
                 style={{ whiteSpace: "pre-wrap" }}
                 placeholder="What is happening?!"
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
