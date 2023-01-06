import { useContext } from "react";
import { CreateOllApp } from "../../context/ContextStore";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Tv() {
  let { Tv } = useContext(CreateOllApp);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" content=" lolo elhag" />
        <title>My Tv</title>
      </Helmet>
      <div className=" container">
        {Tv ? (
          <div className=" row">
            <div className="  col-lg-2 col-md-4 col-sm-6   my-4 py-4 text-center ">
              <h1 className="trading">Trending</h1>
              <h2>tv</h2>
              <p>to watch Now</p>
            </div>
            {Tv.map((parent, index) => (
              <div key={index} className=" col-lg-2 col-md-4 col-sm-6  position-relative">
                <Link to={`/MovicDetuls/tv/${parent.id}`}>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500/" + parent.poster_path
                    }
                    className=" w-100 rounded-2"
                    alt=""
                  />
                  <h4 className=" text-white text-center mt-2">
                    {parent.name}
                  </h4>
                  <div className="  bg-info p-1 position-absolute top-0 Posion text-white rounded-1 ">
                    {parent.vote_average.toFixed(1)}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className=" d-flex vh-100  justify-content-center align-items-center ">
            <i className="fa-solid text-white fa-spinner fa-spin fa-5x"></i>
          </div>
        )}
      </div>
    </>
  );
}
