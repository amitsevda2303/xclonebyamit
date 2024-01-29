import React, { useContext, useState } from "react";
import Styles from "../../../styles/components/steps/Step4.module.css";
import { Mycontext } from "../../../context/MyContext";

const Step4 = () => {
  const { step, setdisplay, setStep,changer,email,phone } = useContext(Mycontext);
  const [focusedInput, setFocusedInput] = useState(null);
  const [otp,setOtp] = useState("")
  const verificationCode = "696969"


  const setFocus = (id) => {
    setFocusedInput(id);
  };
  const setBlur = () => {
    setFocusedInput(null);
  }
  const gotoStep5 = () =>{
    setStep(5)
  }


  return (
    <form className={StyleSheet.container}>
      <div className={Styles.firstSection}>
        <div className={Styles.backbtn}>
          <i
            onClick={() => {
              setdisplay(false);
              setStep(99);
            }}
            className="fa-solid fa-arrow-left"
            style={{ color: "white" }}
          ></i>
        </div>
        <div className={Styles.para}>
          <h3>Step {step} of 5</h3>
        </div>
      </div>

      <div className={Styles.secondSection}>
      <span className={Styles.createHeading}>
            We sent you a code 696969
          <div className={Styles.anotherDiv}>
        Enter it below to verify {changer === "Phone" ? email : phone}
        </div>
          </span>

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
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
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
                Verification code
              </label>
            </div>
            <div className={Styles.changer}>
              <span>Didn't receive SMS?</span>
            </div>
      </div>
      <div className={Styles.thirdSection}>
        <button onClick={gotoStep5} disabled={otp !== verificationCode} type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step4;
