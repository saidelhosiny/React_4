import React from "react";
import FeaturedProducted from "../featuredProducted/FeaturedProducted";
import CategorySlider from "../categorieSlider/CategorySlider";
import Mainslider from "../mainslider/Mainslider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Mainslider />
      <CategorySlider />
      <FeaturedProducted />
    </>
  );
}
