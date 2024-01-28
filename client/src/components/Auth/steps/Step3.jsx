import React, { useContext } from "react";
import { Mycontext } from "../../../context/MyContext";
import Styles from "../../../styles/components/steps/Step3.module.css";

const Step3 = () => {
  const {name, step, setStep,changer, email, phone,selectedDate } = useContext(Mycontext);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <form className={Styles.container}>
      <div className={Styles.firstSection}>
        <div className={Styles.backbtn}>
          <i
            onClick={() => {
              setStep(2);
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
        <div className={Styles.createHeading}>
          <span className={Styles.createHeading}>Create your account</span>
        </div>

        <div
              className={Styles.inputDiv}
            >
              <span className={Styles.check}>
              <i className="fa-solid fa-circle-check"></i>
              </span>
              <input
                className={Styles.input1}
                autoComplete="off"
                id="name"
                type="text"
                value={name}
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                placeholder=""
              />
              <label
                className={Styles.label}
                htmlFor="name"
              >
                Name
              </label>
            </div>

            <div
              className={Styles.inputDiv}
            >
               <span className={Styles.check}>
              <i className="fa-solid fa-circle-check"></i>
              </span>
              <input
                className={Styles.input1}
                autoComplete="off"
                id="email"
                type={changer === "Phone" ? "email" : "number"}
                placeholder=""
                value={changer === "Phone" ? email : phone}
                // onChange={(e) => {
                //   changer === "Phone"
                //     ? setEmail(e.target.value)
                //     : setPhone(e.target.value);
                // }}
              />
              <label
                id="email"
                className={Styles.label}
                htmlFor="email"
              >
                {changer === "Phone" ? "Email" : "Phone"}
              </label>
            </div>
            <div
              className={Styles.inputDiv}
            >
               <span className={Styles.check}>
              <i className="fa-solid fa-circle-check"></i>
              </span>
              <input
                className={Styles.input1}
                autoComplete="off"
                id="email"
                type="text"
                placeholder=""
                value={` ${selectedDate.month !== "" ? monthNames[selectedDate.month - 1].substring(0,3) : ""} ${selectedDate.day}, ${selectedDate.year}`}
                // onChange={(e) => {
                //   changer === "Phone"
                //     ? setEmail(e.target.value)
                //     : setPhone(e.target.value);
                // }}
              />
              <label
                id="email"
                className={Styles.label}
                htmlFor="email"
              >
                Date of birth
              </label>
            </div>

      </div>

      <div className={Styles.thirdSection}>
        <div className={Styles.paragraph}>
          By signing up, you agree to the <a href="/">Terms of Service</a> and{" "}
          <a href="/">Privacy Policy</a>, including <a href="/">Cookie Use</a>.
          X may use your contact information, including your email address and
          phone number for purposes outlined in our Privacy Policy, like keeping
          your account secure and personalizing our services, including ads.{" "}
          <a href="/">Learn more</a>. Others will be able to find you by email
          or phone number, when provided, unless you choose otherwise
          <a href="/">here</a>.
        </div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  );
};

export default Step3;
