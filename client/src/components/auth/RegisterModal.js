import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, getIsAuthenticated } from '../../store/auth'
import { getRegisterError } from '../../store/error';
import { Link } from 'react-router-dom';

export default function RegisterModal(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerError = useSelector(getRegisterError);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, password));
  }

  const verifyPassword = () => {
    if (document.getElementById('password').value === document.getElementById('repeatPassword').value) return true; else return false;
  }

  return (
    <div className="register-modal-container" style={props.isOpen ? { display:'block'} : {display : 'none'}} >
      <div className="register-modal center">
        <h2>Register</h2>
        <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
        <input id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <input id="repeatPassword" type="password" name="repeat-password" placeholder="Confirm password" onChange={(e) => setPassword(e.target.value)}></input>
        <input className="btn-primary" type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
        <span>{registerError}</span>
      </div>
    </div>
  )
}
