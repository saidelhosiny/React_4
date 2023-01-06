import axios from "axios";
import Joi, { valid } from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  let Ollnavigate = useNavigate();
  let [parentData, setParentData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    password: "",
  });
  //  دا الارر لو في ارر ف تسجبل الدخول
  let [error, setError] = useState("");
  let [errorlist, setErrorlist] = useState([]);
  console.log(errorlist);
  //  اللودنج
  let [loading, setLoading] = useState(false);
  // تخزيين داتا من الانبت
  function chageData(e) {
    setErrorlist("");
    setError("");
    let newData = { ...parentData };
    newData[e.target.name] = e.target.value;
    setParentData(newData);
  }
  function valedationData() {
    let scehme = Joi.object({
      first_name: Joi.string().alphanum().min(2).max(10).required(),
      last_name: Joi.string().alphanum().min(4).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .min(4)
        .required(),
      age: Joi.number().min(10).max(80).required(),
      password: Joi.string().min(4).max(15).required(),
    });

    return scehme.validate(parentData, { abortEarly: false });
  }

  //  بتسبمت الداتا او بتسجلها
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
  function displayError(key) {
    if (setErrorlist !== null) {
      for (let i = 0; i < errorlist.length; i += 1) {
        if (errorlist[i].context.key === key) {
          return errorlist[i].message;
        }

        return " ";
      }
    }
  }
  // بعت الدتا ل الداتا بيزز
  async function SendData() {
    let { data } = await axios.post(
      "https://route-movies-api.vercel.app/signup",
      parentData
    );

    if (data.message === "success") {
      Ollnavigate("/login");
      setLoading(false);
      //  سجل المسدج الغلط في الارر
    } else {
      setError(data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <meta content=" " />
        <title>Register</title>
      </Helmet>
      {/* {errorlist.map((parent,index)=> 
    <p key={index} className=" text-center  text-bg-danger">{parent.message}</p>
    )} */}

      {/* {error`list.map((parent, index) => {
        if (parent.context.label === "password") {
          return (
            <p key={index} className=" text-danger">
            please Type your password
            </p>
          );
        }
         else {
          return (
            <p key={index} className=" text-danger">
              {parent.message}
            </p>
          );
        }
      })} */}

      <div className=" container">
        <form onSubmit={submitData} className=" my-4">
          <label htmlFor="first_name">fristname</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="text"
            name="first_name"
            id="first_name"
          />

          <p className=" text-danger">
            {/* {
              errorlist.filter(
                (erreor) => erreor.context.label === "first_name"
              )[0]?.message
            } */}

            {displayError("first_name")}
          </p>

          <label htmlFor="last_name">lastname</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="text"
            name="last_name"
            id="last_name"
          />
          <p className=" text-danger">
            {/* {
              errorlist.filter(
                (erreor) => erreor.context.label === "last_name"
              )[0]?.message
            } */}
            {displayError("last_name")}
          </p>
          <label htmlFor="email">email</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="email"
            name="email"
            id="email"
          />
          <p className=" text-danger">
            {/* {
              errorlist.filter((erreor) => erreor.context.label === "email")[0]
                ?.message
            } */}
            {displayError("email")}
          </p>
          <label htmlFor="age">age</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="number"
            name="age"
            id="age"
          />
          <p className=" text-danger">
            {/* {
              errorlist.filter((erreor) => erreor.context.label === "age")[0]
                ?.message
            } */}
            {displayError("age")}
          </p>
          <label htmlFor="password">password</label>
          <input
            onChange={chageData}
            className=" w-100 myinput form-control my-2"
            type="password"
            name="password"
            id="password"
          />
          <p className=" text-danger">
            {/* {
              errorlist.filter(
                (erreor) => erreor.context.label === "password"
              )[0]?.message
            } */}
            {displayError("password")}
          </p>
          <button className=" btn btn-outline-info mt-2">
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
          <p className=" text-center text-danger my-3">
            {error ? " Please fill in the package " : ""}
          </p>
        </form>
      </div>
    </>
  );
}
