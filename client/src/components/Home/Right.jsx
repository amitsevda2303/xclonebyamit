import React, { useState } from "react";
import Styles from "../../styles/Home/Right.module.css";

const Right = () => {
  const [focus, setFocus] = useState(false);
  return (
    <div className={Styles.container}>
      <div className={Styles.topDiv}>
        <div className={Styles.search}>
          <label className={Styles.searchLabel} htmlFor={Styles.search}>
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
                  d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                  fill={focus ? "rgb(29, 155, 240)" : "gray"}
                />
              </g>
            </svg>
          </label>
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            type="text"
          />
        </div>
      </div>
      <div className={Styles.modalDiv}>
        <div className={Styles.modal1}>
          <h3>What's happening</h3>
          <div className={Styles.trends}>
            <div className={Styles.hashtag}>
              <span>Trending</span>
              <span>#dummyHashtags</span>
              <span>101k posts</span>
            </div>
            <div className={Styles.threeDotDiv}>···</div>
          </div>
          <div className={Styles.trends}>
            <div className={Styles.hashtag}>
              <span>Trending</span>
              <span>#dummyHashtags</span>
              <span>101k posts</span>
            </div>
            <div className={Styles.threeDotDiv}>···</div>
          </div>
          <div className={Styles.trends}>
            <div className={Styles.hashtag}>
              <span>Trending</span>
              <span>#dummyHashtags</span>
              <span>101k posts</span>
            </div>
            <div className={Styles.threeDotDiv}>···</div>
          </div>
          <div className={Styles.trends}>
            <div className={Styles.hashtag}>
              <span>Trending</span>
              <span>#dummyHashtags</span>
              <span>101k posts</span>
            </div>
            <div className={Styles.threeDotDiv}>···</div>
          </div>
        </div>
        <div className={Styles.modal2}>
          <h3>Who to follow</h3>
          <div className={Styles.suggestion}>
                <div className={Styles.img}>
                    <img src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg" alt="" />
                </div>
                <div className={Styles.userdata}>
                    <p>amitsevda</p>
                    <span>@uniquename</span>
                </div>
                <div className={Styles.btn}>
                    <button>follow</button>
                </div>
          </div>
          <div className={Styles.suggestion}>
                <div className={Styles.img}>
                    <img src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg" alt="" />
                </div>
                <div className={Styles.userdata}>
                    <p>amitsevda</p>
                    <span>@uniquename</span>
                </div>
                <div className={Styles.btn}>
                    <button>follow</button>
                </div>
          </div>
          <div className={Styles.suggestion}>
                <div className={Styles.img}>
                    <img src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg" alt="" />
                </div>
                <div className={Styles.userdata}>
                    <p>amitsevda</p>
                    <span>@uniquename</span>
                </div>
                <div className={Styles.btn}>
                    <button>follow</button>
                </div>
          </div>
          <div className={Styles.suggestion}>
                <div className={Styles.img}>
                    <img src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg" alt="" />
                </div>
                <div className={Styles.userdata}>
                    <p>amitsevda</p>
                    <span>@uniquename</span>
                </div>
                <div className={Styles.btn}>
                    <button>follow</button>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
