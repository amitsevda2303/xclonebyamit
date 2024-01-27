import React, { isValidElement, useContext, useEffect, useState } from "react";
import Styles from "../../../styles/components/steps/Step1.module.css";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../../context/MyContext";

const Step1 = () => {
  const navigate = useNavigate();

  const [changer, setChanger] = useState("Phone");
  const [focusedInput, setFocusedInput] = useState(null);

  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    loader,
    setLoader,
    step,
    setStep,
    userDetails,
    setUserDetails,
    selectedDate, 
    setSelectedDate,
  } = useContext(Mycontext);

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

  const setFocus = (id) => {
    setFocusedInput(id);
  };
  const setBlur = () => {
    setFocusedInput(null);
  };

  const gotoFirstPage = () => {
    setName("")
    setEmail("")
    setPhone("")
    setSelectedDate({month: "",
    day: "",
    year: "",})
    setStep(1);
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
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 700);
  }, [loader]);

  const setDetails = (e) => {
    e.preventDefault();
    if (changer === "Phone") {
      setUserDetails({
        name: name,
        email: email,
        dob: selectedDate,
      });
    } else {
      setUserDetails({
        name: name,
        mobile: phone,
        dob: selectedDate,
      });
    }
    setStep(2);
  };

  useEffect(() => {
    console.log("Updated userDetails:", userDetails);
  }, [userDetails]);

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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    // Simple example: Allows digits, spaces, and hyphens
    const phoneRegex = /^[0-9\s-]+$/;

    return phoneRegex.test(phone);
  };

  const isDOBSelected = () => {
    return (
      selectedDate.month !== "" &&
      selectedDate.day !== "" &&
      selectedDate.year !== ""
    );
  };

  return (
    <form onSubmit={setDetails} className={Styles.container}>
      {loader ? (
        <div className={Styles.loaderDiv}>
          <span className={Styles.loader}></span>
        </div>
      ) : (
        <>
          <div className={Styles.firstSection}>
            <div className={Styles.backbtn}>
              <i
                onClick={gotoFirstPage}
                className="fa-solid fa-xmark"
                style={{ color: "white" }}
              ></i>
            </div>
            <div className={Styles.para}>
              <h3>Step {step} of 5</h3>
            </div>
            <div></div>
          </div>
          <div className={Styles.secondSection}>
            <div className={Styles.createHeading}>
              <span className={Styles.createHeading}>Create your account</span>
            </div>

            <div
              className={Styles.inputDiv}
              style={{
                outline:
                  focusedInput === "input1"
                    ? "2px solid #0099ff"
                    : "1px solid  rgba(128, 128, 128, 0.314) ",
              }}
            >
              <span className={Styles.counter}>
                {name.length}&nbsp;/&nbsp;50
              </span>
              <input
                className={Styles.input1}
                autoComplete="off"
                autoFocus
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder=""
                maxLength={50}
                onFocus={() => {
                  setFocus("input1");
                }}
                onBlur={setBlur}
              />
              <label
                className={Styles.label}
                htmlFor="name"
                style={{
                  color: focusedInput === "input1" ? "#1d9bf0" : "#777",
                }}
              >
                Name
              </label>
            </div>

            <div
              className={Styles.inputDiv}
              style={{
                outline:
                  focusedInput === "input2"
                    ? "2px solid #0099ff"
                    : "1px solid  rgba(128, 128, 128, 0.314) ",
                paddingBlock: focusedInput === "input1" ? "19px" : "20px",
                paddingInline: focusedInput === "input1" ? "1px" : "2px",
              }}
            >
              <input
                className={Styles.input1}
                autoComplete="off"
                id="email"
                type={changer === "Phone" ? "email" : "number"}
                placeholder=""
                value={changer === "Phone" ? email : phone}
                onChange={(e) => {
                  if (changer === "email") {
                    isEmailValid();
                  }
                  changer === "Phone"
                    ? setEmail(e.target.value)
                    : setPhone(e.target.value);
                }}
                onFocus={() => {
                  setFocus("input2");
                }}
                onBlur={setBlur}
              />
              <label
                id="email"
                className={Styles.label}
                htmlFor="name"
                style={{
                  color: focusedInput === "input2" ? "#1d9bf0" : "#777",
                }}
              >
                {changer === "Phone" ? "Email" : "Phone"}
              </label>
            </div>

            <div className={Styles.changer}>
              <span onClick={changeType}>Use {changer} instead</span>
            </div>
            <div className={Styles.dobContainer}>
              <span className={Styles.dob}>Date of birth</span>
              <span className={Styles.dobDetail}>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </span>

              <div className={Styles.dobselectorDiv}>
                <div
                  className={Styles.selectDiv1}
                  style={{
                    outline:
                      focusedInput === "select1"
                        ? "2px solid #0099ff"
                        : "1px solid rgba(255, 251, 251, 0.199)",
                  }}
                >
                  <label
                    style={{
                      color: focusedInput === "select1" ? "#0099ff" : "#777",
                    }}
                    htmlFor=""
                  >
                    Month
                  </label>
                  <i
                    style={{
                      color: focusedInput === "select1" ? "#0099ff" : "#777",
                    }}
                    className="fa-solid fa-chevron-down"
                  ></i>
                  <select
                    className={Styles.select1}
                    value={selectedDate.month}
                    onChange={handleMonthChange}
                    onFocus={() => {
                      setFocus("select1");
                    }}
                    onBlur={setBlur}
                  >
                    <option disabled>{}</option>
                    {monthNames.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className={Styles.selectDiv2}
                  style={{
                    outline:
                      focusedInput === "select2"
                        ? "2px solid #0099ff"
                        : "1px solid rgba(255, 251, 251, 0.199)",
                  }}
                >
                  <label
                    style={{
                      color: focusedInput === "select2" ? "#0099ff" : "#777",
                    }}
                    htmlFor=""
                  >
                    day
                  </label>
                  <i
                    style={{
                      color: focusedInput === "select2" ? "#0099ff" : "#777",
                    }}
                    className="fa-solid fa-chevron-down"
                  ></i>
                  <select
                    className={Styles.select2}
                    value={selectedDate.day}
                    onChange={handleDayChange}
                    onFocus={() => {
                      setFocus("select2");
                    }}
                    onBlur={setBlur}
                  >
                    <option value="" disabled>
                      {}
                    </option>
                    {selectedDate.month &&
                      generateDays(selectedDate.month, selectedDate.year).map(
                        (day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        )
                      )}
                  </select>
                </div>
                <div
                  className={Styles.selectDiv3}
                  style={{
                    outline:
                      focusedInput === "select3"
                        ? "2px solid #0099ff"
                        : "1px solid rgba(255, 251, 251, 0.199)",
                  }}
                >
                  <label
                    style={{
                      color: focusedInput === "select3" ? "#0099ff" : "#777",
                    }}
                    htmlFor=""
                  >
                    Year
                  </label>
                  <i
                    style={{
                      color: focusedInput === "select3" ? "#0099ff" : "#777",
                    }}
                    className="fa-solid fa-chevron-down"
                  ></i>
                  <select
                    className={Styles.select3}
                    value={selectedDate.year}
                    onChange={handleYearChange}
                    onFocus={() => {
                      setFocus("select3");
                    }}
                    onBlur={setBlur}
                  >
                    <option value="" disabled>
                      {}
                    </option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1920} value={i + 1925}>
                        {i + 1925}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.thirdSection}>
            <button
              disabled={
                (changer === "Phone" &&
                  (!isEmailValid(email) || !isDOBSelected())) ||
                (changer === "Email" && !isValidPhone(phone)) ||
                !isDOBSelected()
              }
              type="submit"
            >
              Next
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Step1;
