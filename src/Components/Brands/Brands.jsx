import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [dataBrand, setDataBrand] = useState(null);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

    setDataBrand(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      {dataBrand ? (
        <div className="row my-4">
          {dataBrand?.map((x) => (
            <div className="col-lg-2 text-center" key={x._id}>
              <div className=" cursor-pointer">
                <Link to={`/brandDetails/${x._id}`}>
                  <img src={x.image} className=" w-100" alt="" />
                  <h2>{x.name}</h2>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section
          id="loading"
          className=" d-flex justify-content-center align-items-center vh-100"
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </section>
      )}
    </>
  );
}
