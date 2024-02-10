import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BallTriangle } from 'react-loader-spinner'
import { shantaContext } from "../../context/ContextStore";
import {Helmet} from "react-helmet";
import toast from "react-hot-toast";



export default function Login() {

  let {setToken} =   useContext(shantaContext)
  const [errorLogin, setErrorLogin] = useState(null);
  const [spinner, setSpinner] = useState(false);

  let navigate = useNavigate();

  async function submitLogin(values) {
    setSpinner(true);

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setSpinner(false);
        setErrorLogin(error.response.data.message);
      });

    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      setToken(data.token)
      navigate("/");
      setSpinner(false);
      toast.success("إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا")
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password starts with Uppercase")
      .required("password is required"),
  
  });

  let formik = useFormik({
    initialValues: {

      email: "",

      password: "",
      
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  function forgetPassword(){
    toast.success("Relax,  relax and try again")
  }

  return (
    <>
     <Helmet>
               
                <title>Login</title>
              
            </Helmet>
      <div className="w-75 m-auto py-5">
        {errorLogin ? (
          <h3 className=" text-danger text-center fw-bolder">
            {errorLogin}
          </h3>
        ) : (
          ""
        )}

        <h3>Login Now</h3>
        <form onSubmit={formik.handleSubmit}>
     
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

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-2"
          >
          {spinner?<BallTriangle
   height={30}
   width={30}
   radius={5}
   color="#fff"
   ariaLabel="ball-triangle-loading"
   wrapperStyle={{}}
   wrapperClass=""
   visible={true}
  />:"Login"}
          </button>
          <br />
        {formik.errors.password && formik.touched.password ?
       <div> <button className=" btn btn-outline-warning mt-2" onClick={forgetPassword}>Reset Password</button>
       <Link to="/register" className=" mx-3">Register</Link>
       </div>
        :""}
       
        </form>
      </div>
    </>
  );
}
