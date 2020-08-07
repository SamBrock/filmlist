import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginError } from '../store/error';
import { loginUser, getIsAuthenticated } from '../store/auth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const loginError = useSelector(getLoginError);
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) return window.location.replace('http://localhost:3000/');
  }, [isAuthenticated])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  return (
    <div className="container">
      <div className="col-backdrop">
        <img src={"https://image.tmdb.org/t/p/original//spoZUN4X1KiOc5S0plOyGAXLNtb.jpg"}></img>
      </div>
      <div className="col-hw c login-container">
        <h1>Log in</h1>
        <span className="form-error">{loginError}</span>
        <input className="form-control fc-email" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <input className="form-control fc-lock" id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <input className="btn-primary" type="submit" value="Log in" onClick={(e) => handleSubmit(e)} />
        <span className="register-now text-center">Don't have an account yet? <Link to='/register'>Register now</Link></span>
      </div>
    </div>
  )
}
