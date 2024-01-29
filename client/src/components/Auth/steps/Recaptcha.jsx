import React, { useContext} from 'react'
import Styles from "../../../styles/components/steps/Recaptcha.module.css"
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import { Mycontext } from '../../../context/MyContext';

const Recaptcha = () => {
  const secretkey = process.env.REACT_APP_SECERET_KEY;
    const navigate = useNavigate();
    const {setStep,setName,setEmail,setPhone,setSelectedDate,display, setdisplay } = useContext(Mycontext)
    
    function onChange(value) {
        console.log("Captcha value:", value);
        setdisplay(!display)
      }
      const gotoStep4 = () =>{
        setStep(4)
      }
  return (
    <form onSubmit={gotoStep4} className={StyleSheet.container}>
        <div className={Styles.firstSection}>
        <div className={Styles.backbtn}>
          <i
            onClick={() => {
                setName("");
                setEmail("");
                setPhone("");
                setSelectedDate({ month: "", day: "", year: "" });
                setStep(1)
                setdisplay(false)
                navigate("/")
            }}
            className="fa-solid fa-xmark"
            style={{ color: "white" }}
          ></i>
        </div>
        <div className={Styles.para}>
          <h3>X</h3>
        </div>
        </div>
        <div className={Styles.secondSection}>
        <ReCAPTCHA
    sitekey={secretkey}
    onChange={onChange}
  />
        </div>
        {display?<div className={Styles.thirdSection}>
        <button type="submit">Next</button>
      </div>:""}
    </form>
  )
}

export default Recaptcha
