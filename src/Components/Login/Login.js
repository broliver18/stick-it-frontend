import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import "./Login.css";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;
  const emailInputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div id="login" className="container-middle">
      <div className="container-top form">
        <h1>Login</h1>
        <div className="login-signup-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            ref={emailInputRef}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            value={password}
            onChange={handleChange}
          />
          <div className="button-container">
            <button>Sign In</button>
            <Link className="link signup" to="/register-user">
              Click here to sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
