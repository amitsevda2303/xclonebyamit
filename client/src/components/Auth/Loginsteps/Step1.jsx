import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../../../styles/components/Loginsteps/Step1.module.css";
import logo from "../../../assets/svg.svg";
import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";
import { Link } from "react-router-dom";
import { Mycontext } from "../../../context/MyContext";

const Step1 = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const { loader, setLoader, loginStep, setLoginStep,data, setData } = useContext(Mycontext);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }, [loader]);

  const gotoFirstPage = () => {
    setData("")
    navigate("/");
  };

  const setFocus = (id) => {
    setFocusedInput(id);
  };
  const setBlur = () => {
    setFocusedInput(null);
  };

  const submitFunction = (e) => {
    e.preventDefault();
    setLoginStep(2)
  };
  return (
    <form onSubmit={submitFunction} className={Styles.container}>
      {loader ? (
        <div className={Styles.loaderDiv}>
          <span className={Styles.loader}></span>
        </div>
      ) : (
        <>
          <div className={Styles.firstSection}>
            <div className={Styles.backbtn}>
              <i
                onClick={gotoFirstPage}
                className="fa-solid fa-xmark"
                style={{ color: "white" }}
              ></i>
            </div>
            <div className={Styles.para}>
              <img src={logo} alt="" />
            </div>
          </div>
          <div className={Styles.secondSection}>
            <div className={Styles.heading}>
              <h3>Sign in to X</h3>

              <div className={Styles.buttons}>
                <button className={Styles.btn1}>
                  {" "}
                  <img className={Styles.googleImage} src={google} alt="" />
                  Sign in with Google
                </button>
                <button className={Styles.btn2}>
                  {" "}
                  <img className={Styles.googleImage} src={apple} alt="" />
                  Sign in with Apple
                </button>
                <div className={Styles.partition}>
                  <hr className={Styles.hrTag} />
                  <span className={Styles.or}> or </span>
                  <hr className={Styles.hrTag} />
                </div>
              </div>

              <div
                className={Styles.inputDiv}
                style={{
                  outline:
                    focusedInput === "input1"
                      ? "2px solid #0099ff"
                      : "1px solid  rgba(128, 128, 128, 0.314) ",
                }}
              >
                <input
                  className={Styles.input1}
                  autoComplete="off"
                  autoFocus
                  id="name"
                  type="text"
                  placeholder=""
                  maxLength={50}
                  onFocus={() => {
                    setFocus("input1");
                  }}
                  onBlur={setBlur}
                  value={data}
                  onChange={(e)=>{
                    setData(e.target.value)
                  }}
                />
                <label
                  className={Styles.label}
                  htmlFor="name"
                  style={{
                    color: focusedInput === "input1" ? "#1d9bf0" : "#777",
                  }}
                >
                  Phone, email, or username
                </label>
              </div>

              <button className={Styles.nextBtn} type="submit">
                Next
              </button>
              <button className={Styles.forgetBtn} type="submit">
                forget password
              </button>

              <span className={Styles.lastSpan}>
                Don't have an account? <Link>Sign up</Link>
              </span>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default Step1;
