import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./HostLogin.css";

function HostLogin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;
  const emailInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div id="login" className="container-middle">
      <div className="container-top form">
        <h1>Login</h1>
        <div className="login-signup-container">
          <label>Email</label>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            ref={emailInputRef}
          />
          <label>Password</label>
          <input name="password" value={password} onChange={handleChange} />
          <div className="button-container">
            <button>Sign In</button>
            <Link className="link signup" to="/host-register">
              Click here to sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostLogin;
