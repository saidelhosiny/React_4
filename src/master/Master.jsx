import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";

export default function Master({ DatatokenApp, logOut }) {
  return (
    <>
      <Navbar DatatokenApp={DatatokenApp} logOut={logOut} />

      <div className=" mt-4">
        <Outlet></Outlet>
      </div>
    </>
  );
}
