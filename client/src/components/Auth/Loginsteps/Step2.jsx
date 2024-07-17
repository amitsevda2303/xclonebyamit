import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../../context/MyContext";
import Styles from "../../../styles/components/Loginsteps/Step2.module.css";
import logo from "../../../assets/svg.svg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from 'react-hot-toast';

const Step2 = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setData, setLoginStep, data } = useContext(Mycontext);
  const backFunc = () => {
    setLoginStep(1);
    setData("");
    navigate("/");
  };
  const setFocus = (id) => {
    setFocusedInput(id);
  };
  const setBlur = () => {
    setFocusedInput(null);
  };

  const finalSubmit = async (e) => {
    e.preventDefault();
  
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const result = await fetch(
            `${process.env.REACT_APP_SERVER_PORT}/auth/loginUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content: data, password: password }),
            }
          );
          const response = await result.json();
          if (response.success) {
            toast.success("Authenticated");
            const token = response.authToken;
            localStorage.setItem("authToken", token);
            navigate("/home");
            setData("");
            setPassword("");
            setLoginStep(1)
            resolve("Logged In Successfully!", {
              icon: "👏",
            });
          } else if (response.error) { // changed from json.error to response.error
            reject(response.error);
          } else {
            reject("An unknown error occurred!");
          }
        } catch (error) {
          reject(error); // Catch any other unexpected errors
        }
      }),
      {
        loading: "Logging In...",
        success: (data) => data,
        error: (error) => error,
      }
    );
  };

  return (
    <>
      <Toaster  position="top-right"
  reverseOrder={false} />
      <form onSubmit={finalSubmit} className={Styles.container}>
        <>
          <div className={Styles.firstSection}>
            <div className={Styles.backbtn}>
              <i
                onClick={backFunc}
                className="fa-solid fa-xmark"
                style={{ color: "white" }}
              ></i>
            </div>
            <div className={Styles.para}>
              <img src={logo} alt="" />
            </div>
          </div>
          <div className={Styles.secondSection}>
            <div className={Styles.createHeading}>
              <span className={Styles.createHeading}>Enter your password</span>
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder=""
                maxLength={50}
                onFocus={() => {
                  setFocus("input1");
                }}
                onBlur={setBlur}
              />
              <label
                className={Styles.label}
                htmlFor="name"
                style={{
                  color: focusedInput === "input1" ? "#1d9bf0" : "#777",
                }}
              >
                Password
              </label>
            </div>
          </div>
          <div className={Styles.thirdSection}>
            <button type="submit">Next</button>
          </div>
        </>
      </form>
    </>
  );
};

export default Step2;
