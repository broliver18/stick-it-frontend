import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AccountContext } from "../Contexts/AccountContext";

import "./Login.css";

function Login() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);

  function errorHandler() {
    if (error) {
      return <p className="error">{error}</p>;
    }
  }

  return (
    <div id="login" className="container-top">
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
            fetch("http://localhost:4000/auth/login", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
              .catch((error) => {
                return error;
              })
              .then((res) => {
                if (!res || !res.ok || res.status > 400) {
                  if (res.status === 401) {
                    setError("The email or password is incorrect.");
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
                if (!data) return;
                setUser({ ...data });
                if (data.loggedIn) {
                  sessionStorage.setItem("loggedIn", true);
                  sessionStorage.setItem("username", data.username);
                  navigate("/host");
                }
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
              <ErrorMessage className="error" name="email" component="div" />
              <label className="heavy" htmlFor="password">
                Password
              </label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage className="error" name="password" component="div" />
              {errorHandler()}
              <p id="forgot-password-link">
                Forgot Password? <span />
                <Link className="blue-label" to="/reset-password/link">
                  Reset your password
                </Link>
              </p>

              <div className="button-container login-button">
                <button type="submit" disabled={isSubmitting}>
                  Log In
                </button>
                <p>
                  Don't have an account? <span />
                  <Link className="blue-label" to="/sign-up">
                    Sign up
                  </Link>{" "}
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
