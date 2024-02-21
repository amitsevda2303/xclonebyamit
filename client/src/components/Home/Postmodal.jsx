import React, { useContext, useRef, useState } from "react";
import Styles from "../../styles/Home/Postmodal.module.css";
import { Mycontext } from "../../context/MyContext";

const Postmodal = () => {
  const imageRef = useRef()
  const { setEditPostModal, postImage } = useContext(Mycontext);
  const [zoom, setZoom] = useState(0);
  const [work, setwork] = useState("work");

  const handleZoom = (e) => {
     const zoomValue = parseFloat(e.target.value);
    setZoom(zoomValue);
    console.log(zoomValue)
    if (imageRef.current) {
      imageRef.current.style.transition = ".3s ease"
      imageRef.current.style.transform = `scale(${zoomValue})`; // Adjust image scale based on zoom value
    } 
  };

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modalContent}>
        <div className={Styles.topDiv}>
          <div className={Styles.backbtnDiv}>
            <a
              onClick={() => {
                setEditPostModal(false);
              }}
            >
              <i className="fa-solid fa-arrow-left-long"></i>
            </a>
          </div>
          <div className={Styles.nameDiv}>
            <span className={Styles.Name}>Crop media</span>
          </div>
          <div className={Styles.saveDiv}>
            <button>Save</button>
          </div>
        </div>

        <div className={Styles.selectorDiv}>
          <div className={Styles.tasks} onClick={() => setwork("work")}>
            <span
              style={
                work === "work"
                  ? { borderBottom: "5px solid #1d9bf0" }
                  : { borderBottom: "0px" }
              }
            >
              <i className="fa-solid fa-crop-simple"></i>
            </span>
          </div>
          <div className={Styles.tasks} onClick={() => setwork("des")}>
            <span
              style={
                work === "des"
                  ? { borderBottom: "5px solid #1d9bf0" }
                  : { borderBottom: "0px" }
              }
            >
              ALT
            </span>
          </div>
          <div className={Styles.tasks} onClick={() => setwork("tag")}>
            <span
              style={
                work === "tag"
                  ? { borderBottom: "5px solid #1d9bf0" }
                  : { borderBottom: "0px" }
              }
            >
              <i className="fa-regular fa-flag"></i>
            </span>
          </div>
        </div>
        <div
          className={`${
            work === "work"
              ? Styles.workdiv
              : work === "des"
              ? Styles.desClass
              : Styles.tagClass
          }`}
        >
          {postImage.map((file, index) => (
            <img key={index} ref={imageRef} src={URL.createObjectURL(file)} alt={file.name} />
          ))}
        </div>
        {work === "work" && (
          <div className={Styles.lastDiv}>
            <div className={Styles.cropMedia}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#71767b",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <g>
                    <path
                      d="M3 7.5C3 6.119 4.119 5 5.5 5h13C19.881 5 21 6.119 21 7.5v9c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 19 3 17.881 3 16.5v-9zM5.5 7c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5h-13z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#71767b",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <g>
                    <path
                      d="M3 9.5C3 8.119 4.119 7 5.5 7h13C19.881 7 21 8.119 21 9.5v5c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 17 3 15.881 3 14.5v-5zM5.5 9c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-5c0-.276-.224-.5-.5-.5h-13z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#71767b",
                    width: "34px",
                    height: "34px",
                  }}
                >
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <div className={Styles.rangeDiv}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#71767b",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <g>
                    <path
                      d="M11 4c-3.87 0-7 3.13-7 7s3.13 7 7 7c1.93 0 3.68-.78 4.95-2.05C17.21 14.68 18 12.93 18 11c0-3.87-3.14-7-7-7zm-9 7c0-4.97 4.03-9 9-9s9 4.03 9 9c0 2.12-.74 4.08-1.97 5.62l3.68 3.67-1.42 1.42-3.67-3.68C15.08 19.26 13.12 20 11 20c-4.97 0-9-4.03-9-9zm12.5 1h-7v-2h7v2z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
              <input min="1" max="50" value={zoom} onChange={handleZoom} type="range" />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    color: "#71767b",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <g>
                    <path
                      d="M11 4c-3.87 0-7 3.13-7 7s3.13 7 7 7c1.93 0 3.68-.78 4.95-2.05C17.21 14.68 18 12.93 18 11c0-3.87-3.14-7-7-7zm-9 7c0-4.97 4.03-9 9-9s9 4.03 9 9c0 2.12-.74 4.08-1.97 5.62l3.68 3.67-1.42 1.42-3.67-3.68C15.08 19.26 13.12 20 11 20c-4.97 0-9-4.03-9-9zm8-1V7.5h2V10h2.5v2H12v2.5h-2V12H7.5v-2H10z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Postmodal;
