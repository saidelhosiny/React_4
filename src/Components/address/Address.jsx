import React, { useContext } from "react";
import { useFormik } from "formik";
import { shantaContext } from "../../context/ContextStore";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Address() {
  let { onlinePayment, cartId } = useContext(shantaContext);

  async function handleAdressSubmit(values) {
    let { data } = await onlinePayment(cartId, "http://localhost:3000", values);

   

    
      toast.success('Order succuessfully initalized');
      window.location.href = data?.session.url;
    
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleAdressSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Details User And Adress</title>
      </Helmet>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details :</label>
          <input
            type="text"
            className=" form-control mb-2"
            value={formik.values.details}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="details"
            id="details"
          />

          <label htmlFor="phone">Phone :</label>
          <input
            type="text"
            className=" form-control mb-2"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          />

          <label htmlFor="city">City :</label>
          <input
            type="text"
            className=" form-control mb-2"
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="city"
            id="city"
          />
          <button type="submit" className=" btn bg-main text-white">
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
}
