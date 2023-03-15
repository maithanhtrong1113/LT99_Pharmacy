import Content from "@/Components/Checkout/Content";
import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import React, { Fragment } from "react";

const checkout = () => {
  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default checkout;
