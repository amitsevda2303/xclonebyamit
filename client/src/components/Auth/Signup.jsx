import React, { useContext } from "react";
// import Styles from "../../styles/components/Signup.module.css";
import Step1 from "./steps/Step1";
import { Mycontext } from "../../context/MyContext";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

const Signup = () => {
  const {step,setStep} = useContext(Mycontext)


  return (
        <>
        {step === 1 && <Step1/>}
        {step === 2 && <Step2/>}
        {step === 3 && <Step3/>}
        </>
  );
};

export default Signup;
