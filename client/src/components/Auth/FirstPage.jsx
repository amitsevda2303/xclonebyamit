import React, { useContext, useEffect } from "react";
import Styles from "../../styles/components/FirstPage.module.css";
import image from "../../assets/svg.svg";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import { useNavigate } from "react-router-dom";
import { Mycontext } from "../../context/MyContext";

const FirstPage = () => {
  const { setLoader} = useContext(Mycontext)
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")

  const gotomodal = async() => {
    setLoader(true)
    navigate("/i/flow/signup");
    // window.history.pushState({}, '', '/i/flow/singup');
  };

  const gotoLogin = async() =>{
    setLoader(true)
    navigate('/i/flow/login');
  }

  useEffect(() => {
    if (token) {
      navigate("/home")      
    }
  }, [])
  return (
    <div className={Styles.container}>
      <div className={Styles.FirstpageDiv}>
        <div className={Styles.LeftContainer}>
          <img className={Styles.twitterLogo} src={image} alt="" />
        </div>
        <div className={Styles.RightContainer}>
          <div className={Styles.headings}>
            <span className={Styles.slogan}>Happening now</span>
            <span className={Styles.secondSpan}>Join today.</span>
          </div>

          <div className={Styles.buttons}>
            <button className={Styles.btn1}>
              {" "}
              <img className={Styles.googleImage} src={google} alt="" />
              Sign in with Google
            </button>
            <button className={Styles.btn2}>
              {" "}
              <img className={Styles.googleImage} src={apple} alt="" />
              Sign in with Apple
            </button>

            <div className={Styles.partition}>
              <hr className={Styles.hrTag} />
              <span className={Styles.or}> or </span>
              <hr className={Styles.hrTag} />
            </div>

            <div className={Styles.accountCreationDiv}>
              <button onClick={gotomodal} className={Styles.accountBtn}>
                Create account
              </button>

              <span>
                By signing up, you agree to the{" "}
                <a href="/" className={Styles.links}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/" className={Styles.links}>
                  Privacy Policy
                </a>
                , including{" "}
                <a
                  className={Styles.links}
                  href="/"
                  style={{ marginRight: "50%" }}
                >
                  Cookie Use.
                </a>
              </span>
            </div>
          </div>

          <div className={Styles.lastDiv}>
            <p>Already have an account?</p>
            <button onClick={gotoLogin} className={Styles.LoginBtn}>Sign in</button>
          </div>
        </div>
      </div>
      <div className={Styles.anchorBar}>
        <a className={Styles.anchorTags} href="/">
          About
        </a>
        <a className={Styles.anchorTags} href="/">
          Download the X app
        </a>
        <a className={Styles.anchorTags} href="/">
          Help Center
        </a>
        <a className={Styles.anchorTags} href="/">
          Terms of Service
        </a>
        <a className={Styles.anchorTags} href="/">
          Privacy Policy
        </a>
        <a className={Styles.anchorTags} href="/">
          Cookie Policy
        </a>
        <a className={Styles.anchorTags} href="/">
          Accessibility
        </a>
        <a className={Styles.anchorTags} href="/">
          Ads info
        </a>
        <a className={Styles.anchorTags} href="/">
          Blog
        </a>
        <a className={Styles.anchorTags} href="/">
          Status
        </a>
        <a className={Styles.anchorTags} href="/">
          Careers
        </a>
        <a className={Styles.anchorTags} href="/">
          Brand Resources
        </a>
        <a className={Styles.anchorTags} href="/">
          Advertising
        </a>
        <a className={Styles.anchorTags} href="/">
          Marketing
        </a>
        <a className={Styles.anchorTags} href="/">
          X for Business
        </a>
        <a className={Styles.anchorTags} href="/">
          Developers
        </a>
        <a className={Styles.anchorTags} href="/">
          Directory
        </a>
        <a className={Styles.anchorTags} href="/">
          Settings
        </a>
        <a className={Styles.anchorTags} href="/">
          © 2023 X Corp.
        </a>
      </div>
    </div>
  );
};

export default FirstPage;
