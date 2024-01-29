import React, { useContext, useState } from "react";
import { Mycontext } from "../../../context/MyContext";
import Styles from "../../../styles/components/steps/Step5.module.css";

const Step5 = () => {
  const { step } = useContext(Mycontext);
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const setFocus = (id) => {
    setFocusedInput(id);
  };
  const setBlur = () => {
    setFocusedInput(null);
  };
  return (
    <form className={Styles.container}>
      <>
        <div className={Styles.firstSection}>
          <div className={Styles.para}>
            <h3>Step {step} of 5</h3>
          </div>
          <div></div>
        </div>
        <div className={Styles.secondSection}>
          <div className={Styles.createHeading}>
            <span className={Styles.createHeading}>You'll need a password</span>
            <p>Make sure it’s 8 characters or more.</p>
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
  );
};

export default Step5;
