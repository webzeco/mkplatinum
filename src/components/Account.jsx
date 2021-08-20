import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "./style/account.css";

export default function Account() {
  const logoutHandler = async () => {
    localStorage.removeItem("jwt");
    toast.success("logout  successfully !!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    // history.push('/');
    window.location = "/";
  };
  const accountSchema = Yup.object().shape({
    username: Yup.string()
      .min(6)
      .max(50)
      .required("Required").label('Username'),
    password: Yup.string()
      .min(6)
      .max(50
        )
      .required("Required").label('Password'),
    passwordConfirm: Yup.string()
      .min(6)
      .max(50)
      .required("Required").label('PasswordConfirm'),
    email: Yup.string().email().required("Required").label('Email'),
  });
  return (
    <div>
      <div className="container pro_spec  pb-5 mt-3 ">
        <div className="row justify-content-center ">
          <div className="col-12">
            <div className="d-flex row ">
              <div className="col-10">
                <div className="h5 text-uppercase pro_title_h5">My Account</div>
              </div>
              <div className="col-2 justify-content-center">
                <a href="/">
                  <p
                    onClick={logoutHandler}
                    className="re_look text-center  pt-2"
                  >
                    Logout
                  </p>
                </a>
              </div>
            </div>
          </div>

          <div className="ho mb-3 mt-2 w-100"></div>

          <div className="col-md-12 pt-3 ">
            <div className="row">
              <div className="col-lg-8 col-md-12 pb-5 ">
                <span className="fw-bold ov_look">Order History </span>
                <p className=" order_p">You haven't place any orders yet.</p>
                <div class="table-responsive">
                  <table className="table  ">
                    <thead className="bg-danger text-white ">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td> Rs</td>
                        <td></td>
                        <td></td>
                        <td> Rs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="ho mb-3 mt-2 w-100 d-lg-none"></div>
              <div className="col-lg-1">
                <div className="vl text-center "></div>
              </div>
              <div className="col-lg-3 col-md-12 back">
                <span className="fw-bold ov_look">Account Details </span>
                <a href="#" className="re_look fw-bold mb-4">
                  <p className=" mb-2 re_look"> View Adress(0)</p>
                </a>
               {/* details */}
               <div className="  mt-5 pb-5 font_fam w-100">
      {/* <h3 className="submit-content fw-bold text-center mt-5">Detail  Account</h3> */}
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword:"",
          passwordConfirm: "",
        }}
        validationSchema={accountSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-4 mt-5 ">
              <input
                name="username"
                className="form-control"
                placeholder="Username"
                readOnly
              />
              
            </div>
            <div className="mb-4">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                readOnly
              />
              
            </div>
            <div className="mb-4 ">
              <Field
                name="currentPassword"
                type="password"
                className="form-control"
                placeholder="Current Password"
              />
              {errors.currentPassword && touched.currentPassword ? (
                <div className="alert alert-danger  p-2" role="alert">
                  {errors.currentPassword}
                </div>
              ) : null}
            </div>
            <div className="mb-4 ">
              <Field
                name="newPassword"
                type="password"
                className="form-control"
                placeholder="New Password"
              />
              {errors.newPassword && touched.newPassword ? (
                <div className="alert alert-danger  p-2" role="alert">
                  {errors.newPassword}
                </div>
              ) : null}
            </div>
            <div className="mb-4  ">
              <Field
                name="passwordConfirm"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <div className="alert alert-danger  p-2" role="alert">
                  {errors.passwordConfirm}
                </div>
              ) : null}
            </div>

            <div className="cart mt-4 align-items-center">
            <button type="submit" className="btn text-uppercase w-100 creat_btn fw-bold ">update password</button></div>
            
          </Form>
        )}
      </Formik>
    </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
