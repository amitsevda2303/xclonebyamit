import React, { useEffect } from "react";
import Styles from "../styles/pages/ProfilePage.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import AsideBar from "../components/AsideBar/AsideBar";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Home/Loader";
import userimage from "../assets/pfp.png";
import board from "../assets/banner2.jpg";
import Userpost from "../components/Profile/Userpost";
 import {jwtDecode}  from "jwt-decode";

const getData = gql`
  query Query($getOneUserDataId: ID!, $token: String) {
    getOneUserData(id: $getOneUserDataId, token: $token) {
      user
      dob {
        year
        day
        month
      }
      pfp
      banner
      createdAt {
        date
        month
        year
      }
    }
  }
`;

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { id } = useParams();
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;
  

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

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

  const { loading, error, data, refetch } = useQuery(getData, {
    variables: {
      token: token,
      getOneUserDataId: id,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch(); // Refetch data every time the component mounts or the token changes
  }, [refetch]);

  useEffect(() => {
    if (error) {
      navigate("*");
    }
  }, [error, navigate]);
  if (loading) {
    return <Loader />; // Or any other loading indicator
  }


  const userDetails = data.getOneUserData;
  if (!userDetails) {
    return <div>Error: User data not found</div>;
  }

  return (
    <div className={Styles.homePage}>
      <AsideBar userDetails={userDetails} />

      <div className={Styles.container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.topdiv}>
            <div className={Styles.backbtnDiv}>
              <Link to={"/home"}>
                <i className="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>
            <div className={Styles.nameDiv}>
              <span className={Styles.Name}>{userDetails.user}</span>
              <span className={Styles.post}>0 posts</span>
            </div>
          </div>

          <div className={Styles.informationDiv}>
            <div className={Styles.bannerDiv}>
              {userDetails.banner ? (
                <img src={userDetails.banner} alt="" />
              ) : (
                <img src={board} alt="" />
              )}

              <div className={Styles.userPfp}>
                {userDetails.pfp ? (
                  <img src={userDetails.pfp} alt="" />
                ) : (
                  <img src={userimage} alt="" />
                )}
              </div>
            </div>

            <div className={Styles.infoDiv}>
              <div className={Styles.editDiv}>
                {userId === id ? (
                  <Link
                    className={Styles.editProfileDiv}
                    to={`/${userId}/edit`}
                  >
                    <span>
                      {" "}
                      {userDetails.pfp ? "Edit Profile" : "Set up profile"}
                    </span>
                  </Link>
                ) : (
                  <Link
                    className={Styles.editProfileDiv}
                  >
                    <span>
                      Follow
                    </span>
                  </Link>
                )}
              </div>
              <div className={Styles.nameidContainer}>
                <span className={Styles.Name}>{userDetails.user}</span>
                <span className={Styles.id}>@YourUniqueNameWillBeHere</span>
              </div>

              <div className={Styles.dateOfBirth}>
                <span>
                  <i className="fa-solid fa-calendar-days"></i>&nbsp; Joined{" "}
                  {monthNames[userDetails.createdAt.month - 1] +
                    " " +
                    userDetails.createdAt.year}
                </span>
              </div>
              <div className={Styles.fameDiv}>
                <span>
                  <p>8M</p> Following
                </span>
                <span>
                  <p>0</p> Followers
                </span>
              </div>
            </div>
            <div className={Styles.lastDiv}>
              <Link className={Styles.links}>Posts</Link>
              <Link className={Styles.links}>Replies</Link>
              <Link className={Styles.links}>Highlights</Link>
              <Link className={Styles.links}>Media</Link>
              <Link className={Styles.links}>Likes</Link>
            </div>
          </div>
          <div className={Styles.bottomContainer}>
            <Userpost userDetails={userDetails} />
          </div>
        </div>
        <div className={Styles.rightContainer}>right</div>
      </div>
    </div>
  );
};

export default ProfilePage;
