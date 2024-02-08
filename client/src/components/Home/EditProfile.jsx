import React, { useEffect, useState } from "react";
import Styles from "../../styles/Home/EditProfile.module.css";
import ProfilePage from "../../pages/ProfilePage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Loader from "./Loader";

const getData = gql`
  query GetUserDetails($token: String!) {
    getdetails(token: $token) {
      user
      dob {
        year
        day
        month
      }
    }
  }
`;

const EditProfile = () => {
  const navigate = useNavigate();
  const [editModal, seteditModal] = useState(false);
  const [dobChanger, setdobChanger] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const token = localStorage.getItem("authToken");
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    year: "",
  });
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

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    const handleTabPress = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleTabPress);

    return () => {
      window.removeEventListener("keydown", handleTabPress);
    };
  }, [navigate, token]);

  const setFocus = (id) => {
    setFocusedInput(id);
  };
  const setBlur = () => {
    setFocusedInput(null);
  };

  const { loading, error, data } = useQuery(getData, {
    variables: {
      token: token,
    },
  });

  if (loading) return <Loader />;

  if (error) {
    console.error(error);
    return <p>Error fetching user details</p>;
  }

  const userDetails = data.getdetails;

  console.log(userDetails);
  return (
    <>
      <ProfilePage />

      <div className={Styles.blackbg}>
        <div className={Styles.modalBackdrop}>
          {editModal && (
            <div className={Styles.editModal}>
              <div className={Styles.content}>
                <span className={Styles.heading}>Edit date of birth?</span>
                <span>
                  This can only be changed a few times. Make sure you enter the
                  age of the person using the account.{" "}
                </span>
                <button
                  className={Styles.editButton}
                  onClick={() => {
                    setdobChanger(true);
                    seteditModal(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className={Styles.cancelButton}
                  onClick={() => {
                    seteditModal(false);
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          )}
          <div className={Styles.modalContent}>
            <div className={Styles.topDiv}>
              <div className={Styles.backbtnDiv}>
                <Link to={"/profile"}>
                  <i className="fa-solid fa-xmark"></i>
                </Link>
              </div>
              <div className={Styles.nameDiv}>
                <span className={Styles.Name}>Edit profile</span>
              </div>
              <div className={Styles.saveDiv}>
                <button>Save</button>
              </div>
            </div>

            <div className={Styles.imageDiv}>
              <div className={Styles.bannerDiv}>
                <img
                  src={
                    "https://forums.cubecraftcdn.com/xenforo/data/avatars/o/595/595540.jpg?1695373310"
                  }
                  alt=""
                />
                <div className={Styles.pfpDiv}>
                  <img
                    src={
                      "https://forums.cubecraftcdn.com/xenforo/data/avatars/o/595/595540.jpg?1695373310"
                    }
                    alt=""
                  />
                </div>
              </div>

              <div className={Styles.inputContainer}>
                <div
                  className={Styles.inputDiv}
                  style={{
                    outline:
                      focusedInput === "input1"
                        ? "2px solid #0099ff"
                        : "1px solid  rgba(128, 128, 128, 0.314) ",
                  }}
                >
                  <input
                    className={Styles.input1}
                    autoComplete="off"
                    value={"asdfasdf"}
                    id="name"
                    type="text"
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
                  className={Styles.textareaDiv}
                  style={{
                    outline:
                      focusedInput === "input4"
                        ? "2px solid #0099ff"
                        : "1px solid  rgba(128, 128, 128, 0.314) ",
                  }}
                >
                  <div className={Styles.textarea}>
                    <textarea
                      className={Styles.area}
                      placeholder=""
                      maxLength={150}
                      onFocus={() => {
                        setFocus("input4");
                      }}
                      rows={3}
                      onBlur={setBlur}
                    ></textarea>
                    <label
                      className={Styles.label2}
                      htmlFor="name"
                      style={{
                        color: focusedInput === "input4" ? "#1d9bf0" : "#777",
                      }}
                    >
                      Bio
                    </label>
                  </div>
                </div>
                <div
                  className={Styles.inputDiv}
                  style={{
                    outline:
                      focusedInput === "input2"
                        ? "2px solid #0099ff"
                        : "1px solid  rgba(128, 128, 128, 0.314) ",
                  }}
                >
                  <input
                    className={Styles.input1}
                    autoComplete="off"
                    id="name"
                    type="text"
                    placeholder=""
                    maxLength={50}
                    onFocus={() => {
                      setFocus("input2");
                    }}
                    onBlur={setBlur}
                  />
                  <label
                    className={Styles.label}
                    htmlFor="name"
                    style={{
                      color: focusedInput === "input2" ? "#1d9bf0" : "#777",
                    }}
                  >
                    Location
                  </label>
                </div>
                <div
                  className={Styles.inputDiv}
                  style={{
                    outline:
                      focusedInput === "input3"
                        ? "2px solid #0099ff"
                        : "1px solid  rgba(128, 128, 128, 0.314) ",
                  }}
                >
                  <input
                    className={Styles.input1}
                    autoComplete="off"
                    id="name"
                    type="text"
                    placeholder=""
                    maxLength={50}
                    onFocus={() => {
                      setFocus("input3");
                    }}
                    onBlur={setBlur}
                  />
                  <label
                    className={Styles.label}
                    htmlFor="name"
                    style={{
                      color: focusedInput === "input3" ? "#1d9bf0" : "#777",
                    }}
                  >
                    Website
                  </label>
                </div>

                <div className={Styles.DobDiv}>
                  <span className={Styles.birthSpan}>
                    Birth Date ·{" "}
                    {!dobChanger ? (
                      <Link
                        onClick={() => {
                          seteditModal(true);
                        }}
                      >
                        Edit
                      </Link>
                    ) : (
                      <Link
                        onClick={() => {
                          setSelectedDate({ month: "", day: "", year: "" });
                          setdobChanger(!dobChanger);
                        }}
                      >
                        Cancel
                      </Link>
                    )}
                  </span>

                  {dobChanger ? (
                    <>
                      <span className={Styles.birthSpan}>
                        This should be the date of birth of the person using the
                        account. Even if you’re making an account for your
                        business, event, or cat.
                      </span>
                      <span className={Styles.birthSpan2}>
                        X uses your age to customize your experience, including
                        ads, as explained in our{" "}
                        <Link className={Styles.link}>Privacy Policy</Link>.
                      </span>

                      <div className={Styles.dobContainer}>
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
                                color:
                                  focusedInput === "select1"
                                    ? "#0099ff"
                                    : "#777",
                              }}
                              htmlFor=""
                            >
                              Month
                            </label>
                            <i
                              style={{
                                color:
                                  focusedInput === "select1"
                                    ? "#0099ff"
                                    : "#777",
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
                                color:
                                  focusedInput === "select2"
                                    ? "#0099ff"
                                    : "#777",
                              }}
                              htmlFor=""
                            >
                              day
                            </label>
                            <i
                              style={{
                                color:
                                  focusedInput === "select2"
                                    ? "#0099ff"
                                    : "#777",
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
                                generateDays(
                                  selectedDate.month,
                                  selectedDate.year
                                ).map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                ))}
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
                                color:
                                  focusedInput === "select3"
                                    ? "#0099ff"
                                    : "#777",
                              }}
                              htmlFor=""
                            >
                              Year
                            </label>
                            <i
                              style={{
                                color:
                                  focusedInput === "select3"
                                    ? "#0099ff"
                                    : "#777",
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

                        <div className={Styles.attributesDiv}>
                          <span className={Styles.birthSpan}>Who sees this?</span>

                          
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className={Styles.Dob}>
                      {monthNames[userDetails.dob.month - 1] +
                        " " +
                        userDetails.dob.day +
                        ", " +
                        userDetails.dob.year}
                    </span>
                  )}
                </div>
                {/* <div className={Styles.lastDiv}>hii</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
