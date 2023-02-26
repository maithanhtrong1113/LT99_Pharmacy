import Content from "@/Components/Cart/Content";
import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import React from "react";
import { ToastContainer } from "react-toastify";
const cart = () => {
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <Navigation />
      <Content />
      <Footer />
    </RouteGuard>
  );
};

export default cart;
