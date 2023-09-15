import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
  return (
    <div id="login" className="container-top">
      <div id="login-form" className="container-top form">
        <h1>Log In</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email required"),
            password: Yup.string()
              .required("Password required")
              .min(8, "The password is too short"),
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
              <div className="button-container">
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
