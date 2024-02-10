import React from "react";
import slider1 from "./../../Assets/images/slider-image-1.jpeg";
import slider2 from "./../../Assets/images/slider-image-2.jpeg";
import slider3 from "./../../Assets/images/slider-image-3.jpeg";
import blog1 from "./../../Assets/images/grocery-banner-2.jpeg";
import blog2 from "./../../Assets/images/grocery-banner.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Mainslider() {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="row gx-0 my-3">
        <div className=" col-xl-9 col-lg-9 col-md-9 col-sm-9">
          <Slider {...settings}>
            <img src={slider1} height={400} className="w-100" alt="" />
            <img src={slider2} height={400} className="w-100" alt="" />
            <img src={slider3} height={400} className="w-100" alt="" />
          </Slider>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
          <img src={blog1} height={200} className="w-100 aspect-ratio" alt="" />
          <img src={blog2} height={200} className="w-100 aspect-ratio" alt="" />
        </div>
      </div>
    </>
  );
}
