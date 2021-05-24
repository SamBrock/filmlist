import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, Redirect } from 'react-router-dom';

import { backdrops } from '../config';
import { getRegisterError } from '../store/error';
import { getIsAuthenticated, registerUser } from '../store/auth';
import Footer from '../components/layout/Footer';
import BackdropTemplate from './templates/BackdropTemplate';

export default function RegisterPage() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [backdropIndex] = useState(Math.floor(Math.random() * backdrops.register.length));

  const dispatch = useDispatch();

  let registerError = useSelector(getRegisterError);

  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyPassword ? dispatch(registerUser(username, email, password)) : registerError = 'Passwords do not match';
  }

  const verifyPassword = password === confirmPassword;

  if (isAuthenticated) return <motion.div exit={{ opacity: 0 }}><Redirect to={`/`} /></motion.div>;

  return (
    <BackdropTemplate backdropPath={backdrops.register[backdropIndex].backdropPath}>
      <div className="flex flex-col h-screen p-6 sm:p-12 px-3 sm:px-6 md:px-12  mt-12 sm:mt-0 justify-start sm:justify-center">
        <motion.div className="my-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <h1 className="text-heading font-extrabold mb-3 sm:mb-8">Register</h1>
          <form className="flex flex-col mt-3" onSubmit={(e) => handleSubmit(e)}>
            <label className="flex flex-col leading-10 font-semibold" htmlFor="email">
              Email<input className="mb-3" id="email" type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            </label>
            <label className="flex flex-col leading-10 font-semibold" htmlFor="username">
              Username<input className="mb-3" id="username" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
            </label>
            <label className="flex flex-col leading-10 font-semibold" htmlFor="password">
              Password<input className="mb-3" id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            </label>
            <label className="flex flex-col leading-10 font-semibold" htmlFor="confirmPassword">
              Confirm Password<input className="mb-3" id="confirmPassword" type="password" name="confirm-password" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </label>
            <span className="text-red font-medium">{registerError}</span>
            <input className="bg-primary text-black font-semibold mt-6 mt-6" type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
          </form>
          <div className="mt-6 sm:mt-12 text-center">
            <span className="text-opacity-1">Already have an account? <Link className="font-semibold ml-1 tex" to='/login'>Log in</Link></span>
          </div>
        </motion.div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </BackdropTemplate>
  )
}
