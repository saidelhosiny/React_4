import React, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { shantaContext } from "../../context/ContextStore";
import toast from "react-hot-toast";

export default function FeaturedProducted() {
  let { addToCart } = useContext(shantaContext);

  function getFeaturedProducted() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { isLoading, data,  } = useQuery(
    "featuredProducts",
    getFeaturedProducted,
    {
      cacheTime: 3000,
    }
  );
  async function addProduct(id) {
    let response = await addToCart(id);
    if (response?.status === "success") {
      toast.success(response.message);
    } else {
      toast.error("Relax, relax and try again");
    }
  }
  return (
    <>
      {isLoading ? (
        <div className=" d-flex justify-content-center  w-100 py-5">
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
        </div>
      ) : (
        <div className="  py-2">
          <div className="row justify-content-center">
            {data?.data.data.map((x) => (
              <div
                className="  col-xl-2 col-lg-3 col-md-4 col-sm-6 justify-content-center"
                key={x._id}
              >
                <div className=" product cursor-pointer py-3 px-2">
                  <Link to={`/productdetials/${x._id}`}>
                    <img
                      src={x.imageCover}
                      className=" w-100 rounded-1"
                      alt={x.title}
                    />
                    <span className="text-main font-sm  fw-bolder">
                      {x.category.name}
                    </span>
                    <h3 className="h6">
                      {x.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex  justify-content-between mt-3">
                      <span>
                        <span className=" text-success ">{x.price}</span> EGP
                      </span>
                      <span>
                        <i className=" fas fa-star rating-color">
                          {x.ratingsAverage}
                        </i>
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => addProduct(x._id)}
                    className=" btn bg-main text-white w-100 btn-sm mt-2"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
