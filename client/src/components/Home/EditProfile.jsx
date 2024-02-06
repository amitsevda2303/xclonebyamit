import React, { useEffect, useState } from "react";
import Styles from "../../styles/Home/EditProfile.module.css";
import ProfilePage from "../../pages/ProfilePage";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
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
  const [dobChanger, setdobChanger] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const token = localStorage.getItem("authToken");
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

  const gotoProfilePage = () => {
    navigate("/profile");
  };
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
          <ClickAwayListener onClickAway={gotoProfilePage}>
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
                      <Link
                        onClick={() => {
                          setdobChanger(!dobChanger);
                        }}
                      >
                        {dobChanger ? "Cancel" : "Edit"}
                      </Link>
                    </span>

                    {dobChanger ? (
                      <>
                        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, beatae? Repudiandae libero suscipit, autem eos maiores possimus vel reprehenderit dolorum, natus odio porro atque et at minima quia? Laborum modi aspernatur consequatur nostrum nisi facilis iure explicabo earum aperiam repudiandae? Qui dolorem veritatis atque placeat. Similique, corporis ex? Nostrum harum, cumque laborum quidem adipisci fugiat blanditiis modi provident sed nulla, molestias, sint qui earum? Necessitatibus aliquid placeat dolorem animi libero repellendus dolores quidem labore dolorum, et voluptas nisi expedita. Minima dicta, quod ullam reiciendis esse ipsam excepturi eligendi corporis labore molestiae laborum harum, ex ratione iusto repellendus! Reprehenderit, velit inventore!</span>
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
          </ClickAwayListener>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
