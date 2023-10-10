import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./ResetPassword.css";

function ResetPassword() {
  const [confirmation, setCofirmation] = useState(null);
  const [error, setError] = useState(null);

  function confirmationHandler() {
    if (confirmation) {
      return <p className="confirmation">{confirmation}</p>;
    }
  }

  function errorHandler() {
    if (error) {
      return <p className="server-error">{error}</p>;
    }
  }

  return (
    <div className="reset-password container-top">
      <div id="reset-password" className="container-top form">
        <h1>Reset Password</h1>
        <h4>Do not refresh page</h4>
        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .required("Password required")
              .min(8, "The password is too short"),
            confirmPassword: Yup.string()
              .required("Confirm password required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values, actions) => {
            actions.resetForm();
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form className="login-signup-container" onSubmit={handleSubmit}>
              <label className="heavy" htmlFor="new-password">
                Password
              </label>
              <Field id="new-password" name="newPassword" type="password" />
              <ErrorMessage
                className="client-error"
                name="newPassword"
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
                className="error"
                name="confirmPassword"
                component="div"
              />
              {confirmationHandler()}
              <div className="button-container">
                <button type="submit" disabled={isSubmitting}>
                  Reset Password
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

export default ResetPassword;
