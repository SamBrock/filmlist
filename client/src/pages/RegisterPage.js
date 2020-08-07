import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRegisterError, clearErrors } from '../store/error';
import { loginUser, getIsAuthenticated, registerUser } from '../store/auth';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const registerError = useSelector(getRegisterError);

  const isAuthenticated = useSelector(getIsAuthenticated);
  useEffect(() => {
    if (isAuthenticated) setModal(false);
  }, [isAuthenticated, modal])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, password));
  }

  const verifyPassword = () => {
    if (document.getElementById('password').value === document.getElementById('repeatPassword').value) return true; else return false;
  }

  const closeModal = () => {
    setModal(false);
    dispatch(clearErrors());
  }

  return (
    <div className="container">
      <div className="col-backdrop">
        <img src={"https://image.tmdb.org/t/p/original/czrTZnZgSwtIofk0UYrRMicVgHB.jpg"}></img>
      </div>
      <div className="col-hw c login-container">
        <h1>Register</h1>
        <span className="form-error">{registerError}</span>
        <input className="form-control fc-email" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <input className="form-control fc-user" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
        <input className="form-control fc-lock" id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <input className="form-control fc-lock" id="repeatPassword" type="password" name="repeat-password" placeholder="Confirm password" onChange={(e) => setPassword(e.target.value)}></input>
        <input className="btn-primary" type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
        <span className="register-now text-center">Already have an account? <Link to='/login'>Log in</Link></span>

        
      </div>
    </div>
  )
}
