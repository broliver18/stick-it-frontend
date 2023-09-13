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
    <div id="login" className="container-top">
      <div id="login-form" className="container-top form">
        <h1>Log In</h1>
        <div className="login-signup-container">
          <label className="heavy" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            ref={emailInputRef}
          />
          <label className="heavy" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            value={password}
            onChange={handleChange}
          />
          <div className="button-container">
            <button>Log In</button>
            <p>
              Don't have an account? <span />
              <Link className="blue-label" to="/sign-up">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
