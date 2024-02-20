import React, { useContext, useState } from "react";
import Styles from "../../styles/Home/Postmodal.module.css";
import { Mycontext } from "../../context/MyContext";
import { Link } from "react-router-dom";

const Postmodal = () => {
  const { setEditPostModal, postImage } = useContext(Mycontext);
  const [work, setwork] = useState("work");
  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modalContent}>
        <div className={Styles.topDiv}>
          <div className={Styles.backbtnDiv}>
            <Link
              onClick={() => {
                setEditPostModal(false);
              }}
            >
              <i className="fa-solid fa-arrow-left-long"></i>
            </Link>
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
            <img key={index} src={URL.createObjectURL(file)} alt={file.name} />
          ))}
        </div>
        {work === "work" && (
          <div className={Styles.lastDiv}>
            <div>
              <span>one </span>
              <span>tow</span>
              <span>three</span>
            </div>
            <div className="rangeDiv">
                <input type="range" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Postmodal;
