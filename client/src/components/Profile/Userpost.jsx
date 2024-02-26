import React, { useEffect } from 'react'
import { useQuery, gql } from "@apollo/client";
import Styles from "../../styles/components/profile/Userpost.module.css"
import Loader from '../Home/Loader';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Import moment library
import 'moment/locale/en-gb';


const postData = gql`
query Query($token: String!) {
  getPosts(token: $token) {
    posts {
      title
      images
      like
      createdAt
    }
    _id
  }
}  
`;





const Userpost = ({userDetails}) => {
    const token = localStorage.getItem("authToken")
    const time = (createdAt ) => {
      const formattedDate = moment(parseInt(createdAt)).format('YYYY-MM-DD HH:mm:ss')
      const comparedTime = moment(formattedDate).fromNow()
      return comparedTime;
    }
    
    const { loading, error, data,refetch:refetchPosts  } = useQuery(postData, {
        variables: {
          token: token,
        },
        fetchPolicy: 'network-only',
      });


      useEffect(() => {
        refetchPosts();
        // refetchUserData();
      }, []);
      if (loading) {
        return <Loader />; 
      }
      if (error) {
        return <p>Error fetching user details</p>;
      }
    
      const postDetails = data.getPosts;
      
      
  return (
    <>
    {postDetails.posts.reverse().map((item, index) => (
        <div className={Styles.postsContainer} key={index}>
          <div className={Styles.postpfpDiv}>
            <img src={userDetails.pfp} alt="user pfp" />
          </div>
          <div className={Styles.postDetailsDiv}>
            <Link to={"/profile"}>{userDetails.user}</Link>{" "}
            <span className={Styles.username}>
              @user . <span>{time(item.createdAt)}</span>{" "}
            </span>
            <div className={Styles.titleDiv}>
              <p>{item.title}</p>
              <span className={Styles.hastags}>@narendramodi</span>
            </div>
            <div className={Styles.postImageDiv}>
              {item.images.map((item,index)=>{return(<img key={index} src={item} alt="image not available" />)})}
            </div>
            <div className={Styles.actionBar}>
              <p className={Styles.reply}>
                <i className="fa-regular fa-comment"></i> 48
              </p>
              <p className={Styles.repost}>
                <i className="fa-solid fa-repeat"></i> 119
              </p>
              <p className={Styles.like}>
                <i className="fa-regular fa-heart"></i> {item.like.length}
              </p>
              <p className={Styles.view}>
                <i className="fa-solid fa-chart-simple"></i> 17k
              </p>
              <p>
                <span className={Styles.reply}>
                  <i className="fa-regular fa-bookmark"></i>
                </span>{" "}
                <span className={Styles.reply}>
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
      </>
  )
}

export default Userpost
