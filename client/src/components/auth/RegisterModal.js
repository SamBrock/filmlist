import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, getIsAuthenticated } from '../../store/auth'

export default function RegisterModal() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, password));
  }

  return (
    <div class="register-modal">
      <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
      <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
      <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
      <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
    </div>
  )
}
