import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import "./SignUp.css";

function SignUp() {
  return (
    <div id="sign-up" className="container-top">
      <div id="sign-up-form" className="container-top form">
        <h1>Sign Up</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email required"),
            password: Yup.string()
              .required("Password required")
              .min(8, "The password is too short"),
            confirmPassword: Yup.string()
              .required("Confirm password")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form className="login-signup-container" onSubmit={handleSubmit}>
              <label className="heavy" htmlFor="email">
                Email
              </label>
              <Field id="email" name="email" type="email" />
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
              <div className="button-container">
                <button type="submit" disabled={isSubmitting}>
                  Log In
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
