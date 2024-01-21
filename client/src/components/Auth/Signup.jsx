import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../../styles/components/Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();

  const gotoFirstPage = () => {
    navigate("/");
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.firstSection}>
        <div className={Styles.backbtn}>
          <i
            onClick={gotoFirstPage}
            class="fa-solid fa-xmark"
            style={{ color: "white" }}
          ></i>
        </div>
        <div className={Styles.para}>
          <h3>Step 1 of 5</h3>
        </div>
        <div></div>
      </div>
      <div className={Styles.secondSection}>
        <span className={Styles.createHeading}>Create your account</span>
        <div className={Styles.inputDiv}>asd</div>
        <div className={Styles.inputDiv}>asd</div>
        <div className={Styles.changer}>
          <a href="/">Use Phone instead</a>
        </div>
        <div className={Styles.dobContainer}>

        <span className={Styles.dob}>Date of birth</span>
        <span className={Styles.dobDetail}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</span>

        <div className={Styles.dobselectorDiv}>
          <div className={Styles.selectDiv1}>month</div>
          <div className={Styles.selectDiv2}>day</div>
          <div className={Styles.selectDiv3}>Year</div>
        </div>
        </div>

      </div>
      <div className={Styles.thirdSection}>
        <button disabled>Next</button>
      </div>
    </div>
  );
};

export default Signup;
