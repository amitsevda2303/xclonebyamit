import React, { useContext, useEffect, useState } from 'react'
import Styles from "../../styles/Home/UserPosts.module.css"
import { Link } from 'react-router-dom'
import moment from 'moment'; // Import moment library
import 'moment/locale/en-gb'; // Import English locale for moment
import { Mycontext } from "../../context/MyContext";

const UserPosts = () => {
  const [alltheData, setalltheData] = useState([])
  const { allposts} = useContext(Mycontext);
  const token = localStorage.getItem("authToken")

  useEffect(() => {
    const allthePosts = async () => {
      const result = await fetch(`${process.env.REACT_APP_SERVER_PORT}/postapi/getpost`, {
        method: "GET",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        },
      });
      const response = await result.json();
      setalltheData(response);
    };
    
    allthePosts();
   
  }, [token , allposts]);
useEffect(() => {
  console.log(alltheData)
}, [alltheData])

  
  return (
    <>
    { alltheData.map((item,index)=>{return(
 <div key={index} className={Styles.postsContainer}>
 <div className={Styles.postpfpDiv}>
 <img src={item.userId.pfp} alt="" />
 </div>
 <div className={Styles.postDetailsDiv}>
         <Link to={`/${item.userId._id}`}>{item.userId.user}</Link>
         <span className={Styles.username}><i class="fa-solid fa-circle-check"></i><span>{moment(item.createdAt).fromNow()}</span>
         </span>
         <div className={Styles.titleDiv}>
         <p>
         {item.title} 
         </p>
         
         <span className={Styles.hastags}>@amtisevda</span>
         </div>
         <div className={Styles.postImageDiv}>
         <img
         src={item.images[0]}
         alt=""
         />
         </div>
         <div className={Styles.actionBar}>
         <p className={Styles.reply}><i className="fa-regular fa-comment"></i>  {item.comment.length }</p>
         <p className={Styles.repost}><i className="fa-solid fa-repeat"></i> {item.replies.length}</p>
         <p className={Styles.like}><i className="fa-regular fa-heart"></i> {item.like.length }</p>
         <p className={Styles.view}><i className="fa-solid fa-chart-simple"></i>0</p>
         <p>
         <span className={Styles.reply}><i className="fa-regular fa-bookmark"></i></span > <span className={Styles.reply}><i className="fa-solid fa-arrow-up-from-bracket"></i></span>
         </p>
         </div>
         </div>
         </div>
    )})
      
     
            }
            </>
              )
            }

export default UserPosts
