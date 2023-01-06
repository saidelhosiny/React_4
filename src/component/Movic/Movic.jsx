import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CreateOllApp } from "./../../context/ContextStore";

export default function Movic() {
  let { dataMovic } = useContext(CreateOllApp);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" content=" lolo elhag" />
        <title>My Movic</title>
      </Helmet>
      <div className=" container">
        {dataMovic ? (
          <div className=" row">
            <div className=" col-lg-2 col-md-4 col-sm-6">
              <div>
                <div className=" text-center  my-4 py-4">
                  <h1 className="trading">Trending</h1>
                  <h2>Movic</h2>
                  <p>to watch Now</p>
                </div>
              </div>
            </div>

            {dataMovic?.map((mov, index) => (
              <div className=" col-lg-2 col-md-4 col-sm-6 text-center position-relative ">
                <div key={index}>
                  <Link to={`/movicDetuls/movic/${mov.id}`}>
                    <img
                      className=" w-100  rounded-2"
                      src={"https://image.tmdb.org/t/p/w500/" + mov.poster_path}
                      alt=""
                    />
                    <h5 className=" text-white mt-2">{mov.title}</h5>
                    <div className="  bg-info p-1 position-absolute top-0 Posion text-white rounded-1 ">
                      {mov.vote_average.toFixed(1)}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" vh-100 d-flex justify-content-center align-items-center ">
            <i className=" fa-solid text-white fa-spinner fa-spin fa-5x"></i>
          </div>
        )}
      </div>
    </>
  );
}
