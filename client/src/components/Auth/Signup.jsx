import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mycontext } from '../../context/MyContext';

const Signup = () => {
  const {setSignup} = useContext(Mycontext)
  const navigate = useNavigate();

  const gotoFirstPage = () =>{
    setSignup(false)
    navigate('/')
  }
  return (
    <div >
      <button onClick={gotoFirstPage}>back</button>
    </div>
  )
}

export default Signup
