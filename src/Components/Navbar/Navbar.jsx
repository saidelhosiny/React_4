import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";
import { shantaContext } from "../../context/ContextStore";

export default function Navbar() {
  let navigate = useNavigate();
  let { token, setToken, cartCount } = useContext(shantaContext);
  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg  color-nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Products
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/cart">
                      <span className=" position-relative">
                        cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartCount ? cartCount : ""}
                        </span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allorders">
                      Orders
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <a
                      href="https://www.facebook.com/profile.php?id=100012182198210"
                      target="_blank"
                    >
                      {" "}
                      <i className="fab mx-2 fa-facebook"></i>
                    </a>
                    <i className="fab mx-2 fa-twitter"></i>
               <a href="https://wa.me/01101350271" target="_blank">     <i className="fab fa-whatsapp"></i></a>
                    <i className="fab mx-2 fa-instagram"></i>
                    <a
                      href="https://youtu.be/VBhK_0RigL4?si=aA7HDU9dE7VZEDVd"
                      target="_blank"
                    >
                      <i className="fab mx-2 fa-youtube"></i>
                    </a>
                    <i className="fab mx-2 fa-tiktok"></i>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link cursor-pointer" onClick={logOut}>
                      Logout
                    </span>
                  </li>
                  <Link className="nav-link " to="/profile">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
