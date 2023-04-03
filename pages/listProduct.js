import BottomNavigation from "@/Components/Index/BottomNavigation";
import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import Content from "@/Components/ListProduct/Content";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";

const listProduct = () => {
  NotShowMess();
  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <Content />
      <Footer />
      <BottomNavigation />
    </Fragment>
  );
};

export default listProduct;
