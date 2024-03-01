import React, { useEffect, useState } from "react";
import Styles from "../../styles/Home/EditProfile.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
const getData = gql`
  query GetUserDetails($token: String!) {
    getdetails(token: $token) {
      user
      dob {
        year
        day
        month
      }
      pfp
      banner
    }
  }
`;

const EditProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;
  const [editModal, seteditModal] = useState(false);
  const [dobChanger, setdobChanger] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [pfpImage, setpfpImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    month: "",
    day: "",
    year: "",
  });
  const options = [
    "Public",
    "Your followes",
    "People you follow",
    "Only you follow each other",
    "Only ",
  ];
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

  const handlePfpInputChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    setpfpImage(file); // Update state with the selected image file
  };

  const handlebannerInputChange = (event) => {
    const file2 = event.target.files[0]; // Get the first selected file
    setBannerImage(file2); // Update state with the selected image file
  };

  const saveImage = async (e) => {
    e.preventDefault();
    const pfpdata = new FormData();
    const bannerdata = new FormData();
  
    // Check if user uploaded only a profile picture
    if (pfpImage && !bannerImage) {
      pfpdata.append("file", pfpImage);
      pfpdata.append("upload_preset", "twitterClone");
      pfpdata.append("cloud_name", "dv7s9mvys");
    }
  
    // Check if user uploaded only a banner image
    if (bannerImage && !pfpImage) {
      bannerdata.append("file", bannerImage);
      bannerdata.append("upload_preset", "twitterClone");
      bannerdata.append("cloud_name", "dv7s9mvys");
    }
  
    // Check if user uploaded both profile picture and banner image
    if (pfpImage && bannerImage) {
      pfpdata.append("file", pfpImage);
      pfpdata.append("upload_preset", "twitterClone");
      pfpdata.append("cloud_name", "dv7s9mvys");
  
      bannerdata.append("file", bannerImage);
      bannerdata.append("upload_preset", "twitterClone");
      bannerdata.append("cloud_name", "dv7s9mvys");
    }
  
    try {
      if (!pfpImage && !bannerImage) {
        return console.log("Please upload Image 🔴🏮🔴🏮");
      }
  
      // Call the Cloudinary API only if profile picture is uploaded
      if (pfpImage && !bannerImage) {
        const pfpRes = await fetch(
          "https://api.cloudinary.com/v1_1/dv7s9mvys/image/upload",
          {
            method: "POST",
            body: pfpdata,
          }
        );
        const pcloudData = await pfpRes.json();
        const pfpUrl = pfpImage ? pcloudData.url : null;
        await saveIntoDataBase({ pfp: pfpUrl, banner: null })
      }
  
      // Call the Cloudinary API only if banner image is uploaded
      if (bannerImage && !pfpImage) {
        const bannerRes = await fetch(
          "https://api.cloudinary.com/v1_1/dv7s9mvys/image/upload",
          {
            method: "POST",
            body: bannerdata,
          }
        );
        const bcloudData = await bannerRes.json();
        const bannerUrl = bannerImage ? bcloudData.url : null;
        await saveIntoDataBase({banner: bannerUrl })
      }
  
      // Call both Cloudinary APIs if both profile picture and banner image are uploaded
      if (pfpImage && bannerImage) {
        const pfpRes = await fetch(
          "https://api.cloudinary.com/v1_1/dv7s9mvys/image/upload",
          {
            method: "POST",
            body: pfpdata,
          }
        );
        const bannerRes = await fetch(
          "https://api.cloudinary.com/v1_1/dv7s9mvys/image/upload",
          {
            method: "POST",
            body: bannerdata,
          }
        );
  
        const pcloudData = await pfpRes.json();
        const bcloudData = await bannerRes.json();
        const pfpUrl = pfpImage ? pcloudData.url : null;
        const bannerUrl = bannerImage ? bcloudData.url : null;
        await saveIntoDataBase({ pfp: pfpUrl, banner: bannerUrl })
      }
      toast.success("image uploaded successfully");
    } catch (error) {
      console.log("error : ", error);
      toast.error("error occurred!");
    }
  };
  const saveIntoDataBase = async(urlData) =>{
   try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_PORT}/editprofileinfo` , {
      method : "POST",
      headers:{
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(urlData)
    })

    await response.json()
   } catch (error) {
    console.error('Error:', error);
   }
  }

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
 
  return (
    <>

      <div >
        <ToastContainer />
        <div className={Styles.modalBackdrop}>
          {editModal && (
            <div className={Styles.editModal}>
              <div className={Styles.content}>
                <span className={Styles.heading}>Edit date of birth?</span>
                <span>
                  This can only be changed a few times. Make sure you enter the
                  age of the person using the account.
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
                <Link  to={`/${userId}`}>
                  <i className="fa-solid fa-xmark"></i>
                </Link>
              </div>
              <div className={Styles.nameDiv}>
                <span className={Styles.Name}>Edit profile</span>
              </div>
              <div className={Styles.saveDiv}>
                <button onClick={saveImage}>Save</button>
              </div>
            </div>

            <div className={Styles.imageDiv}>
              <div className={Styles.bannerDiv}>
                <div className={Styles.bannerInputDiv}>
                  <input
                    id="banner"
                    className={Styles.bannerInput}
                    type="file"
                    onChange={handlebannerInputChange}
                  />
                  <label htmlFor="banner" className={Styles.bannerLabel}>
                    <i className="fa-solid fa-camera"></i>
                  </label>
                </div>
                <img
                  src={
                    bannerImage
                      ? URL.createObjectURL(bannerImage)
                      : userDetails.banner
                  }
                  alt=""
                />
                <div className={Styles.pfpDiv}>
                  <div className={Styles.pfpInputDiv}>
                    <input
                      id="pfp"
                      className={Styles.pfpInput}
                      type="file"
                      onChange={handlePfpInputChange}
                    />
                    <label htmlFor="pfp" className={Styles.pfpLabel}>
                      <i className="fa-solid fa-camera"></i>
                    </label>
                  </div>
                  <img
                    src={
                      pfpImage ? URL.createObjectURL(pfpImage) : userDetails.pfp
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
                          <span
                            className={Styles.birthSpan}
                            style={{ color: "white" }}
                          >
                            Who sees this?
                          </span>

                          <span>
                            You can control who sees your birthday on X. Learn
                            more
                          </span>

                          <div className={Styles.anotherSelectDiv}>
                            <div
                              className={Styles.selectDiv4}
                              style={{
                                outline:
                                  focusedInput === "select4"
                                    ? "2px solid #0099ff"
                                    : "1px solid rgba(255, 251, 251, 0.199)",
                              }}
                            >
                              <label
                                style={{
                                  color:
                                    focusedInput === "select4"
                                      ? "#0099ff"
                                      : "#777",
                                }}
                                htmlFor=""
                              >
                                Month and day
                              </label>
                              <i
                                style={{
                                  color:
                                    focusedInput === "select4"
                                      ? "#0099ff"
                                      : "#777",
                                }}
                                className="fa-solid fa-chevron-down"
                              ></i>
                              <select
                                className={Styles.select4}
                                onFocus={() => {
                                  setFocus("select4");
                                }}
                                onBlur={setBlur}
                              >
                                <option value="" disabled>
                                  {}
                                </option>
                                {options.map((item, index) => {
                                  return <option key={index}>{item}</option>;
                                })}
                              </select>
                            </div>

                            <div
                              className={Styles.selectDiv4}
                              style={{
                                outline:
                                  focusedInput === "select5"
                                    ? "2px solid #0099ff"
                                    : "1px solid rgba(255, 251, 251, 0.199)",
                              }}
                            >
                              <label
                                style={{
                                  color:
                                    focusedInput === "select5"
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
                                    focusedInput === "select5"
                                      ? "#0099ff"
                                      : "#777",
                                }}
                                className="fa-solid fa-chevron-down"
                              ></i>
                              <select
                                className={Styles.select4}
                                onFocus={() => {
                                  setFocus("select5");
                                }}
                                onBlur={setBlur}
                              >
                                <option value="" disabled>
                                  {}
                                </option>
                                {options.map((item, index) => {
                                  return <option key={index}>{item}</option>;
                                })}
                              </select>
                            </div>
                          </div>
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
              </div>
              <div className={Styles.lastDiv}>
                <div className={Styles.startingSide}>
                  Switch to proffetional
                </div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
