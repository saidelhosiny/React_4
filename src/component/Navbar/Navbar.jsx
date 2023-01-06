import { Link } from "react-router-dom";

export default function Navbar({ DatatokenApp, logOut }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info text-white">
        <div className="container-fluid">
          {DatatokenApp ? (
            <>
              <h1></h1>
              <Link className="navbar-brand" to="#">
                Noxe
              </Link>
              <Link className="nav-link px-2" to="about">
                About
              </Link>
              <Link className="nav-link px-2" to="movic">
                Movic
              </Link>
              <Link className="nav-link px-2" to="tv">
                Tv
              </Link>
              <Link className="nav-link px-2" to="people">
                People
              </Link>
            </>
          ) : (
            <Link className="navbar-brand" to="#">
              Noxe
            </Link>
          )}

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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fa-brands fa-facebook px-2 "></i>
                <i className="fa-brands fa-twitter px-2 "></i>
                <i className="fa-brands fa-instagram px-2"></i>
                <i className="fa-brands fa-youtube px-2"></i>
              </li>

              {DatatokenApp ? (
                <>
                  <li className="nav-item">
                    <Link onClick={logOut} className="nav-link" to="login">
                      LogOut
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="portifolio">
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
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
