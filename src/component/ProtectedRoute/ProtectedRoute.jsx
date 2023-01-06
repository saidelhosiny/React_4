import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ DatatokenApp, children }) {
  if ((DatatokenApp == null) & (localStorage.getItem("DataToken") == null)) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
}
