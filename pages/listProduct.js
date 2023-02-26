import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import Content from "@/Components/ListProduct/Content";
import React, { Fragment } from "react";

const listProduct = () => {
  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <Content />
    </Fragment>
  );
};

export default listProduct;
