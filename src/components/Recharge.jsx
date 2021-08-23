import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import "./style/forgot.css"
import { Link } from "react-router-dom";
import { recharge } from "../services/productServices";
import { toast } from "react-toastify";
import { RechargeContext } from "./contexts/rechargeContact";
const forgotSchema = Yup.object().shape({
    email: Yup.string().email().required("Required").label('Username'),
    contactNo: Yup.string().required("Required").label('whatsapp Number'),
    message: Yup.string().required("Required").label('message'),
});
export default function Recharge() {
    const {rechargeProd} = useContext(RechargeContext);
    rechargeProd.imgPath= `${process.env.REACT_APP_URL}/img/${rechargeProd.image}`;

    const rechargeHandler = async (values) => {
        try {
            await recharge(values);
            toast.success("Recharge Message have been Successfully sent.", {
                position: 'top-center'
            });
            toast.info("Owner will Contact to you later.", {
                position: 'top-center'
            });
        } catch (error) {
            toast.error(" Error:Recharge Message not sent !!!");
        }

    }
    return (
        <div className="container pt-5 mt-5 pb-5  w-25">
            <h3 className="submit-content fw-bold text-center mt-5">Recharge Request</h3>
            <div className="d-flex justify-content-center pt-2">
                <p className="message_look">After your Request Our team will contact you as soon as possible !!!</p>
                
            </div>
            <Formik
                initialValues={{
                    email: "",
                    contactNo: "",
                    message: ""
                }}
                validationSchema={forgotSchema}
                onSubmit={(values) => {
//                     downloads: 1
// id: "611ddca650d01644fcf9c9e6"
// image: "coffee-171653_1920.jpg"
// imgPath: "http://localhost:4000/img/coffee-171653_1920.jpg"
// modifiedAt: "2021-08-19T12:51:37.799Z"
// name: "ultrahdtv610 (1).apk"
// size: 36.45

                    
                    values.product=rechargeProd;
                    console.log(values);
                    rechargeHandler(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>

                        <div className="mb-4">
                            <Field
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                            />
                            {errors.email && touched.email ? (
                                <div className="alert alert-danger p-2" role="alert">
                                    {errors.email}
                                </div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <Field
                                name="contactNo"
                                type="text"
                                className="form-control"
                                placeholder="Whatsapp Number"
                            />
                            {errors.contactNo && touched.contactNo ? (
                                <div className="alert alert-danger p-2" role="alert">
                                    {errors.contactNo}
                                </div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <Field
                                name="message"
                                type="text"
                                className="form-control"
                                placeholder="Write  Message here"
                            />
                            {errors.message && touched.message ? (
                                <div className="alert alert-danger p-2" role="alert">
                                    {errors.message}
                                </div>
                            ) : null}
                        </div>

                        <div className="cart mt-4 align-items-center">
                            <button type="submit" className="btn  w-100 creat_btn message_look fw-bold ">
                                SEND
                            </button>
                        </div>
                        <Link className="creat_look text-center fw-bold mb-4" to="/">
                            <h5 className=" mb-2 mt-5 creat_look fw-bold"> Go Back</h5>
                        </Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
