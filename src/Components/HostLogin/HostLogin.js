import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./HostLogin.css";

function HostLogin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="container-middle login">
      <h1>Login</h1>
      <div className="login-signup-form">
        <label>Email</label>
        <input name="email" value={email} onChange={handleChange} />
        <label>Password</label>
        <input name="password" value={password} onChange={handleChange} />
        <div className="button-container">
          <button>Sign In</button>
          <Link className="link" to="/host-register">
            Click here to sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HostLogin;
