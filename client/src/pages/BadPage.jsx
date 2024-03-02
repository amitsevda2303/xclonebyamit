import React from 'react';
import Styles from "../styles/pages/BadPage.module.css"
import { Link } from 'react-router-dom';

const Badpage = () => {

  return (
    <div className={Styles.badcontainer}>
      <img src="https://art.pixilart.com/abe66ec66987.gif" alt="" />
      <div className={Styles.btn}>
        <Link to={"/home"}>Go back</Link>
      </div>
    </div>
  )
}

export default Badpage
