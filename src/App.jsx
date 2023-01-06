import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./component/LOGIAN/Login";
import Register from "./component/Register/Register";
import Master from "./master/Master";
import Error from "./component/Error/Error";
import Home from "./component/Home/Home";
import About from "./component/Home/About/About";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Portifolio from "./component/portifolio/Portifolio";
import Movic from "./component/Movic/Movic";
import Tv from "./component/Tv/Tv";
import People from "./component/People";
import MovDetuls from "./component/MoviesDetuls/MovDetuls";
import ContextStore from "./context/ContextStore";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import { Offline } from "react-detect-offline";

function App() {
  useEffect(() => {
    if (localStorage.getItem("DataToken") !== null) {
      savedData();
    }
  }, []);
  function logOut() {
    localStorage.removeItem("DataToken");
    setDatatokenApp(null);
    return <Navigate to="/login" />;
  }
  let [DatatokenApp, setDatatokenApp] = useState(null); // مهم

  function savedData() {
    if (localStorage.getItem("DataToken") != null) {
      let localData = localStorage.getItem("DataToken");
      let DataJwt = jwtDecode(localData);
      setDatatokenApp(DataJwt);
      console.log(DataJwt);
    }
  }
  

  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Master
          logOut={logOut}
          setDatatokenApp={setDatatokenApp}
          DatatokenApp={DatatokenApp}
        />
      ),
      children: [
        // {
        //   path: "",
        //   element: <Home />,
        // },
        {
          index: true,
          element: (
            <ProtectedRoute DatatokenApp={DatatokenApp} >
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login savedData={savedData} />,
        },
        { path: "/register", element: <Register /> },
        {
          path: "/movic",
          element: (
            <ProtectedRoute DatatokenApp={DatatokenApp} >
              <Movic />
            </ProtectedRoute>
          ),
        },
        {
          path: "/movicDetuls",
          element: <MovDetuls />,
          children: [{ path: ":media",children:[{path: ":id"}]}],
        },
        {
          path: "/tv",
          element: (
            <ProtectedRoute DatatokenApp={DatatokenApp} >
              <Tv />
            </ProtectedRoute>
          ),
        },
        {
          path: "/people",
          element: (
            <ProtectedRoute DatatokenApp={DatatokenApp} >
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "/about",
          element: (
            <ProtectedRoute DatatokenApp={DatatokenApp} >
              <About DatatokenApp={DatatokenApp} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/portifolio",
          element: (
            <ProtectedRoute DatatokenApp={DatatokenApp} >
              <Portifolio DatatokenApp={DatatokenApp} />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (

    <>

<div>
   
    <Offline><div className=" p-2 rounded-3 off bg-info position-fixed bottom-0">
    You are Offline
      
      
      </div></Offline>
  </div>

    <ContextStore>
      <RouterProvider router={router} />
    </ContextStore>
    </>

  );
}

export default App;
