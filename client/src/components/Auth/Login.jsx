import React, { useContext } from "react";
import Step1 from "./Loginsteps/Step1";
import { Mycontext } from "../../context/MyContext";
import Step2 from "./Loginsteps/Step2";

const Login = () => {
  const { loginStep } = useContext(Mycontext);

  return (
    <>{loginStep === 1 && <Step1/>}
    {loginStep === 2 && <Step2/>} 
    </>
  );
};

export default Login;
