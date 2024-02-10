import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
  function getCategiesSlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    pauseOnHover: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  let { data } = useQuery(
    "categorySlider",
    getCategiesSlider
  );


  return (
    <>
      {data?.data.data ? (
        <div className=" py-3">
          <Slider {...settings}>
            {data?.data.data.map((x) => (
              <img src={x.image} key={x._id} className="w-100 aspect-ratio" alt="Category Image" />
            ))}
          </Slider>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
