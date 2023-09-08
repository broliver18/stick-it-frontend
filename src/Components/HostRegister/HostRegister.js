import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import "./HostRegister.css";

function HostRegister() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = input;
  const emailInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value}));
  }

  return (
    <div id="sign-up" className="container-middle">
      <div className="container-top form">
        <h1>Sign Up</h1>
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
          <label>Confirm Password</label>
          <input name="confirmPassword" value={confirmPassword} onChange={handleChange} />
          <div className="button-container">
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostRegister;
