import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./CodeRequest.css";

function CodeRequest() {
  const [error, setError] = useState(null);

  function errorHandler() {
    if (error) {
      return <h4 className="server-error">{error}</h4>;
    }
  }

  return (
    <div className="reset-password container-top">
      <div id="reset-link" className="container-top form">
        <h1>Reset Password</h1>
        <h5 className="black no-margin light">Enter your email address to receive a verification code</h5>
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
                {errorHandler()}
              </div>
            </Form>
          )}
        </Formik>
        <Link className="standalone-link blue-label" to="/login">
          Back to login page
        </Link>{" "}
      </div>
    </div>
  );
}

export default CodeRequest;
