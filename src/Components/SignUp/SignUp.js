import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AccountContext } from "../Contexts/AccountContext";

import "./SignUp.css";

function SignUp() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);

  function errorHandler() {
    if (error) {
      return <p className="error">{error}</p>;
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
                  sessionStorage.setItem("loggedIn", true);
                  sessionStorage.setItem("username", data.username)
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
              <ErrorMessage className="error" name="name" component="div" />
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
              <label className="heavy" htmlFor="confirm-password">
                Confirm Password
              </label>
              <Field
                id="confirm-password"
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage
                className="error"
                name="confirmPassword"
                component="div"
              />
              {errorHandler()}
              <div className="button-container signup-button">
                <button type="submit" disabled={isSubmitting}>
                  Sign Up
                </button>
                <p>
                  Don't have an account? <span />
                  <Link className="blue-label" to="/login">
                    Log in
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

export default SignUp;
