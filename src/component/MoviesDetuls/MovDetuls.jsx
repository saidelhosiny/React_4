import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function MovDetuls() {
  let [DetulsMovic, SetDetulsMovicDetuls] = useState([]);
  let {media,id } = useParams();
  console.log(id);
  console.log(media);
  async function getDetulsMovicDetuls() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=5fbe34b0d2f3eb5e0a8225d88a6cf2c2&language=en-US`
    );
    SetDetulsMovicDetuls(data);
    console.log(data);
  }

  useEffect(() => {
    getDetulsMovicDetuls();
  }, []);

  return (
    <>
      <Helmet>
        <meta content=" " />
        <title>MovDetuls</title>
      </Helmet>
      {DetulsMovic ? (
        <div className=" container">
          <div className=" row">
            <div className=" col-sm-4">
              <div>
                <img
                  className=" w-100 imgg "
                  src={
                    "https://image.tmdb.org/t/p/w500/" + DetulsMovic.poster_path
                  }
                  alt="posterImage"
                />
              </div>
            </div>
            <div className=" col-sm-8">
              <div>
                <h1>{DetulsMovic.title}</h1>
                <p>{DetulsMovic.overview}</p>
                {DetulsMovic.genres?.map((elem, index) => (
                  <span key={index} className=" p-2  bg-info me-3 rounded-2">
                    {elem.name}
                  </span>
                ))}

                <div className=" my-4">
                  <p>vote : {DetulsMovic.vote_average}</p>
                  <p>vote Count : {DetulsMovic.vote_count}</p>
                </div>
                <i>{DetulsMovic.tagline}</i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" d-flex vh-100  justify-content-center align-items-center ">
          <i className="fa-solid text-white` fa-spinner fa-spin fa-5x"></i>
        </div>
      )}





     
    </>
  );
}
