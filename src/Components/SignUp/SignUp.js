import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { socket } from "../../socket";

import "./SignUp.css";

function SignUp() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = input;
  const emailInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div id="sign-up" className="container-top">
      <div id= "sign-up-form" className="container-top form">
        <h1>Sign Up</h1>
        <form className="login-signup-container">
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
          <label className="heavy" htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="text"
            value={confirmPassword}
            onChange={handleChange}
          />
          <div className="button-container">
            <button>Sign Up</button>
            <p>
              Already have an account? <span />
              <Link className="blue-label" to="/login">
                Log in
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;