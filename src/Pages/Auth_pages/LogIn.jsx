import React, { useState, useContext } from 'react'
import { Authcontext } from "../../context/authContext";
import { useNavigate, replace } from 'react-router-dom';

// import GoogleLoginButton from './GoogleLoginButton';


function LogIn() {

  const { login } = useContext(Authcontext)
  const navigate = useNavigate()
  const [isAuth, setisAuth] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await login(formData.email, formData.password)
      setisAuth(response.isAuthenticated)
      const auth = response.isAuthenticated
      if (auth) {
        console.log('acha haraka.....')
        navigate('/admin/', replace);
      }

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  return (

    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>LOGIN</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' onChange={handleChange} required /> <br /> <br />
          <button type="submit" > Login </button>
        </form>
      </div>
      {/* <GoogleLoginButton /> */}
    </div>
  )
}

export default LogIn