import React, { useContext } from "react";
// import Styles from "../../styles/components/Signup.module.css";
import Step1 from "./steps/Step1";
import { Mycontext } from "../../context/MyContext";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";

const Signup = () => {
  const {step} = useContext(Mycontext)


  return (
        <>
        {step === 1 && <Step1/>}
        {step === 2 && <Step2/>}
        {step === 3 && <Step3/>}
        {step === 4 && <Step4/>}
        {step === 5 && <Step5/>}
        </>
  );
};

export default Signup;
