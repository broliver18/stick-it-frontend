import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AccountContext } from "../Contexts/AccountContext";
import { register } from "../../util/register";
import GoogleIcon from "../Svgs/GoogleIcon";
import FacebookIcon from "../Svgs/FacebookIcon";

import "./Login.css";

function Login() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    const oauthAttempt = localStorage.getItem("oauth2");
    if (oauthAttempt) {
      setError("There is already an account associated with this email.")
    }
  }, []);

  function googleLogin() {
    (window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`);
    localStorage.setItem("oauth2", true)
  } 

  function facebookLogin() {
    (window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/facebook`);
    localStorage.setItem("oauth2", true)
  }  

  function errorHandler() {
    if (error) {
      return <h4 className="server-error">{error}</h4>;
    }
  }

  return (
    <div id="login" className="container-center">
      <div id="login-form" className="container-top form">
        <h1>Log In</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("Email required")
              .email("Invalid email address"),
            password: Yup.string().required("Password required"),
          })}
          onSubmit={(values, actions) => {
            actions.resetForm();
            const vals = { ...values };
            fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
              .catch((error) => console.log(error))
              .then((res) => {
                if (!res || !res.ok || res.status > 400) {
                  if (res.status === 401) {
                    setError("The email, or password is incorrect.");
                  } else {
                    setError(
                      "Can't connect right now, please try again later."
                    );
                  }
                  return;
                }
                return res.json();
              })
              .then((data) => {
                register(data, navigate, setUser, setError);
              });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form className="login-signup-container" onSubmit={handleSubmit}>
              <label className="heavy" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
              <ErrorMessage
                className="client-error"
                name="email"
                component="div"
              />
              <label className="heavy" htmlFor="password">
                Password
              </label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage
                className="client-error"
                name="password"
                component="div"
              />
              <p id="forgot-password-link">
                Forgot Password? <span />
                <Link className="blue-label" to="/reset-password/email">
                  Reset your password
                </Link>
              </p>
              <div className="button-container login-button">
                <button type="submit" disabled={isSubmitting}>
                  Log In
                </button>
                {errorHandler()}
              </div>   
            </Form>
          )}
        </Formik>
        <p className="heavy black">or use</p>
        <div className="oauth-buttons">
          <div onClick={googleLogin} className="google oauth">
            <div className="oauth-logo-container">
              <GoogleIcon />
            </div>
            <h3>Google</h3>
          </div>
          <div onClick={facebookLogin} className="facebook oauth">
            <div className="oauth-logo-container">
              <FacebookIcon />
            </div>
            <h3>Facebook</h3>
          </div>
        </div>
        <p className="black">
          Don't have an account? <span />
          <Link className="blue-label" to="/sign-up">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
