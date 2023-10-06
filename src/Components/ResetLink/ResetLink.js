import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ResetLink.css";

function ResetLink() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [codeError, setCodeError] = useState(null);

  function emailErrorHandler() {
    if (emailError) {
      return <p className="error">{emailError}</p>;
    }
  };

  function codeErrorHandler() {
    if (codeError) {
      return <p className="error">{codeError}</p>;
    }
  }

  function renderAction() {
    if (!isEmailVerified) {
      return (
          <div id="reset-link" className="container-top form">
            <h1>Reset Password</h1>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Email required")
                  .email("Invalid email address"),
              })}
              onSubmit={(values, actions) => {
                actions.resetForm();
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form
                  className="login-signup-container"
                  onSubmit={handleSubmit}
                >
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
                  {emailErrorHandler()}
                  <div className="button-container">
                    <button type="submit" disabled={isSubmitting}>
                      Send Reset Link
                    </button>
                    <Link className="standalone-link blue-label" to="/login">
                      Back to login page
                    </Link>{" "}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      );
    } else {
      return (
          <div id="reset-link" className="container-top form">
            <h1>Reset Password</h1>
            <h4>Do not refresh page</h4>
            <Formik
              initialValues={{ resetCode: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required("Code required"),
              })}
              onSubmit={(values, actions) => {
                actions.resetForm();
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <Form
                  className="login-signup-container"
                  onSubmit={handleSubmit}
                >
                  <label className="heavy" htmlFor="reset-code">
                    Reset Code
                  </label>
                  <Field
                    id="reset-code"
                    name="resetCode"
                    type="text"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    className="error"
                    name="resetCode"
                    component="div"
                  />
                  {codeErrorHandler()}
                  <div className="button-container">
                    <button type="submit" disabled={isSubmitting}>
                      Send Reset Code
                    </button>
                    <Link className="standalone-link blue-label" to="/login">
                      Back to login page
                    </Link>{" "}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      );
    }
  }

  return (
    <div className="reset-password container-top">
      {renderAction()}
    </div>
  );
}

export default ResetLink;
