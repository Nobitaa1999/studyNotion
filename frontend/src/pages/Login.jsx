import React from 'react'
import loginImg from '../assets/images/login_signup.jpg'
import Tamplate from '../component/core/auth/Tamplate'


const Login = () => {
  return (
    <Tamplate
    title='Welcome back'
    description1='build skill for today, tomorrow, and beyond'
    description2='Education to future-proof your career'
    image={loginImg}
    formType='login'
    />    
  )
}

export default Login