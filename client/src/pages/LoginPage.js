import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginError } from '../store/error';
import { loginUser, getIsAuthenticated } from '../store/auth';
import { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import BackdropImg from '../components/layout/BackdropImg';
import { motion } from 'framer-motion';
import { loginBackdrops } from '../components/layout/backdrops'
import Footer from '../components/layout/Footer';
import { useWindowSize } from '../hooks/window-hooks';

export default function LoginPage() {
  const [width, height] = useWindowSize();
  const [backdropsIndex, setBackdropsIndex] = useState(0);
  useEffect(() => {
    // Select random backdrop
    setBackdropsIndex(Math.floor(Math.random() * loginBackdrops.length))
  }, [])

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginError = useSelector(getLoginError);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }
  
  document.title = `Log in - FILMLIST`;

  if (isAuthenticated) return (<motion.div exit={{opacity: 0}}><Redirect to={`/`}></Redirect></motion.div>);
  return (
    <motion.div exit={{ opacity: 1 }} className="grid-page-container">
      {width > 768 ? <BackdropImg backdropPath={loginBackdrops[backdropsIndex].backdropPath} /> : ''}
      <div className="grid-2-col-backdrop ">
        <div id="backdrop-placeholder"></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="content-col form-container">
          <div className="form">
            <h1>Log in</h1>
            <span className="form-error">{loginError}</span>
            <input className="form-control fc-email" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input className="form-control fc-lock" id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <input className="btn-primary" type="submit" value="Log in" onClick={(e) => handleSubmit(e)} />
            <span className="register-now text-center">Don't have an account yet? <Link to='/register'>Register now</Link></span>
          </div>
          <Footer />
        </motion.div>
      </div>
      <div className={`backdrop-info ${width > 768 ? '' : 'hide'}`}>
        <div><span className="backdrop-movie-title">{loginBackdrops[backdropsIndex].movie}</span>, {loginBackdrops[backdropsIndex].year}</div>
        <div>Dir: {loginBackdrops[backdropsIndex].director}</div>
      </div>

    </motion.div>
  )
}
