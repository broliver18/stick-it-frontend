import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import "./CodeRequest.css";

function CodeRequest() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("oauth2")
  }, []);

  return (
    <div className="reset-password container-center">
      <div id="reset-link" className="container-top form">
        <h1>Reset Password</h1>
        <h5 className="black no-margin light">You will receive an email with a verification code if there is an account registered with the email address entered. Be sure to check your junk folder.</h5>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("Email required")
              .email("Invalid email address"),
          })}
          onSubmit={(values, actions) => {
            actions.resetForm();
            const vals = { ...values };
            fetch(`${process.env.REACT_APP_SERVER_URL}/auth/requestToken`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
            .catch((error) => console.log(error))
            .then((res) => res.json())
            .then((data) => {
              let userId = nanoid();
              if (data === "no user found") {
                navigate(`/reset-password/code/${userId}`);
              } else {
                userId = data;
                navigate(`/reset-password/code/${userId}`);
              }
            })
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
