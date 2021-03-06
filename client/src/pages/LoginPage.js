import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { backdrops } from '../config';
import { getLoginError } from '../store/error';
import { loginUser, getIsAuthenticated } from '../store/auth';
import Footer from '../components/layout/Footer';
import BackdropTemplate from './templates/BackdropTemplate';

export default function LoginPage() {
  const [backdropsIndex] = useState(Math.floor(Math.random() * backdrops.login.length));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const loginError = useSelector(getLoginError);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  if (isAuthenticated) return <motion.div exit={{ opacity: 0 }}><Redirect to={`/`}></Redirect></motion.div>;

  return (
    <BackdropTemplate  backdropPath={backdrops.login[backdropsIndex].backdropPath}>
      <div className="flex flex-col h-screen p-6 sm:p-12 px-3 sm:px-6 md:px-12 justify-center">
        <motion.div className="my-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="my-auto">
            <h1 className="text-heading font-extrabold mb-3 sm:mb-8">Log in</h1>
            <form className="flex flex-col mt-3" onSubmit={(e) => handleSubmit(e)}>
              <label className="flex flex-col leading-10 font-semibold" htmlFor="email">
                Email <input className="fc mb-3" type="text" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="flex flex-col leading-10 font-semibold" htmlFor="password">
                Password <input className="fc mb-3" id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </label>
              <span className="text-red font-medium">{loginError}</span>
              <input className="bg-primary text-black font-semibold mt-6 cursor-pointer" type="submit" value="Log in" onClick={(e) => handleSubmit(e)} />
            </form>
            <div className="mt-6 sm:mt-12 text-center">
              <span className="text-opacity-1">Don't have an account yet? <Link className="font-semibold ml-1" to='/register'>Register now</Link></span>
            </div>
          </div>
        </motion.div>
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </BackdropTemplate>
  )
}
