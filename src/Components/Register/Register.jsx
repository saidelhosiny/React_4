import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import { Audio } from 'react-loader-spinner'
import toast from "react-hot-toast";


export default function Register() {
  const [errorRegister, setErrorRegister] = useState(null);
  const [spinner, setSpinner] = useState(false);

  let navigate = useNavigate();

  async function submitRegister(values) {
    setSpinner(true);

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => {
        setSpinner(false);
        setErrorRegister(error.response.data.message);
      });

    if (data.message === "success") {
      navigate("/login");
      setSpinner(false);
      toast.success("you Became a customer here")
    }
  }
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name min length is 3")
      .max(10, "name max length is 10")
      .required("name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password starts with Uppercase")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword is not Match")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
       <Helmet>
               
               <title>Register</title>
             
           </Helmet>
      <div className="w-75 m-auto py-5">
        {errorRegister ? (
          <h3 className=" text-danger text-center fw-bolder">
            {errorRegister}
          </h3>
        ) : (
          ""
        )}

        <h3>Register Now</h3>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name : </label>
          <input
            onBlur={formik.handleBlur}
            className=" form-control mb-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <p className=" text-danger fw-bolder">{formik.errors.name}</p>
          ) : (
            " "
          )}
          <label htmlFor="email">Email : </label>
          <input
            onBlur={formik.handleBlur}
            className=" form-control mb-2"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className=" text-danger fw-bolder">{formik.errors.email}</p>
          ) : (
            " "
          )}

          <label htmlFor="phone">Phone : </label>
          <input
            onBlur={formik.handleBlur}
            className=" form-control mb-2"
            value={formik.values.phone}
            onChange={formik.handleChange}
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className=" text-danger fw-bolder">{formik.errors.phone}</p>
          ) : (
            " "
          )}

          <label htmlFor="password">Password : </label>
          <input
            onBlur={formik.handleBlur}
            className=" form-control mb-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className=" text-danger fw-bolder">{formik.errors.password}</p>
          ) : (
            " "
          )}

          <label htmlFor="rePassword">rePassword : </label>
          <input
            onBlur={formik.handleBlur}
            className=" form-control mb-2"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className=" text-danger fw-bolder">{formik.errors.rePassword}</p>
          ) : (
            " "
          )}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-2"
          >
          {spinner?<Audio
  height="20"
  width="20"
  color="white"
  ariaLabel="audio-loading"
  wrapperStyle={{}}
  wrapperClass="wrapper-class"
  visible={true}
  />:"Register"}
          </button>
        </form>
      </div>
    </>
  );
}
