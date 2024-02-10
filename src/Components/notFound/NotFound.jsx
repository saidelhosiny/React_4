import React from "react";

import imgicon from "./404.png";
import { Helmet } from "react-helmet";

export default function NotFound() {
  <Helmet>
    <title>NotFound</title>
  </Helmet>
  return (
    <>
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <img src={imgicon} className=" w-100" alt="" />
      </div>
    </>
  );
}
