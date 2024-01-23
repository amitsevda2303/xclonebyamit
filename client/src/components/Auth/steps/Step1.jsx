import React, {  useState } from "react";
import Styles from "../../../styles/components/steps/Step1.module.css";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [changer, setChanger] = useState("Phone");
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    year: "",
  });
  const currentYear = new Date().getFullYear();

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


  const gotoFirstPage = () => {
    navigate("/");
  };
  const changeType = () => {
    if (changer === "Phone") {
      setChanger("Email");
      setPhone("");
      setEmail("");
    } else {
      setChanger("Phone");
      setEmail("");
      setPhone("");
    }
  };

  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handleMonthChange = (e) => {
    setSelectedDate({
      ...selectedDate,
      month: e.target.value,
      day: "",
    });
  };

  const handleDayChange = (e) => {
    setSelectedDate({
      ...selectedDate,
      day: e.target.value,
    });
  };

  const handleYearChange = (e) => {
    setSelectedDate({
      ...selectedDate,
      year: e.target.value,
    });
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
        <div className={Styles.createHeading}>
          <span className={Styles.createHeading}>Create your account</span>
        </div>
        <div className={Styles.inputDiv}>

          <span className={Styles.counter}>{name.length}&nbsp;/&nbsp;50</span>
          <input
            className={Styles.input1}
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder=""
            maxLength={50}
          />
          <label className={Styles.label} htmlFor="name">
            Name
          </label>
        </div>
        <div className={Styles.inputDiv}>
          <input
            className={Styles.input1}
            id="email"
            type={changer === "Phone" ? "email" : "number"}
            placeholder=""
            value={changer === "Phone" ? email : phone}
            onChange={(e) => {
              changer === "Phone"
                ? setEmail(e.target.value)
                : setPhone(e.target.value);
            }}
          />
          <label id="email" className={Styles.label} htmlFor="name">
            {changer === "Phone" ? "Email" : "Phone"}
          </label>
        </div>
        <div className={Styles.changer}>
          <span onClick={changeType}>Use {changer} instead</span>
        </div>
        <div className={Styles.dobContainer}>
          <span className={Styles.dob}>Date of birth</span>
          <span className={Styles.dobDetail}>
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </span>

          <div className={Styles.dobselectorDiv}>
            <div className={Styles.selectDiv1}>
              <label htmlFor="">Month</label>
              <i class="fa-solid fa-chevron-down"></i>
               <select
                className={Styles.select1}
                value={selectedDate.month}
                onChange={handleMonthChange}
              >
                <option   disabled>
                  {}
                </option>
                {monthNames.map((month, index) => (
                  <option  key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select></div>
            <div className={Styles.selectDiv2}>
            <label htmlFor="">day</label>
            <i class="fa-solid fa-chevron-down"></i>
               <select
                className={Styles.select2}
                value={selectedDate.day}
                onChange={handleDayChange}
              >
                <option value="" disabled>
                  {}
                </option>
                {selectedDate.month &&
                  generateDays(selectedDate.month, selectedDate.year).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
              </select></div>
            <div className={Styles.selectDiv3}>
            <label htmlFor="">Year</label>
            <i class="fa-solid fa-chevron-down"></i>
              <select
                className={Styles.select3}
                value={selectedDate.year}
                onChange={handleYearChange}
              >
                <option value="" disabled>
                  {}
                </option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1920} value={i + 1920}>
                    {i + 1920}
                  </option>
                ))}
              </select></div>
          </div>
        </div>
      </div>
      <div className={Styles.thirdSection}>
        <button disabled>Next</button>
      </div>
    </div>
  );
};

export default Step1;
