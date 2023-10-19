import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AccountContext } from "../Contexts/AccountContext";
import { register } from "../../util/register";
import GoogleIcon from "../Svgs/GoogleIcon";
import FacebookIcon from "../Svgs/FacebookIcon";

import "./SignUp.css";

function SignUp() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    localStorage.removeItem("oauth2");
  }, []);

  function googleLogin() {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
    localStorage.setItem("oauth2", true);
  }

  function facebookLogin() {
    window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/facebook`;
    localStorage.setItem("oauth2", true);
  }

  function errorHandler() {
    if (error) {
      return <h4 className="server-error">{error}</h4>;
    }
  }

  return (
    <div id="sign-up" className="container-top">
      <div id="sign-up-form" className="container-top form">
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name required"),
            email: Yup.string()
              .required("Email required")
              .email("Invalid email address"),
            password: Yup.string()
              .required("Password required")
              .min(8, "The password is too short"),
            confirmPassword: Yup.string()
              .required("Confirm Password required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values, actions) => {
            actions.resetForm();
            const vals = { ...values };
            fetch(`${process.env.REACT_APP_SERVER_URL}/auth/sign-up`, {
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
              <label className="heavy" htmlFor="name">
                Name
              </label>
              <Field id="name" name="name" type="text" autoComplete="name" />
              <ErrorMessage
                className="client-error"
                name="name"
                component="div"
              />
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
              <label className="heavy" htmlFor="confirm-password">
                Confirm Password
              </label>
              <Field
                id="confirm-password"
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage
                className="client-error"
                name="confirmPassword"
                component="div"
              />
              <div className="button-container signup-button">
                <button type="submit" disabled={isSubmitting}>
                  Sign Up
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
          Already have an account? <span />
          <Link className="blue-label" to="/login">
            Log in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignUp;
