import axios from "axios";
import Joi, { valid } from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useContext } from 'react';
// import { CreateOllApp } from './../../context/ContextStore';
import { Helmet } from "react-helmet";

export default function Login({ savedData }) {
  let Ollnavigate = useNavigate();
  let [parentData, setParentData] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState("");
  let [errorlist, setErrorlist] = useState([]);
  let [loading, setLoading] = useState(false);
  function chageData(e) {
    setErrorlist("")
    setError("")
    let newData = { ...parentData };
    newData[e.target.name] = e.target.value;
    setParentData(newData);
  }

  function valedationData() {
    let scehme = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(4)
        .required(),
      password: Joi.string().min(4).max(10).required(),
    });
    return scehme.validate(parentData, { abortEarly: false });
  }
  function submitData(e) {
    e.preventDefault();
    SendData();
    let valid = valedationData();
    if (valid.error) {
      setErrorlist(valid.error.details);
      setLoading(false);
    } else {
      SendData();
    }
    setLoading(true);
  }
  async function SendData() {
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/signin",
      parentData
    );
    if (data.message === "success") {
      localStorage.setItem("DataToken", data.token);
      Ollnavigate("/");
      savedData();

      setLoading(false);
    } else {
      setError(data.message);
      setLoading(false);
    }
  }
  function displayError(key) {
    if (errorlist != null) {
      for (let i = 0; i < errorlist.length; i += 1) {
        if (errorlist[i].context.key == key) {
          return errorlist[i].message;
        } else {
          return " ";
        }
      }
    }
  }

  return (
    <>
   
   <Helmet>
        <meta charSet="utf-8" content=" lolo elhag" />
        <title>My Login</title>
      </Helmet>
      <div className=" container">
        <form onSubmit={submitData} className=" my-4">
          <label htmlFor="email">email</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="email"
            name="email"
            id="email"
          />

          <p className=" text-danger my-3"> {displayError("email")}</p>
          <p className=" text-danger my-3">{error}</p>  

          <label htmlFor="password">password</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="password"
            name="password"
            id="password"
          />
          <p className=" text-danger my-3"> {displayError("password")}</p>
          {/* <p className=" text-danger my-3">{error}</p> */}
          <button className=" btn btn-outline-info mt-2">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
