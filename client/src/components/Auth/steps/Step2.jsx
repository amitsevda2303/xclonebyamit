import React, { useContext } from "react";
import { Mycontext } from "../../../context/MyContext";
import Styles from "../../../styles/components/steps/Step2.module.css";

const Step2 = () => {
  const { step, setStep } = useContext(Mycontext);
  const nextSubmit =() =>{
    setStep(3)
  }
  return (
    <form onSubmit={nextSubmit} className={Styles.container}>
      <div className={Styles.firstSection}>
        <div className={Styles.backbtn}>
          <i
            onClick={() => {
              setStep(1);
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
            Customize your experience
          </span>

        <div className={Styles.anotherDiv}>
        Track where you see X content across the web
        </div>

        <div className={Styles.cheacker}>
            <div className={Styles.paragraph}>X uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.</div>
           <div> <input className={Styles.checkBox} defaultChecked type="checkbox" /></div>
        </div>

        <div className={Styles.info}>
        By signing up, you agree to our <a className={Styles.anchor} href="/">Terms</a>, <a className={Styles.anchor} href="/">Privacy Policy</a>, and <a className={Styles.anchor} href="/">Cookie Use</a>. X may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <a className={Styles.anchor} href="/">Learn more</a>
        </div>

      </div>
      <div className={Styles.thirdSection}>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step2;
