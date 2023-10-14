import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { SERVER_ROOT_URL } from "../../utils/urls";

import "./ResetPassword.css";

function ResetPassword() {
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  function messageHandler() {
    if (error) {
      return <h4 className="server-error">{error}</h4>;
    } else if (confirmation) {
      return <h4 className="confirmation">{confirmation}</h4>;
    }
  }
  
  return (
    <div className="reset-password container-top">
      <div id="reset-password" className="container-top form">
        <h1>Reset Password</h1>
        <h4 className="black no-margin">Do not refresh page</h4>
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
              .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
          })}
          onSubmit={(values, actions) => {
            actions.resetForm();
            const vals = { ...values };
            fetch(`${SERVER_ROOT_URL}/auth/reset-password/${userId}`, {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
            .catch((error) => console.log(error))
            .then((res) => {
              if (!res || !res.ok || res.status > 400) {
                setError("There was an error with the server. Try again later.")
              }
              return res.json();
            })
            .then((data) => {
              if (data === "success") {
                setConfirmation("Your password was successfully reset!");
              }
            })
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
                className="client-error"
                name="confirmPassword"
                component="div"
              />
              <div className="button-container">
                <button type="submit" disabled={isSubmitting}>
                  Reset Password
                </button>
                {messageHandler()}
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
