import React, { useContext, useEffect, useState } from "react";
import { shantaContext } from "./../../context/ContextStore";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet';

export default function Cart() {
  let { getLoggedUserCart, removeCart, updateCartCount } =
    useContext(shantaContext);
  const [dataCard, setdataCard] = useState(null);

  async function getcartDetials() {
    let data = await getLoggedUserCart();

    setdataCard(data);
  }
  async function removeItem(id) {
    let data = await removeCart(id);

    if (data.status === "success") {
      toast.success("Product Removed Successfully");
    } else {
      toast.error(" Error Occured While Removing Product");
    }

    setdataCard(data);
  }
  async function updateItem(id, count) {
    let { data } = await updateCartCount(id, count);

    setdataCard(data);
  }

  useEffect(() => {
    getcartDetials();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {dataCard ? (
        <div className="w-75 mx-auto mb-5  bg-main-light  p-3">
          <h3>Shopping Cart</h3>
          <h4 className=" h6 text-main fw-bolder ">
            Cart Itmes : {dataCard.numOfCartItems}
          </h4>
          <h4 className=" h6  text-main fw-bolder mb-4 ">
            Total Card Price :{dataCard.data.totalCartPrice} EGP
          </h4>
          {dataCard.data.products.map((x) => (
            <div className="row border-bottom  p-2" key={x.product.id}>
              <div className="col-md-1">
                <img src={x.product.imageCover} className=" w-100" alt="" />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className=" h6">
                      {" "}
                      {x.product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <h3 className=" h6 text-main">Price : {x.price} EGP</h3>
                  </div>
                  <div>
                    <button
                      onClick={() => updateItem(x.product.id, x.count + 1)}
                      className=" btn brdr-main p-1"
                    >
                      +
                    </button>
                    <span className="mx-2">{x.count}</span>
                    <button
                      onClick={() => updateItem(x.product.id, x.count - 1)}
                      className=" btn brdr-main p-1"
                    >
                      -
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(x.product.id)}
                  className=" btn  p-0"
                >
                  <i className=" text-danger  font-sm fas fa-trash-can"></i>{" "}
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className=" d-flex justify-content-between">
            <Link to={"/address"} className=" mt-3 btn  bg-main   text-white">
              Online Payment
            </Link>
            <button className=" btn mt-3  bg-main   text-white">
              Cash on Delivery{" "}
            </button>
          </div>
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
