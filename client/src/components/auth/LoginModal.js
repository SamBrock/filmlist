import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, getIsAuthenticated } from '../../store/auth';
import { clearErrors } from '../../store/error';
import { getLoginError } from '../../store/error';

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const loginError = useSelector(getLoginError);
  
  const isAuthenticated = useSelector(getIsAuthenticated);
  useEffect(() => {
      if (isAuthenticated) setModal(false);
  }, [isAuthenticated, modal])


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  }

  const closeModal = () => {
    setModal(false);
    dispatch(clearErrors());
  }

  return (
    <React.Fragment >
      <div className="nav-link">
        <a onClick={() => setModal(true)}>Log in</a>
      </div>

      <div className="register-modal-container" style={modal ? { display: 'block' } : { display: 'none' }} >
        <div className="register-modal center">
          <a onClick={closeModal}>Close</a>
          <h2>Log in</h2>
          <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
          <input id="password" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          <input className="btn-primary" type="submit" value="Register" onClick={(e) => handleSubmit(e)} />
          <span>{loginError}</span>
        </div>
      </div>
    </React.Fragment>
  )
}
