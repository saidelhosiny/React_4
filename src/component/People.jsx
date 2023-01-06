import { Link } from "react-router-dom";
import { useContext } from "react";
import { CreateOllApp } from "./../context/ContextStore";
import { Helmet } from "react-helmet";

export default function People() {
  let { People } = useContext(CreateOllApp);
  return (
    <>
  <Helmet>
        <meta charSet="utf-8" content=" lolo elhag" />
        <title>My People</title>
      </Helmet>
      <div className=" container d-flex ">
        {People ? (
          <div className=" row">
            <div className=" col-lg-2 col-md-4 col-sm-6   my-4 py-4 text-center ">
              <h1 className="trading">Trending</h1>
              <h2>People</h2>
              <p>to watch Now</p>
            </div>

            {People.filter((ite)=> ite.profile_path !== null).map((parent, index) => (
              <div key={index} className=" col-lg-2 col-md-4 col-sm-6   position-relative ">
                <Link to={`/movicDetuls/people/${parent.id}`}>
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500/" + parent.profile_path
                    }
                    className=" w-100  rounded-2"
                    alt=""
                  />
                  <h4 className=" text-white text-center mt-2">
                    {parent.id}
                  </h4>
                  <div className="  bg-info p-1 position-absolute top-0 Posion text-white rounded-1 ">
                    {parent.popularity.toFixed()}
                   
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <i className="fa-solid vh-100 fa-spinner fa-spin fa-5x d-flex justify-content-center align-items-center"></i>
        )}
      </div>
    </>
  );
}
