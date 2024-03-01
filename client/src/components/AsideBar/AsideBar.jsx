import React, { useEffect } from 'react'
import s from "../../styles/components/AsideBars/Asidebar.module.css"
import { useNavigate,Link } from 'react-router-dom'
import image from "../../assets/svg.svg"
import user from "../../assets/pngegg.png"
import {jwtDecode} from "jwt-decode"

const AsideBar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    useEffect(() => {
      if (!token) {
        navigate("/")        
      }
    }, [navigate, token])
    
  return (
    <div className={s.container}>
      <div className={s.image}>
                <img src={image} alt="X Logo" />
            </div>
            <div className={s.featuresContainer}>
                <Link to={"/home"} className={s.feature}>
                <div className={s.icon}><i className="fa-solid fa-house"></i></div>
                <span >
                    Home
                </span>
                </Link>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature}>
                    <div className={s.icon}> <i className="fa-solid fa-magnifying-glass"></i></div>
                <span>
                    Explore
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature}>
                <div className={s.icon}><i className="fa-solid fa-bell"></i></div>
                <span>
                    Notifications
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature}>
                <div className={s.icon}><i className="fa-regular fa-envelope"></i></div>
                <span>
                    Messages
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature}>
                <div className={s.icon}><i className="fa-regular fa-square-check fa-rotate-180"></i></div>
                <span>
                    Grok
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature} id={s.list}>
                <div className={s.icon}><i className="fa-regular fa-rectangle-list"></i></div>
                <span>
                    Lists
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature} id={s.bookmarks}>
               <div className={s.icon}> <i className="fa-regular fa-bookmark"></i></div>                
                <span>
                    Bookmarks
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature} id={s.community}>
                <div className={s.icon}><i className="fa-solid fa-user-group"></i></div>
                <span>
                    Communities
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature} id={s.premium}>
                <div className={s.icon}><i className="fa-solid fa-house"></i></div>
                <span>
                    Premium
                </span>
                </div>
            </div>
            <div className={s.featuresContainer}>
                <Link to={`/${userId}`} className={s.feature} id={s.profile} >
                <div className={s.icon}><i className="fa-regular fa-user"></i></div>
                <span>
                    Profile
                </span>
                </Link>
            </div>
            <div className={s.featuresContainer}>
                <div className={s.feature} id={s.more}>
                <div className={s.icon}><i className="fa-regular fa-comment-dots"></i></div>
                <span>
                    More
                </span>
                </div>
            </div>
            <div className={s.PostContainer}>
                <button>Post</button>
            </div>
           
            <div className={s.IdDetailContainer}>
                
                <div className={s.imageDiv}>
                    <img src={user} alt="" />
                </div>
                <div className={s.userDetails}>
                    <span>Name &nbsp; &nbsp;<i className="fa-solid fa-lock"></i></span>
                    <span className={s.lightSpan}>@aw43SE$asdasdr</span>
                </div>
                <div className={s.threeDot}>
                <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
    </div>
  )
}

export default AsideBar
