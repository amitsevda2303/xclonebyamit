import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const gotoFirstPage = () =>{
        navigate('/')
      }
  return (
    <div>
         <button onClick={gotoFirstPage}>back</button>
      This is Login Page
    </div>
  )
}

export default Login
