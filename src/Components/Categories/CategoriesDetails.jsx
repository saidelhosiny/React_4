import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function CategoriesDetails() {
  let [DataBrand, setDataBrand] = useState({});

  let { id } = useParams();

  async function getCategoriesDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );

    setDataBrand(data.data);

    console.log(data.data);
  }

  let { image, name } = DataBrand;

  useEffect(() => {
    getCategoriesDetails();
  }, []);

  return (
    <>
    <Helmet>
<title>{name}</title>
</Helmet>

      <div className="row">
        <div className="col-lg-6 text-center ">
          <div>
            <img src={image} className=" w-100" alt="" />
            <h2 className=" text-main mt-3">NameProduct:: {name}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
