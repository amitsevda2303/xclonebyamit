import { useState } from "react";
import { Mycontext } from "./MyContext";

export default function Context({ children }) {
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [changer, setChanger] = useState("Phone");
  const [display, setdisplay] = useState(false);
  const [modal, setModal] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [data, setData] = useState("");
  const [showType, setshowType] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    year: "",
  });

  const contextValue = {
    changer,
    setChanger,
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
    display,
    setdisplay,
    modal,
    setModal,
    loginStep,
    setLoginStep,
    data,
    setData,
    showType,
    setshowType,
  };

  return (
    <Mycontext.Provider value={contextValue}>{children}</Mycontext.Provider>
  );
}
