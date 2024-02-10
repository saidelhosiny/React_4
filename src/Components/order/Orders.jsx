import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [DataUserId, setDataUserOrders] = useState([]);

  async function getOllUserOrders(id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );

      setDataUserOrders(data);

      
    } catch (error) {
    
    }
  }

  useEffect(() => {
    let result = jwtDecode(localStorage.getItem("token"));

    getOllUserOrders(result.id);
  }, []);

  return (
    <>
      <Helmet>
        <title>User Orders</title>
      </Helmet>
      <div className="row my-4">
        {DataUserId?.map((x) => (
          <div className="col-lg-6" key={x.id}>
            <div>
              <h2 className=" fw-bolder">UserName : {x.user.name}</h2>
              <h3>UserAddress : {x.shippingAddress.city}</h3>
              <h3>OrderDetails : {x.shippingAddress.details}</h3>
              <h3>UserEmail : {x.user.email}</h3>
              <h4>UserPhone : {x.user.phone}</h4>
              <h6 className=" text-main mb-5">
                TotalOrderPrice : {x.totalOrderPrice} $
              </h6>
              <div className="">
                {x.cartItems.map((ellem) => (
                  <div
                    className=" text-center d-flex justify-content-center "
                    key={ellem}
                  >
                    <div className=" w-50">
                      <img
                        src={ellem.product.imageCover}
                        className=" w-100"
                        alt={ellem.product.title}
                      />
                      <h6 className=" text-main mt-2">
                        {" "}
                        Name:
                        {ellem.product.title.split(" ").splice(0, 5).join(" ")}
                      </h6>
                    </div>
                    <div className=" w-50">
                      <h4>count: {ellem.count}</h4>
                      <h4>Price: {ellem.price}$</h4>

                      <img
                        className=" w-100"
                        src={ellem.product.brand.image}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
