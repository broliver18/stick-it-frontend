import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./CodeVerify.css";

function CodeVerify() {
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
                  Verify Reset Code
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

export default CodeVerify;