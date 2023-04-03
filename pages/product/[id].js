import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import Content from "@/Components/ProductDetail/Content";
import NotShowMess from "@/Components/utils/showMess";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const page = (props) => {
  NotShowMess();
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

export default page;
