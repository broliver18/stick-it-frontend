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
      return <h4 className="server-error">{emailError}</h4>;
    }
  }

  function codeErrorHandler() {
    if (codeError) {
      return <h4 className="server-error">{codeError}</h4>;
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
                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    Send Reset Link
                  </button>
                  {emailErrorHandler()}
                </div>
              </Form>
            )}
          </Formik>
          <Link className="standalone-link blue-label" to="/login">
            Back to login page
          </Link>{" "}
        </div>
      );
    } else {
      return (
        <div id="reset-link" className="container-top form">
          <h1>Reset Password</h1>
          <h4 className="black no-margin">Do not refresh page</h4>
          <Formik
            initialValues={{ resetCode: "" }}
            validationSchema={Yup.object({
              resetCode: Yup.string().required("Code required"),
            })}
            onSubmit={(values, actions) => {
              actions.resetForm();
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form className="login-signup-container" onSubmit={handleSubmit}>
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
                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    Send Reset Code
                  </button>
                  {codeErrorHandler()}
                </div>
              </Form>
            )}
          </Formik>
          <Link className="standalone-link blue-label" to="/login">
            Back to login page loser
          </Link>{" "}
        </div>
      );
    }
  }

  return <div className="reset-password container-top">{renderAction()}</div>;
}

export default ResetLink;
