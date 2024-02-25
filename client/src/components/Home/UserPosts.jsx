import React, { useEffect, useState } from 'react'
import Styles from "../../styles/Home/UserPosts.module.css"
import { Link } from 'react-router-dom'

const UserPosts = () => {
  const [alltheData, setalltheData] = useState([])
  const token = localStorage.getItem("authToken")

  const allthePosts = async(req,res) =>{
    const result = await fetch("http://localhost:7000/postapi/getpost" , {
      method : "GET",
      headers:{
        "Authorization" : token,
        "Content-Type" : "application/json"
      }
    })
    const response = await result.json();
    setalltheData(response)
    
  }
  useEffect(() => {
    allthePosts()
    
  }, [])
  useEffect(() => {
    console.log(alltheData)
  }, [alltheData])
  
  
  return (
    <>
    { alltheData.map((item,index)=>{return(
 <div key={index} className={Styles.postsContainer}>
 <div className={Styles.postpfpDiv}>
 <img src="" alt="" />
 </div>
 <div className={Styles.postDetailsDiv}>
         <Link to={"/profile"}>username</Link>
         <span className={Styles.username}>
         @user . <span>14h</span>
         </span>
         <div className={Styles.titleDiv}>
         <p>
         {item.title} 
         </p>
         
         <span className={Styles.hastags}>@narendramodi</span>
         </div>
         <div className={Styles.postImageDiv}>
         <img
         src={item.images}
         alt=""
         />
         </div>
         <div className={Styles.actionBar}>
         <p className={Styles.reply}><i className="fa-regular fa-comment"></i> 48</p>
         <p className={Styles.repost}><i className="fa-solid fa-repeat"></i> 119</p>
         <p className={Styles.like}><i className="fa-regular fa-heart"></i> {item.like.length }</p>
         <p className={Styles.view}><i className="fa-solid fa-chart-simple"></i> 17k</p>
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
