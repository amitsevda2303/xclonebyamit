import { useState } from "react";
import { Mycontext } from "./MyContext";

export default function Context({ children }) {
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});

  const contextValue = {
    loader,
    setLoader,
    step,
    setStep,
    userDetails,
    setUserDetails,
  };

  return (
    <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
  );
}
