import React from 'react'
import Styles from "../../styles/Home/UserPosts.module.css"
import { Link } from 'react-router-dom'

const UserPosts = ({userDetails}) => {
  return (
    <div className={Styles.postsContainer}>
            <div className={Styles.postpfpDiv}>
              <img src={userDetails.pfp} alt="" />
            </div>
            <div className={Styles.postDetailsDiv}>
              <Link to={"/profile"}>{userDetails.user}</Link>{" "}
              <span className={Styles.username}>
                @user . <span>14h</span>{" "}
              </span>
              <div className={Styles.titleDiv}>
                <p>
                आज कश्मीर को विरासत और विकास के एक मॉडल के रूप में देखा जा रहा है: Amit 
                </p>

                <span className={Styles.hastags}>@narendramodi</span>
              </div>
              <div className={Styles.postImageDiv}>
                <img
                  src="https://www.gettyimages.com/gi-resources/images/500px/983703508.jpg"
                  alt="image not available"
                />
              </div>
              <div className={Styles.actionBar}>
                <p className={Styles.reply}><i className="fa-regular fa-comment"></i> 48</p>
                <p className={Styles.repost}><i className="fa-solid fa-repeat"></i> 119</p>
                <p className={Styles.like}><i className="fa-regular fa-heart"></i> 495</p>
                <p className={Styles.view}><i className="fa-solid fa-chart-simple"></i> 17k</p>
                <p>
                  <span className={Styles.reply}><i className="fa-regular fa-bookmark"></i></span > <span className={Styles.reply}><i className="fa-solid fa-arrow-up-from-bracket"></i></span>
                </p>
              </div>
            </div>
          </div>
  )
}

export default UserPosts
