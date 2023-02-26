import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import Content from "../Components/Index/Content";
import Navigation from "../Components/Index/Navigation";
import { ToastContainer } from "react-toastify";
const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Navigation />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default index;
