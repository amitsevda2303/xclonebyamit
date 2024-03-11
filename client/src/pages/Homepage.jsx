import React, { useContext, useEffect, useRef, useState } from "react";
import Styles from "../styles/pages/HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar/AsideBar";
import { Mycontext } from "../context/MyContext";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Home/Loader";
import EmojiPicker from "emoji-picker-react";
import ClickAwayListener from "react-click-away-listener";
import Postmodal from "../components/Home/Postmodal";
import UserPosts from "../components/Home/UserPosts";
import { ToastContainer, toast } from "react-toastify";
import Right from "../components/Home/Right";

const getData = gql`
  query GetUserDetails($token: String!) {
    getdetails(token: $token) {
      _id
      user
      createdAt {
        month
        year
      }
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

const Homepage = () => {
  const imageDivRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const {allposts, setallposts} = useContext(Mycontext)
  const token = localStorage.getItem("authToken");
  const [inputValue, setInputValue] = useState("");
  const {
    showType,
    setshowType,
    editPostModal,
    setEditPostModal,
    postImage,
    setPostImage,
  } = useContext(Mycontext);
  const uploadedImageUrls = [];
  const [emoji, setEmoji] = useState(false);
  const [currentIndex, setcurrentIndex] = useState(null);

  const handleEmojiClick = (emojiObject) => {
    const { emoji } = emojiObject;
    setInputValue((p) => p + emoji);
    adjustTextareaHeight();
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate , token]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const handlePostImage = (e) => {
    const files = Array.from(e.target.files);
    setPostImage([...postImage, ...files]);
  };


  const removePostImage = (index) => {
    const updatedImages = [...postImage];
    updatedImages.splice(index, 1);
    setPostImage(updatedImages);
  };
  useEffect(() => {
    const handlePostImageDivRatio = () => {
      if (postImage.length >= 1 && imageRef.current && imageDivRef.current) {
        imageDivRef.current.style.marginBlock = "15px";
        imageDivRef.current.style.display = "flex";
        imageDivRef.current.style.flexDirection = "row";
        imageDivRef.current.style.gap = "10px";
        imageDivRef.current.style.transition = ".3s ease";
        imageRef.current.style.minWidth = "48.6%";
        imageRef.current.style.height = "289px";
      }
      if (postImage.length === 0 && imageDivRef.current) {
        // When postImage.length is equal to 0
        imageDivRef.current.style.marginBlock = "0px";
      }
    };
  
    handlePostImageDivRatio(); // Call the function once after defining it
  
    return () => {
      // Cleanup function if needed
    };
  }, [postImage]);
  const scrollLeft = () => {
    if (imageDivRef.current) {
      imageDivRef.current.scrollLeft -= 570; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (imageDivRef.current) {
      imageDivRef.current.scrollLeft += 570; // Adjust the scroll amount as needed
    }
  };
  const calculateRows = (text) => {
    const lines = text.split("\n");
    return lines.length;
  };
  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("customTextarea");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const { loading, error, data, refetch } = useQuery(getData, {
    variables: {
      token: token,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <p>Error fetching user details</p>;
  }

  const userDetails = data.getdetails;

  async function uploadImageToCloudinary(imagePath) {
    try {
      const formData = new FormData();
      formData.append("file", imagePath);
      formData.append("upload_preset", "twitterClone");
  
      const response = await fetch( "https://api.cloudinary.com/v1_1/dv7s9mvys/image/upload", {
        method: 'POST',
        body: formData
      });
  
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }

  async function uploadImages() {
    for (const x of postImage) {
      const imageUrl = await uploadImageToCloudinary(x);
      if (imageUrl) {
        uploadedImageUrls.push(imageUrl);
      }
    }
    postDatainDb()
    return uploadedImageUrls;
  }

  const postDatainDb = async() =>{
    const requestData = {
      title: inputValue,
      post : uploadedImageUrls
    };
    try {
      const api = await fetch(`${process.env.REACT_APP_SERVER_PORT}/postapi/post`,{
        method : "POST",
        headers:{
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      await api.json();
      setallposts(!allposts)
      setInputValue("")
      setPostImage("")
      toast.success("Post uploaded successfully");
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={Styles.homePage}>
      <ToastContainer />
      <AsideBar userDetails={userDetails} />

      <div className={Styles.container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.topDiv}>
            <span className={Styles.leftSpan}>For you</span>
            <span className={Styles.rightSpan}>Following</span>
            <span className={Styles.settings}>
              <Link to={"/logout"}>
                <i className="fa-solid fa-gear"></i>
              </Link>
            </span>
          </div>
          <div className={Styles.maincontainer}>
            <div className={Styles.textareaDiv}>
              <Link to={`/${userDetails._id}`} className={Styles.profileDiv}>
                <img src={userDetails.pfp} alt="" />
              </Link>
              <div className={Styles.textarea}>
                <textarea
                  id="customTextarea"
                  className={Styles.area}
                  value={inputValue}
                  onClick={() => {
                    setshowType(true);
                  }}
                  onChange={handleInputChange}
                  rows={calculateRows(inputValue)}
                  style={{ whiteSpace: "pre-wrap" }}
                  placeholder="What is happening?!"
                  autoFocus={showType}
                ></textarea>
                <input
                  type="file"
                  id="image-input"
                  onChange={handlePostImage}
                />
                {postImage.length >= 3 && (
                  <i
                    className={`fa-solid fa-arrow-left-long ${Styles.leftScroll}`}
                    onClick={scrollLeft}
                  ></i>
                )}
                {postImage && (
                  <div className={Styles.postImageContainer} ref={imageDivRef}>
                    {postImage.map((image, index) => (
                      <div
                        className={Styles.minipostDiv}
                        key={index}
                        ref={imageRef}
                      >
                        <span
                          onClick={() => {
                            setEditPostModal(true);
                          }}
                        >
                          Edit
                        </span>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`img ${index}`}
                          multiple="image/*"
                          onClick={() => {
                            setEditPostModal(true);
                            setcurrentIndex(index);
                          }}
                        />
                        <i
                          className="fa-solid fa-xmark"
                          onClick={() => removePostImage(index)}
                        ></i>
                      </div>
                    ))}
                  </div>
                )}
                {postImage.length >= 3 && (
                  <i
                    className={`fa-solid fa-arrow-right-long ${Styles.rightScroll}`}
                    onClick={scrollRight}
                  ></i>
                )}
                {showType && (
                  <>
                    <span className={Styles.showType}>
                      <i className="fa-solid fa-earth-americas"></i> Everyone
                      can reply
                    </span>
                    <hr />
                  </>
                )}
              </div>
            </div>
            <div className={Styles.maindiv}>
              {emoji && (
                <ClickAwayListener
                  onClickAway={() => {
                    setEmoji(false);
                  }}
                >
                  <div className={Styles.emojiModal}>
                    <EmojiPicker
                      theme="dark"
                      style={{ width: "100%", height: "100%" }}
                      className={Styles.emojiPicker}
                      onEmojiClick={handleEmojiClick}
                    />
                  </div>
                </ClickAwayListener>
              )}

              <div className={Styles.emojiDiv}>
                <label htmlFor={postImage.length === 4 ? "" : "image-input"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      color: "rgb(29, 155, 240)",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    <g>
                      <path
                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "rgb(29, 155, 240)",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "rgb(29, 155, 240)",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <g>
                    <path
                      d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "rgb(29, 155, 240)",
                    width: "25px",
                    height: "25px",
                  }}
                  onClick={() => {
                    setEmoji(true);
                  }}
                >
                  <g>
                    <path
                      d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "rgb(29, 155, 240)",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <g>
                    <path
                      d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "rgb(29, 155, 240)",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <g>
                    <path
                      d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </div>
              <button className={Styles.postBtn} onClick={()=>{uploadImages()}} disabled={inputValue.length === 0}  >Post</button>
            </div>
          </div>
          <UserPosts userDetails={userDetails}/>
        </div>
        <div className={Styles.rightContainer}><Right/></div>
      </div>
      {editPostModal && (
        <Postmodal
          currentIndex={currentIndex}
          setcurrentIndex={setcurrentIndex}
        />
      )}
    </div>
  );
};

export default Homepage;
