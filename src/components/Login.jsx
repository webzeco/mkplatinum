import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React from "react";
import "./style/forgot.css";
import { Link } from "react-router-dom";
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required").label("Username"),
  password: Yup.string().required("Required").label("Password"),
});
export default function Login({ onLogin }) {
  return (
    <div className="container pt-5 mt-5 pb-5 font_fam w-50">
      <h3 className="submit-content fw-bold text-center mt-5">LOGIN</h3>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          onLogin(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4 mt-5 ">
              <Field
                name="username"
                className="form-control"
                placeholder="Username"
              />
              {errors.username && touched.username ? (
                <div className="alert alert-danger  p-2" role="alert">
                  {errors.username}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="password"
              />
              {errors.password && touched.password ? (
                <div className="alert alert-danger  p-2 p-2 " role="alert">
                  {errors.password}
                </div>
              ) : null}
              <Link
                to="/forgot"
                className="float-end small pb-2 pt-1 fg_link  fw-bold "
              >
                <p>FORGOT PASSWORD?</p>
              </Link>
            </div>

            <div className="cart mt-4 align-items-center">
              <button
                type="submit"
                className="btn text-uppercase w-100 creat_btn message_look fw-bold "
              >
                {/* <a href="/">SIGN IN</a> */}
                SIGN IN
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
