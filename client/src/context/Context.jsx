import { useState } from "react";
import { Mycontext } from "./MyContext";

export default function Context({ children }) {
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    year: "",
  });

  const contextValue = {
    loader,
    setLoader,
    step,
    setStep,
    userDetails,
    setUserDetails,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    selectedDate,
    setSelectedDate,
  };

  return (
    <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
  );
}
