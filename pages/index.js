import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import Content from "../Components/Index/Content";
import Navigation from "../Components/Index/Navigation";
import { ToastContainer } from "react-toastify";
import BottomNavigation from "@/Components/Index/BottomNavigation";
import NotShowMess from "@/Components/utils/showMess";
const index = (props) => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Navigation />
      <Content />
      <BottomNavigation />
      <Footer />
    </Fragment>
  );
};

export default index;
