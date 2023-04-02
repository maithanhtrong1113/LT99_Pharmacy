import Content from "@/Components/Checkout/Content";
import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const checkout = () => {
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

export default checkout;
