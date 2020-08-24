import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRegisterError } from '../store/error';
import { getIsAuthenticated, registerUser } from '../store/auth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackdropImg from '../components/layout/BackdropImg';
import { motion } from 'framer-motion';
import { registerBackdrops } from '../components/layout/backdrops'
import Footer from '../components/layout/Footer';

export default function RegisterPage() {
  const [backdropsIndex, setBackdropsIndex] = useState(0);
  useEffect(() => {
    // Select random backdrop
    setBackdropsIndex(Math.floor(Math.random() * registerBackdrops.length))
  }, [])

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  let registerError = useSelector(getRegisterError);

  const isAuthenticated = useSelector(getIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) return window.location.replace('http://localhost:3000/');
  }, [isAuthenticated])


  const handleSubmit = (e) => {
    e.preventDefault();
    verifyPassword ? dispatch(registerUser(username, email, password)) : registerError = 'Passwords do not match'
  }

  const verifyPassword = () => {
    if (document.getElementById('password').value === document.getElementById('repeatPassword').value) return true; else return false;
  }

  return (
    <motion.div exit={{ opacity: 1 }} className="grid-page-container">
      <BackdropImg backdropPath={registerBackdrops[backdropsIndex].backdropPath} />
      <div className="grid-2-col-backdrop ">
        <div id="backdrop-placeholder"></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="content-col form-container">
          <div className="form">
            <h1>Register</h1>
            <span className="form-error">{registerError}</span>
            <input className="form-control fc-email" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input className="form-control fc-user" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
            <input className="form-control fc-lock" id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <input className="form-control fc-lock" id="repeatPassword" type="password" name="repeat-password" placeholder="Confirm password" onChange={(e) => setPassword(e.target.value)}></input>
            <input className="btn-primary" type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
            <span className="register-now text-center">Already have an account? <Link to='/login'>Log in</Link></span>
          </div>
          <Footer />
        </motion.div>
      </div>
      <div className="backdrop-info">
        <div><span className="backdrop-movie-title">{registerBackdrops[backdropsIndex].movie}</span>, {registerBackdrops[backdropsIndex].year}</div>
        <div>{registerBackdrops[backdropsIndex].director}</div>
      </div>
    </motion.div>
  )
}
