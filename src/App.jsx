import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import NotFound from "./Components/notFound/NotFound";
import { shantaContext } from "./context/ContextStore";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import ProductDetails from "./Components/productDetiles/ProductDetails";
import toast, { Toaster } from 'react-hot-toast';
import Profile from "./Components/profile/Profile";
import Address from "./Components/address/Address";
import Orders from "./Components/order/Orders";
import BrandDetails from "./Components/Brands/BrandDetails";
import CategoriesDetails from "./Components/Categories/CategoriesDetails";

export default function App() {
  let { setToken } = useContext(shantaContext);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "address", element: <ProtectedRoute><Address /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "brandDetails/:id", element: <ProtectedRoute><BrandDetails /></ProtectedRoute> },
        { path: "CategoriesDetails/:id", element: <ProtectedRoute><CategoriesDetails /></ProtectedRoute> },
        { path: "register", element: <Register /> },
        { path: "productdetials/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

 
  return <>
    <RouterProvider router={router}/>
    <Toaster/>
  </>;
}
