import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AccountContext } from "../Contexts/AccountContext";
import GoogleIcon from "../Svgs/GoogleIcon";
import FacebookIcon from "../Svgs/FacebookIcon";

import "./SignUp.css";

function SignUp() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);

  function errorHandler() {
    if (error) {
      return <p className="server-error">{error}</p>;
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
              .required("Confirm password required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values, actions) => {
            actions.resetForm();
            const vals = { ...values };
            fetch("http://localhost:4000/auth/sign-up", {
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
                  return;
                }
                return res.json();
              })
              .then((data) => {
                if (!data) return;
                setUser({ ...data });
                if (data.status) {
                  setError(data.status);
                } else if (data.loggedIn) {
                  localStorage.setItem("loggedIn", true);
                  localStorage.setItem("username", data.username);
                  navigate("/host");
                }
              });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form className="login-signup-container" onSubmit={handleSubmit}>
              <label className="heavy" htmlFor="name">
                Name
              </label>
              <Field id="name" name="name" type="text" autoComplete="name" />
              <ErrorMessage className="client-error" name="name" component="div" />
              <label className="heavy" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
              <ErrorMessage className="client-error" name="email" component="div" />
              <label className="heavy" htmlFor="password">
                Password
              </label>
              <Field id="password" name="password" type="password" />
              <ErrorMessage className="client-error" name="password" component="div" />
              <label className="heavy" htmlFor="confirm-password">
                Confirm Password
              </label>
              <Field
                id="confirm-password"
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage
                className="cient-error"
                name="confirmPassword"
                component="div"
              />
              <div className="button-container signup-button">
                <button type="submit" disabled={isSubmitting}>
                  Sign Up
                </button>

              </div>
              {errorHandler()}
            </Form>
          )}
        </Formik>
        <p className="heavy black">or use</p>
        <div className="oauth-buttons">
          <div className="google oauth">
            <div className="oauth-logo-container">
              <GoogleIcon />
            </div>
            <h3>Google</h3>
          </div>
          <div className="facebook oauth">
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
